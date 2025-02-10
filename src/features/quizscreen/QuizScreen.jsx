import styled from "styled-components";
import ProgressiveBar from "../../ui/ProgressiveBar";
import { useEffect, useState } from "react";
import Button from "../../ui/Button";
import QuestionComponent from "../../components/QuestionComponent";
import quizQuestions from "../../data/quizTestQuestion";
import { useNavigate, useParams } from "react-router";
import { formatTime } from "../../util/FormatTime";

const StyledQuizScreen = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-height: calc(100vh - 80px);
  width: 100%;
  padding: 0 2rem;
  box-sizing: border-box;
`;

const QuizContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const QuizTitle = styled.div`
  text-align: center;
  width: 100%;

  p {
    color: var(--color-gray-text);
    margin: 0;
  }

  span {
    color: var(--color-soft-red);
    display: block;
    margin-top: 1rem;
    font-weight: 500;
  }
`;

const StyleedButtonDiv = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 500px) {
    display: grid;
    font-size: 12px;
  }
`;
function QuizScreen() {
  const { category, difficulty } = useParams();
  const [timeLeft, setTimeLeft] = useState(() => {
    const savedTime = localStorage.getItem("quizTimeLeft");
    return savedTime ? parseInt(savedTime, 10) : 600;
  });

  const [selectedOptions, setSelectedOptions] = useState(() => {
    const savedAnswers = localStorage.getItem("quizAnswers");
    return savedAnswers ? JSON.parse(savedAnswers) : {};
  });

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const navigate = useNavigate();

  const filteredQuestions = quizQuestions.filter(
    (question) =>
      question.category === category && question.difficulty === difficulty
  );

  const progress =
    ((currentQuestionIndex + 1) / filteredQuestions.length) * 100;

  useEffect(() => {
    localStorage.setItem("quizTimeLeft", timeLeft);
  }, [timeLeft]);

  useEffect(() => {
    localStorage.setItem("quizAnswers", JSON.stringify(selectedOptions));
  }, [selectedOptions]);

  useEffect(() => {
    if (timeLeft === 0) {
      handleSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleSubmit = () => {
    let correctAnswers = 0;
    let incorrectAnswers = 0;
    const results = [];

    filteredQuestions.forEach((question, index) => {
      const selectedAnswer = selectedOptions[index];
      const correctAnswer = question.correctOption;

      results.push({
        question: question.question,
        userAnswer: selectedAnswer,
        correctAnswer: correctAnswer,
        correct: selectedAnswer === correctAnswer,
      });

      if (selectedAnswer === correctAnswer) {
        correctAnswers++;
      } else {
        incorrectAnswers++;
      }
    });

    localStorage.removeItem("quizTimeLeft");
    localStorage.removeItem("quizAnswers");

    navigate(`/quiz/${category}/${difficulty}/result`, {
      state: {
        correctAnswers,
        incorrectAnswers,
        results,
        filteredQuestions,
      },
    });
  };
  const handleNext = () => {
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleOptionClick = (option) => {
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [currentQuestionIndex]: option,
    }));
  };
  return (
    <StyledQuizScreen>
      <QuizContainer>
        <QuizTitle>
          <p>Science Quiz</p>
          <span>00:{formatTime(timeLeft)}</span>
        </QuizTitle>
        <QuestionComponent
          question={filteredQuestions[currentQuestionIndex].question}
          options={filteredQuestions[currentQuestionIndex].options}
          onOptionClick={handleOptionClick}
          selectedOption={selectedOptions[currentQuestionIndex]}
        />
        <StyleedButtonDiv>
          {currentQuestionIndex > 0 && (
            <Button sizes="large" variations="prev" onClick={handlePrev}>
              Previous
            </Button>
          )}
          {currentQuestionIndex < filteredQuestions.length - 1 && (
            <Button
              sizes="large"
              variations="next"
              onClick={handleNext}
              disabled={!selectedOptions[currentQuestionIndex]}
            >
              Next
            </Button>
          )}
          {currentQuestionIndex === filteredQuestions.length - 1 && (
            <Button
              sizes="large"
              variations="submit"
              disabled={!selectedOptions[currentQuestionIndex]}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          )}
        </StyleedButtonDiv>

        <ProgressiveBar
          currentQuestionIndex={currentQuestionIndex}
          filteredQuestions={filteredQuestions}
          progress={progress}
        />
      </QuizContainer>
    </StyledQuizScreen>
  );
}

export default QuizScreen;
