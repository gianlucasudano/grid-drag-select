import "./styles.css";
import items from "./data/mocks";
import DragAndSelect from "./components/DragAndSelect/DragAndSelect";

const toMap = items(25);

export default function App() {
  return (
    <div className="App">
      <div id="div"></div>
      <DragAndSelect cols={5} items={toMap} />
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
