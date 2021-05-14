import styled from "@emotion/styled";
import { borders } from "@material-ui/system";

export const StyledItem = styled.div`
  ${borders};
  ${({ isSelected, isSelecting, theme }) => {
    const { palette, spacing } = theme;
    return `
      padding: ${spacing(3)}px ${spacing()}px;
      background-color: ${
        isSelected ? palette?.secondary?.dark : palette?.primary?.dark
      };
      opacity: ${isSelecting ? 0.8 : 1};
    `;
  }};
  user-select: none;
`;
