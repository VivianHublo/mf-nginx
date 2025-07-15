import { lazy, Suspense } from "react";
import "./App.css";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

function App() {
  const RemoteShift = lazy(async () => import("remote-shift/App"));
  const RemoteHrm = lazy(async () => import("remote-hrm/App"));

  document.addEventListener("remote-hrm:form:name", (e: Event) => {
    const { detail } = e as CustomEvent;
    console.log("[host-admin]");
    console.log(detail);
  });
  return (
    <>
      <h1>Host Admin</h1>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <hr />
      <Suspense key={"shift"} fallback="loading shift...">
        <RemoteShift />
      </Suspense>
      <hr />
      <Suspense key={"hrm"} fallback="loading hrm...">
        <RemoteHrm />
      </Suspense>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
