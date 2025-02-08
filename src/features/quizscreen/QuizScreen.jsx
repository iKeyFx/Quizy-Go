import styled from "styled-components";
import QuizOption from "./QuizOption";
import ProgressiveBar from "../../ui/ProgressiveBar";
import { use, useEffect, useState } from "react";
import Button from "../../ui/Button";
import QuestionComponent from "../../../QuestionComponent";
import quizQuestions from "../../data/quizTestQuestion";
import { useNavigate } from "react-router";
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
const StyledQuizOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

const QuestionDiv = styled.div`
  color: var(--color-primary);
  text-align: center;
  width: 100%;

  h3 {
    font-size: 1.25rem;
    margin: 0;
    font-weight: 600;
  }

  @media (max-width: 500px) {
    h3 {
      font-size: 1rem;
      margin: 0;
      font-weight: 500;
    }
  }
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
  const [timeLeft, setTimeLeft] = useState(100);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [progress, setProgress] = useState(10);
  const questions = quizQuestions;
  const navigate = useNavigate();

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

    questions.forEach((question, index) => {
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

    navigate("/quiz/result", {
      state: {
        correctAnswers,
        incorrectAnswers,
        results,
      },
    });
  };
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setProgress((prevProgress) => prevProgress + 100 / questions.length);
    }
  };
  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setProgress((prevProgress) => prevProgress - 100 / questions.length);
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
          question={questions[currentQuestionIndex].question}
          options={questions[currentQuestionIndex].options}
          onOptionClick={handleOptionClick}
          selectedOption={selectedOptions[currentQuestionIndex]}
        />
        <StyleedButtonDiv>
          {progress > 10 && progress <= 100 && (
            <Button sizes="large" variations="prev" onClick={handlePrev}>
              Previous
            </Button>
          )}
          {progress >= 10 && progress < 100 && (
            <Button
              sizes="large"
              variations="next"
              onClick={handleNext}
              disabled={!selectedOptions[currentQuestionIndex]}
            >
              Next
            </Button>
          )}
          {progress === 100 && (
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

        <ProgressiveBar progress={progress} />
      </QuizContainer>
    </StyledQuizScreen>
  );
}

export default QuizScreen;
