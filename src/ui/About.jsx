import styled from "styled-components";

const StyledAbout = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  line-height: 1.6;
  color: var(--color-primary);

  h2 {
    font-size: 2rem;
    color: var(--color-secondary-2);
    margin-bottom: 1.5rem;
    text-align: center;
  }

  h3 {
    font-size: 1.5rem;
    color: var(--color-secondary-2);
    margin-top: 1.5rem;
    margin-bottom: 1rem;
  }

  p {
    margin-bottom: 1rem;
  }

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  li {
    display: inline-block;
    margin-right: 1rem;
    font-weight: bold;
  }

  li:last-child {
    margin-right: 0;
  }

  a {
    color: var(--color-secondary-2);

    &:hover {
      color: var(--color-link);
    }
  }
`;

function About() {
  return (
    <StyledAbout>
      <h2>About Quizy</h2>
      <p>
        Welcome to the <strong>Quiz Project</strong>! This platform is designed
        to make learning fun, engaging, and interactive. Whether you're a
        student looking to test your knowledge, a teacher creating quizzes for
        your class, or just someone who loves trivia, this project is for you.
      </p>

      <section>
        <h3>Our Mission</h3>
        <p>
          Our mission is to provide a user-friendly and accessible platform for
          creating, sharing, and taking quizzes on a wide range of topics. We
          believe that learning should be enjoyable, and quizzes are a great way
          to reinforce knowledge, challenge yourself, and track your progress.
        </p>
      </section>

      <section>
        <h3>Our Team</h3>
        <p>
          The Quiz Project is developed by a passionate team of educators,
          developers, and designers who are dedicated to making learning
          accessible and enjoyable for everyone. We’re constantly working to
          improve the platform and add new features based on your feedback.
        </p>
      </section>

      <section>
        <h3>Get Involved</h3>
        <p>
          We’d love to hear from you! If you have any suggestions, feedback, or
          questions, feel free to reach out to us at{" "}
          <a href="mailto:your-email@example.com">your-email@example.com</a>.
          You can also contribute to the project by submitting your own quizzes
          or sharing the platform with others.
        </p>
      </section>

      <section>
        <h3>Follow Us</h3>
        <p>
          Stay updated with the latest news, quizzes, and features by following
          us on social media:
        </p>
        <ul>
          <li>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
          </li>
          <li>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
          </li>
          <li>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          </li>
        </ul>
      </section>

      <section>
        <p>
          Thank you for being a part of the <strong>Quiz Project</strong>{" "}
          community. Let’s make learning fun together!
        </p>
      </section>
    </StyledAbout>
  );
}

export default About;
