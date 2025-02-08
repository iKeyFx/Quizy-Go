import styled from "styled-components";
import { CardConDiv, StyledWelcomeDiv } from "./Dashboard";
import DifficultyOptionsCard from "../components/DifficultyOptionsCard";
import EasyImage from "../asset/easy.png";
import MediumImage from "../asset/Medium.png";
import HardImage from "../asset/Hard.png";

const StyledHeader = styled(StyledWelcomeDiv)`
  background-color: var(--color-white);
  color: var(--color-secondary-4);
  display: flex;
  justify-content: center;
`;
function DifficultyPicker() {
  return (
    <div>
      <StyledHeader>
        <h2>Choose your difficulty level to start the quiz</h2>
      </StyledHeader>

      <CardConDiv>
        <DifficultyOptionsCard
          title="Easy"
          image={EasyImage}
          text="Basic questions to get you started, perfect for beginner"
          bgColor="var(--color-easy-mode)"
        />

        <DifficultyOptionsCard
          title="Medium"
          image={MediumImage}
          text="A balance challenge, test your skills with moderate difficulty."
          bgColor="var(--color-medium-mode)"
        />
        <DifficultyOptionsCard
          title="Hard"
          image={HardImage}
          text="Only  for the experts. Get ready for tough questions!"
          bgColor="var(--color-deep-blue)"
        />
      </CardConDiv>
    </div>
  );
}

export default DifficultyPicker;
