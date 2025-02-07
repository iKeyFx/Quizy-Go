import { LazyLoadImage } from "react-lazy-load-image-component";
import styled from "styled-components";

const StyledTCCon = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;

  p {
    margin-top: 0;
    margin-bottom: 30px;
    color: var(--color-secondary-4);
  }

  span {
    color: var(--color-gray-text);
    font-size: 12px;
  }

  @media (max-width: 500px) {
    font-size: 12px;
  }
`;

const StyledImage = styled(LazyLoadImage)`
  width: 50px;
  height: 50px;
`;
function TestimonyCardComponent({ name, image, text }) {
  return (
    <StyledTCCon>
      <div>
        <StyledImage src={image} alt="Testimony Image" />
      </div>

      <div>
        <p>{text}</p>
        <span>{name}</span>
      </div>
    </StyledTCCon>
  );
}

export default TestimonyCardComponent;
