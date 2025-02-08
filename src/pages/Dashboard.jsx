import { LazyLoadImage } from "react-lazy-load-image-component";
import userAvatar from "../asset/man-tuxedo.png";
import styled from "styled-components";
import DashBoardComponent from "../components/DashBoardComponent";
import ArtImage from "../asset/Art.png";
import CommercialImage from "../asset/commercial.png";
import GeneralSubImage from "../asset/general.png";
import ScienceSubImage from "../asset/dna.png";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "../features/authentication/useUser";
import SplashScreen from "../ui/SplashScreen";

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
  const { user, isLoading, isError } = useUser();
  const { firstName, lastName } = user;
  // console.log(user);
  if (isLoading) return <SplashScreen />;
  return (
    <StyledDashBoard>
      <StyledWelcomeDiv>
        <UserAvatar src={userAvatar} alt="user avatar" />
        <h2>{isLoading ? "Welcome" : `Welcome, ${firstName} ${lastName}`}</h2>
        {/* <h2> Welcome</h2> */}
      </StyledWelcomeDiv>
      <CardConDiv>
        <DashBoardComponent
          title="Arts"
          text="Explore quizzes on Art history, Famous painter and creative movement"
          image={ArtImage}
          borderColor="var(--color-primary)"
        />
        <DashBoardComponent
          title="Science"
          text="Challenge your knowledge in physics, chemistry, biology, and more"
          image={ScienceSubImage}
          borderColor="var(--color-secondary-1)"
        />
        <DashBoardComponent
          title="Commercial"
          text="Test your skills in business, economics, finance, and marketing"
          image={CommercialImage}
          borderColor="var(--color-green)"
        />
        <DashBoardComponent
          title="General Studies"
          text="Dive into global politics, international relations, and world events"
          image={GeneralSubImage}
          borderColor="var(--color-link)"
        />
      </CardConDiv>
    </StyledDashBoard>
  );
}

export default Dashboard;
