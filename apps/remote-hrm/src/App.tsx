import { useState, type ChangeEvent } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
    document.dispatchEvent(
      new CustomEvent("remote-hrm:form:name", { detail: e })
    );
  }

  document.addEventListener("remote-shift:counter:value", (e: Event) => {
    const { detail } = e as CustomEvent;
    console.log("[remote-hrm]");
    console.log(detail);
  });

  return (
    <>
      <h1>Remote Hrm</h1>
      <pre>name: {name}</pre>
      <input
        type="text"
        name="name"
        id="name"
        value={name}
        onChange={(e) => handleChange(e)}
      />
    </>
  );
}

export default App;
