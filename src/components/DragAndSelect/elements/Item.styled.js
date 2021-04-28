import styled from "@emotion/styled";

export const StyledItem = styled.div`
  padding: 18px 6px;
  border: 1px solid #000;
  background-color: ${(props) => (props.isSelected ? "red" : "green")};
`;

export const StyledGrid = styled.div`
  display: grid;
  grid-gap: 6px;
  grid-template-columns: repeat(${(props) => props.cols}, 1fr);
  grid-template-rows: repeat(${(props) => props.rows}, 1fr);
  grid-auto-flow: column;
`;
