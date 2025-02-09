import styled from "styled-components";

const StyledFeaturesPage = styled.section`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  line-height: 1.6;
  color: var(--color-primary);
  color: var(--color-secondary-2);

  h2 {
    color: var(--color-primary);
  }
  h3 {
    color: var(--color-primary);
  }
`;
function FeaturesPage() {
  return (
    <StyledFeaturesPage>
      <section id="features">
        <h2>Features</h2>
        <ul>
          <li>
            <strong>Create Custom Quizzes:</strong> Easily create quizzes with
            multiple-choice, true/false, or open-ended questions.
          </li>
          <li>
            <strong>Explore Diverse Topics:</strong> Choose from a variety of
            categories, including science, history, pop culture, and more.
          </li>
          <li>
            <strong>Track Your Progress:</strong> Get instant feedback on your
            answers and see your scores improve over time.
          </li>
          <li>
            <strong>Compete with Friends:</strong> Share quizzes with friends
            and challenge them to beat your score.
          </li>
          <li>
            <strong>Mobile-Friendly:</strong> Take quizzes anytime, anywhere, on
            any device.
          </li>
        </ul>
      </section>

      <section id="how-it-works">
        <h2>How It Works</h2>
        <ol>
          <li>
            <strong>Sign Up:</strong> Create an account to save your progress
            and access additional features.
          </li>
          <li>
            <strong>Choose a Quiz:</strong> Browse through our library of
            quizzes or create your own.
          </li>
          <li>
            <strong>Take the Quiz:</strong> Answer questions and get real-time
            feedback.
          </li>
          <li>
            <strong>Review Results:</strong> See your score, check correct
            answers, and learn from your mistakes.
          </li>
        </ol>
      </section>

      <section id="who-can-use-it">
        <h2>Who Can Use It?</h2>
        <ul>
          <li>
            <strong>Students:</strong> Test your knowledge and prepare for
            exams.
          </li>
          <li>
            <strong>Teachers:</strong> Create quizzes for your students and
            track their performance.
          </li>
          <li>
            <strong>Trivia Enthusiasts:</strong> Challenge yourself with fun and
            interesting quizzes.
          </li>
          <li>
            <strong>Everyone:</strong> Learn something new every day!
          </li>
        </ul>
      </section>
    </StyledFeaturesPage>
  );
}

export default FeaturesPage;
