import styled from "@emotion/styled";

export const StyledInfoBox = styled.div`
  margin-top: ${({ theme }) => `${theme?.spacing(3)}px`};
  padding: ${({ theme }) => `${theme?.spacing(3)}px ${theme?.spacing()}px`};
  display: flex;
  flex-flow: column;
  text-align: left;
  line-height: 1.3rem;
`;

export const StyledLabel = styled.span`
  font-weight: 700;
  margin-right: ${({ theme }) => `${theme?.spacing()}px`};
`;
