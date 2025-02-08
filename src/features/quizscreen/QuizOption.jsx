import { useState } from "react";
import styled from "styled-components";

const StyledQuizOption = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  background-color: var(--color-gray);
  border-radius: 10px;
  color: var(--color-primary);
  font-weight: 700;
  gap: 2rem;
  padding: 0.75rem 1.5rem;
  box-sizing: border-box;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  border: 1px solid
    ${({ isSelected }) => (isSelected ? "var(--color-primary)" : "none")};
  &:hover {
    transition: border 0.3s;
    border: 0.1px solid var(--color-primary);
  }

  @media (max-width: 500px) {
    gap: 1rem;
    font-size: 12px;
  }
`;

const StyledQuizLetter = styled.div`
  background-color: var(--color-primary-1);
  color: var(--color-primary);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
  font-weight: 600;
  width: 35px;
  height: 35px;
  flex-shrink: 0;
`;
function QuizOption({ alphabet, option, onOptionClick, selectedOption }) {
  const mark = selectedOption === option;

  return (
    <StyledQuizOption onClick={() => onOptionClick(option)} isSelected={mark}>
      <StyledQuizLetter>
        <span>{alphabet}</span>
      </StyledQuizLetter>
      <span>{option}</span>
    </StyledQuizOption>
  );
}

export default QuizOption;
