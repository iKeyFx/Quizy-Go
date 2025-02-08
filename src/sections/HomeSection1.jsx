import { LazyLoadImage } from "react-lazy-load-image-component";
import HeroImage from "../asset/HeroImage.png";
import heroMobile from "../asset/heroMobile.png";
import Quizy from "../asset/quizzy.png";
import styled from "styled-components";
import { useNavigate } from "react-router";

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 3rem;

  @media (max-width: 1020px) {
    padding: 1rem 5rem;
  }

  @media (max-width: 550px) {
    padding: 1rem 2rem;
  }

  @media (max-width: 400px) {
    padding: 1rem 1rem;
  }
`;

const StyledMasterDiv = styled.div`
  display: flex;
  place-items: center;

  h1 {
    color: var(--color-secondary-2);
    line-height: 1.2;
    margin-bottom: 0;
  }

  @media (max-width: 1020px) {
    display: grid;
    text-align: center;
  }
  @media (max-width: 500px) {
    font-size: 12px;
  }
`;

const TextCon = styled.div`
  padding: 0 0 0 2rem;

  h2 {
    color: var(--color-primary-2);
    margin-bottom: 0;
  }

  p {
    font-size: 14px;
    color: var(--color-gray-text);
  }

  @media (max-width: 1020px) {
    padding: 0;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  @media (max-width: 1020px) {
    margin: 2rem 0;
  }
`;

const Button = styled.button`
  padding: 8px 32px;
  background-color: var(--color-primary);
  color: var(--color-white);
  margin-top: 10px;
  &:hover {
    background-color: var(--color-primary-2);
  }
`;

const StyledAboutCon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border: 1px solid var(--color-primary);
  margin-bottom: 2rem;

  p {
    margin-top: 10px;
    font-size: 14px;
    padding: 0 1rem;
    color: var(--color-gray-text);
  }

  @media (max-width: 768px) {
    padding: 0.5rem;

    p {
      font-size: 12px;
    }
  }
`;

const StyledAboutHead = styled.div`
  color: var(--color-primary);
  display: flex;
  align-items: center;
  gap: 0.5rem;

  h3 {
    margin: 0;
  }
`;

const StyledImage = styled(LazyLoadImage)`
  height: 20px;
`;
const StyledCompImage = styled(LazyLoadImage)`
  @media (max-width: 1020px) {
    width: 500px;
  }
  @media (max-width: 620px) {
    display: none;
  }
`;
const StyledCompImageMobile = styled(LazyLoadImage)`
  display: none;
  @media (max-width: 620px) {
    display: grid;
  }

  @media (max-width: 620px) {
    width: 300px;
  }
`;

const StyledH1 = styled.h1`
  @media (max-width: 620px) {
    font-size: 32px;
  }
`;
function HomeSection1() {
  const navigate = useNavigate();
  return (
    <StyledSection>
      <StyledMasterDiv>
        <TextCon>
          <StyledH1>Master Your Knowledge with Quick Quizzes</StyledH1>
          <h2>Fun, Fast, and Free!</h2>
          <p>
            Challenge yourself, learn new things, and track your progress with
            our engaging quizzes across various topics!
          </p>
          <Button onClick={() => navigate("/sign-up")}>Take A Quiz</Button>
        </TextCon>
        <ImageContainer>
          <StyledCompImage src={HeroImage} alt="Quizz Screen" />
          <StyledCompImageMobile src={heroMobile} alt="Quizz Screen" />
        </ImageContainer>
      </StyledMasterDiv>
      <StyledAboutCon>
        <StyledAboutHead>
          <h3>About</h3>
          <StyledImage src={Quizy} alt="logo" />
        </StyledAboutHead>
        <p>
          Quizy is an interactive quiz app designed to engage your mind, boost
          your knowledge, and make learning fun. Whether you’re looking to test
          your skills or challenge friends, Quizy provides a seamless, enjoyable
          experience. Choose from a variety of topics, track your progress and
          compete withothers on the leaderboard.
        </p>
      </StyledAboutCon>
    </StyledSection>
  );
}

export default HomeSection1;
