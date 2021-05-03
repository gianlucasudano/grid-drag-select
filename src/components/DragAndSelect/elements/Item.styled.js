import styled from "@emotion/styled";

export const StyledItem = styled.div`
  padding: 18px 6px;
  border: 1px solid #000;
  background-color: ${(props) => (props.isSelected ? "red" : "green")};
  opacity: ${(props) => (props.isSelecting ? 0.8 : 1)};
  user-select: none;
`;
