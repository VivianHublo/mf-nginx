import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  function handleCount() {
    setCount((count) => count + 1);
    document.dispatchEvent(
      new CustomEvent("remote-shift:counter:value", { detail: count + 1 })
    );
  }

  return (
    <>
      <h1>Remote Shift</h1>
      <div className="card">
        <button onClick={() => handleCount()}>the count is {count}</button>
      </div>
    </>
  );
}

export default App;
