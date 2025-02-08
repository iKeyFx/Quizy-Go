import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate, useSearchParams } from "react-router";
import styled from "styled-components";

const ComponentCOn = styled.div`
  border: 2px solid
    ${(props) => (props.borderColor ? props.borderColor : "inherit")};
  text-align: center;
  color: var(--color-primary);
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 8px var(--color-gray-text);
  }

  h3 {
    min-height: 20px;
  }

  p {
    font-size: 12px;
    color: var(--color-gray-text);
  }

  @media (max-width: 600px) {
    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
`;

const Button = styled.button`
  width: 100%;
  background-color: var(--color-primary);
  color: var(--color-white);
  margin-top: 1rem;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transition: opacity 0.3s ease;

  &:hover {
    background-color: var(--color-secondary-2);
  }
`;

const StyledImage = styled(LazyLoadImage)`
  width: 150px;
  height: 150px;
  transition: transform 0.3s ease;
  ${ComponentCOn}:hover & {
    transform: scale(1.1);
  }
`;

function DashBoardComponent({ image, text, title, borderColor }) {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const handClick = () => {
    navigate(`/dashboard/${title}/quiz-mode`);
  };
  return (
    <ComponentCOn
      borderColor={borderColor}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {image && <StyledImage src={image} alt="image" />}
      <h3>{title}</h3>
      <p>{text}</p>
      <Button visible={visible} onClick={handClick}>
        Take Quiz
      </Button>
    </ComponentCOn>
  );
}

export default DashBoardComponent;
