import styled from "styled-components";
import { CardConDiv, StyledWelcomeDiv } from "./Dashboard";
import DifficultyOptionsCard from "../components/DifficultyOptionsCard";
import EasyImage from "../asset/easy.png";
import MediumImage from "../asset/Medium.png";
import HardImage from "../asset/Hard.png";
import { ArrowBack, StyledArrowBack } from "../features/authentication/Login";
import { useMoveBack } from "../hooks/useMoveBack";

const StyledHeader = styled(StyledWelcomeDiv)`
  background-color: var(--color-white);
  color: var(--color-secondary-4);
  display: flex;
  justify-content: center;
`;

const StyledDPicker = styled.div`
  position: relative;
`;

const ArrowBackPage = styled(StyledArrowBack)`
  top: -1%;
  left: 0;
`;
function DifficultyPicker() {
  const moveBack = useMoveBack();

  return (
    <StyledDPicker>
      <ArrowBackPage onClick={moveBack}>
        <ArrowBack />
      </ArrowBackPage>
      <StyledHeader>
        <h2>Choose your difficulty level to start the quiz</h2>
      </StyledHeader>

      <CardConDiv>
        <DifficultyOptionsCard
          difficulty="Easy"
          image={EasyImage}
          text="Basic questions to get you started, perfect for beginner"
          bgColor="var(--color-easy-mode)"
        />

        <DifficultyOptionsCard
          difficulty="Medium"
          image={MediumImage}
          text="A balance challenge, test your skills with moderate difficulty."
          bgColor="var(--color-medium-mode)"
        />
        <DifficultyOptionsCard
          difficulty="Hard"
          image={HardImage}
          text="Only  for the experts. Get ready for tough questions!"
          bgColor="var(--color-deep-blue)"
        />
      </CardConDiv>
    </StyledDPicker>
  );
}

export default DifficultyPicker;
