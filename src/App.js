import React from "react";
import "./styles.css";
import NoSsr from "@material-ui/core/NoSsr";
import { ThemeProvider } from "@emotion/react";
import {
  createMuiTheme,
  ThemeProvider as MuiThemeProvider
} from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import items from "./data/mocks";
import DragAndSelect from "./components/DragAndSelect/DragAndSelect";

const theme = createMuiTheme();
const toMap = items(25);

const SimpleLabel = ({ label, ...rest }) => <>{label}</>;

export default function App() {
  return (
    <NoSsr>
      <MuiThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="App">
            <div id="div"></div>
            <DragAndSelect cols={5} items={toMap} itemToRender={SimpleLabel} />
          </div>
        </ThemeProvider>
      </MuiThemeProvider>
    </NoSsr>
  );
}
