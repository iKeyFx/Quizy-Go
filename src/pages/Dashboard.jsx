import styled from "styled-components";
import { LazyLoadImage } from "react-lazy-load-image-component";

import DashBoardComponent from "../components/DashBoardComponent";
import { useUser } from "../features/authentication/useUser";
import SplashScreen from "../ui/SplashScreen";

import ArtImage from "../asset/Art.png";
import userAvatar from "../asset/man-tuxedo.png";
import CommercialImage from "../asset/Commercial.png";
import GeneralSubImage from "../asset/general.png";
import ScienceSubImage from "../asset/dna.png";
import { useMemo } from "react";
import { useNavigate } from "react-router";

const StyledDashBoard = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledWelcomeDiv = styled.div`
  display: flex;
  align-items: center;
  background-color: var(--color-primary);
  color: var(--color-white);
  padding: 0 2rem;
  margin-bottom: 2rem;

  h2 {
    /* margin: 1.5rem; */
    font-size: 2rem;
    text-transform: capitalize;
  }

  @media (max-width: 600px) {
    padding: 1rem 0.5rem;
    h2 {
      font-size: 1rem;
    }
  }
`;
const UserAvatar = styled(LazyLoadImage)`
  width: 50px;
  height: 50px;
`;

export const CardConDiv = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: center;

  @media (max-width: 1020px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    place-items: center;
  }

  @media (max-width: 620px) {
    display: grid;
    grid-template-columns: 1fr;
  }
`;
function Dashboard() {
  const { user, isPending, isError } = useUser();
  const { firstName, lastName } = user;
  // console.log(user);
  if (isPending) return <SplashScreen />;
  // if (isError) return <PageNotFound />;

  return (
    <StyledDashBoard>
      <StyledWelcomeDiv>
        <UserAvatar src={userAvatar} alt="user avatar" />
        <h2>{isPending ? "Welcome" : `Welcome, ${firstName} ${lastName}`}</h2>
      </StyledWelcomeDiv>
      <CardConDiv>
        <DashBoardComponent
          category="Arts"
          text="Explore quizzes on Art history, Famous painter and creative movement"
          image={ArtImage}
          borderColor="var(--color-primary)"
        />
        <DashBoardComponent
          category="Science"
          text="Challenge your knowledge in physics, chemistry, biology, and more"
          image={ScienceSubImage}
          borderColor="var(--color-secondary-1)"
        />
        <DashBoardComponent
          category="Commercial"
          text="Test your skills in business, economics, finance, and marketing"
          image={CommercialImage}
          borderColor="var(--color-green)"
        />
        <DashBoardComponent
          category="General Studies"
          text="Dive into global politics, international relations, and world events"
          image={GeneralSubImage}
          borderColor="var(--color-link)"
        />
      </CardConDiv>
    </StyledDashBoard>
  );
}

export default Dashboard;
