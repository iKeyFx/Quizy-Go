import { useParams, useSearchParams } from "react-router";
import { CardConDiv, StyledWelcomeDiv } from "./Dashboard";
import styled from "styled-components";
import DashBoardComponent from "../components/DashBoardComponent";

const StyledSubCategoriesDiv = styled(StyledWelcomeDiv)`
  justify-content: center;
`;
function SelectSubCategory() {
  const [searchParams] = useSearchParams();
  const { d } = useParams();
  const test = searchParams.get("category");

  console.log(d, test);
  return (
    <div>
      <StyledSubCategoriesDiv>
        <h2>Please a {d} Subject</h2>
      </StyledSubCategoriesDiv>

      <CardConDiv>
        <DashBoardComponent
          title="Physics"
          text="Challenge your knowledge in physics."
          borderColor="var(--color-secondary-1)"
        />
        <DashBoardComponent
          title="Chemistry"
          text="Challenge your knowledge in  chemistry."
          borderColor="var(--color-secondary-1)"
        />
        <DashBoardComponent
          title="Biology"
          text="Challenge your knowledge in biology."
          borderColor="var(--color-secondary-1)"
        />
      </CardConDiv>
    </div>
  );
}

export default SelectSubCategory;
