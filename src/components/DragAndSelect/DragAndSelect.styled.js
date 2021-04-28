import styled from "@emotion/styled";

export const StyledGrid = styled.div`
  display: grid;
  grid-gap: 6px;
  grid-template-columns: repeat(${(props) => props.cols}, 1fr);
  grid-template-rows: repeat(${(props) => props.rows}, 1fr);
  grid-auto-flow: column;
`;
