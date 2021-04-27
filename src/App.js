import "./styles.css";
import items from "./data/mocks";
import DragEndSelect from "./components/DragEndSelect/DragEndSelect";

const toMap = items(25);

export default function App() {
  return (
    <div className="App">
      <DragEndSelect cols={5} items={toMap} />
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
