import styled from "styled-components";

export const StyledButton = styled.button`
  border: ${(props) =>
    props.retry ? "none" : "1px solid var(--color-primary-2)"};
  margin-top: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s;

  border-radius: 8px;
  font-size: 0.8rem;
  margin: 1rem auto;
  background-color: ${(props) =>
    props.retry ? "var(--color-primary)" : "var(--color-white)"};
  color: ${(props) =>
    props.retry ? "var(--color-white)" : "var(--color-primary)"};
  font-weight: 700;

  &:hover {
    background-color: ${(props) =>
      props.retry ? "var(--color-primary-2)" : ""};
    color: ${(props) =>
      props.retry ? "var(--color-white)" : "var(--color-primary-2)"};
    border: ${(props) =>
      props.retry ? "none" : "1px solid var(--color-primary)"};
  }

  @media (max-width: 500px) {
    font-size: 0.5rem;
    width: 120px;
  }
`;
