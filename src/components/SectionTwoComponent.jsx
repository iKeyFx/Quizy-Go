import { LazyLoadImage } from "react-lazy-load-image-component";
import styled from "styled-components";

const StyledCardHead = styled.div`
  background-color: var(--color-white);
  border-radius: 8px;
  place-items: center;
  padding: 0.5rem 1rem;
  border: 2px solid
    ${(props) => (props.borderColor ? props.borderColor : "inherit")};
`;

const StyledCardText = styled.div`
  padding: 0 0 1rem 0;
  h3 {
    color: var(--color-primary);
    min-height: 50px;
  }

  p {
    font-size: 14px;
    color: var(--color-primary-2);
    color: var(--color-gray-text);
    font-weight: 400;
    margin: 0;
  }

  @media (max-width: 500px) {
    font-size: 12px;

    p {
      font-size: 12px;
    }
  }
`;
function SectionTwoComponent({ title, image, description, borderColor }) {
  return (
    <StyledCardHead borderColor={borderColor}>
      <LazyLoadImage src={image} alt="Leaner" />
      <StyledCardText>
        <h3>{title}</h3>
        <p>{description}</p>
      </StyledCardText>
    </StyledCardHead>
  );
}

export default SectionTwoComponent;
