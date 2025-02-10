import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate, useParams, useSearchParams } from "react-router";
import styled from "styled-components";

const ComponentCOn = styled.div`
  background-color: ${(props) => (props.bgColor ? props.bgColor : "inherit")};
  text-align: center;
  color: var(--color-white);
  padding: 1rem 1rem;
  border-radius: 8px;
  width: 200px;
  height: 250px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 8px var(--color-text);
  }

  h3 {
    min-height: 20px;
  }

  p {
    font-size: 12px;
    color: var(--color-gray-text);
  }
`;

const Button = styled.button`
  /* width: 100%; */
  background-color: var(--color-white);
  color: var(--color-primary);
  margin-top: 1rem;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transition: opacity 0.3s ease;

  &:hover {
    background-color: var(--color-gray-text);
  }
`;

const StyledImage = styled(LazyLoadImage)`
  /* width: 150px;
  height: 150px; */
  transition: transform 0.3s ease;
  ${ComponentCOn}:hover & {
    transform: scale(1.1);
  }
`;

function DifficultyOptionsCard({ image, text, difficulty, bgColor }) {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const { category } = useParams();
  const handleDifficultySelect = (difficulty) => {
    console.log(difficulty);
    navigate(`/quiz/${category}/${difficulty}`);
  };
  return (
    <ComponentCOn
      bgColor={bgColor}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <h3>{difficulty}</h3>
      <StyledImage src={image} alt="image" />
      <p>{text}</p>
      <Button
        visible={visible}
        onClick={() => handleDifficultySelect(difficulty)}
      >
        Start Quiz
      </Button>
    </ComponentCOn>
  );
}

export default DifficultyOptionsCard;
