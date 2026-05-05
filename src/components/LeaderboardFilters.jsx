import styled from "styled-components";
import { VALID_CATEGORIES, VALID_DIFFICULTIES } from "../data/constants";

const FiltersRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
`;

const StyledSelect = styled.select`
  padding: 0.5rem 1rem;
  border: 1.5px solid var(--color-primary);
  border-radius: 6px;
  font-size: 0.9rem;
  color: var(--color-primary);
  background-color: var(--color-white);
  cursor: pointer;
  outline: none;

  &:focus {
    border-color: var(--color-primary-2);
  }
`;

function LeaderboardFilters({
  category,
  difficulty,
  onCategoryChange,
  onDifficultyChange,
}) {
  return (
    <FiltersRow>
      <StyledSelect
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option value="">All Categories</option>
        {VALID_CATEGORIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </StyledSelect>

      <StyledSelect
        value={difficulty}
        onChange={(e) => onDifficultyChange(e.target.value)}
      >
        <option value="">All Difficulties</option>
        {VALID_DIFFICULTIES.map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
      </StyledSelect>
    </FiltersRow>
  );
}

export default LeaderboardFilters;
