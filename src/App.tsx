import { useState } from "react";
import "./App.css";
import Sketch from "./components/sketch";
import StatusBar from "./components/status-bar";
import ActionBar from "./components/action-bar";

function App() {
  const [drawingAction, setDrawingAction] = useState("");
  return (
    <>
      <ActionBar  setDrawingAction={setDrawingAction} />
      <Sketch drawingAction={drawingAction} />
      <StatusBar drawingAction={drawingAction} />
    </>
  );
}

export default App;
