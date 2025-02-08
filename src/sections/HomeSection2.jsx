import styled from "styled-components";
import { LazyLoadImage } from "react-lazy-load-image-component";

import SectionTwoComponent from "../components/SectionTwoComponent";

import FreelancerImage from "../asset/freelancer.png";
import LeanerImage from "../asset/interface-success-01-2.png";
import MathImage from "../asset/mathematician.png";
import CreativeImage from "../asset/work-being-creative.png";

const StyledSection = styled.section`
  background-color: var(--color-primary);

  padding: 2rem 3rem;
  @media (max-width: 470px) {
    text-align: center;
  }
`;

const StyledH2Div = styled.div`
  color: var(--color-white);
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 10rem;

  @media (max-width: 1020px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 500px) {
    font-size: 12px;
  }
`;
const StyledCardDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 2rem;

  @media (max-width: 1020px) {
    grid-template-columns: repeat(2, 1fr);
    row-gap: 2rem;
  }

  @media (max-width: 470px) {
    grid-template-columns: 1fr;
  }
`;

function HomeSection2() {
  return (
    <StyledSection>
      <StyledH2Div>
        <h2>Everything you need to enjoy and improve your quiz experience.</h2>
        <div></div>
      </StyledH2Div>
      <StyledCardDiv>
        <SectionTwoComponent
          title="Wide Range of Quiz Categories"
          description="Explore quizzes on topics like history, sports, pop culture, science, and more."
          borderColor="var(--color-secondary-3)"
          image={CreativeImage}
        />
        <SectionTwoComponent
          title="Real-Time Leaderboards"
          description="See how you rank against other players in real-time and compete for the top spot."
          borderColor="var(--color-secondary-1)"
          image={LeanerImage}
        />
        <SectionTwoComponent
          title="Instant Feedback & Explanations"
          description="After each answer, get detailed explanations and improve your knowledge."
          borderColor="var(--color-soft-red)"
          image={MathImage}
        />
        <SectionTwoComponent
          title="Play Anywhere, Anytime"
          description="Whether you’re at home or on the go, Quizzy is designed for mobile devices so you can play anytime."
          borderColor="var(--color-primary-3)"
          image={FreelancerImage}
        />
      </StyledCardDiv>
    </StyledSection>
  );
}

export default HomeSection2;
