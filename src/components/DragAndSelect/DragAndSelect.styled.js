import styled from "@emotion/styled";

export const StyledGrid = styled.div`
  display: grid;
  grid-gap: ${({ theme }) => `${theme?.spacing()}px`};
  grid-template-columns: repeat(${({ cols }) => cols}, 1fr);
  grid-template-rows: repeat(${({ rows }) => rows}, 1fr);
  grid-auto-flow: column;
`;
