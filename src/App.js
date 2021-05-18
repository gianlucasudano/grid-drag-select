import React from "react";
import "./styles.css";
import NoSsr from "@material-ui/core/NoSsr";
import { ThemeProvider } from "@emotion/react";
import {
  createMuiTheme,
  ThemeProvider as MuiThemeProvider
} from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import isPropValid from "@emotion/is-prop-valid";
import styled from "@emotion/styled";
import items from "./data/mocks";
import DragAndSelect from "./components/DragAndSelect/DragAndSelect";
import Label from "./components/Label/Label";

const theme = createMuiTheme();
const toMap = items(25);

const StyledLabel = styled(Label, {
  shouldForwardProp: (prop) =>
    isPropValid(prop) && prop !== "isSelected" && prop !== "isSelecting"
})((props) => {
  const { isSelected, isSelecting, theme } = props;
  const { palette, spacing } = theme;
  return `
      padding: ${spacing(3)}px ${spacing()}px;
      background-color: ${
        isSelected ? palette?.secondary?.dark : palette?.primary?.dark
      };
      opacity: ${isSelecting ? 0.8 : 1};
    `;
});

export default function App() {
  return (
    <NoSsr>
      <MuiThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="App">
            <div id="div"></div>
            <DragAndSelect cols={5} items={toMap} itemToRender={StyledLabel} />
          </div>
        </ThemeProvider>
      </MuiThemeProvider>
    </NoSsr>
  );
}
