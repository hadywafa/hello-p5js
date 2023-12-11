import { useState } from "react";
import "./App.css";
import Sketch from "./components/sketch";
import StatusBar from "./components/status-bar";
import ActionBar from "./components/action-bar";
import { CommandInvoker } from "./core/services/commandInvoker";
import { Command } from "./core/models/command";

function App() {
  const [commandAction, setCommandAction] = useState("");
  const commandInvoker = new CommandInvoker();

  const executeCommand = (command: Command) => {
    commandInvoker.executeCommand(command);
  };
  return (
    <>
      <ActionBar setCommandAction={setCommandAction} executeCommand={executeCommand} />
      <Sketch commandAction={commandAction} executeCommand={executeCommand} />
      <StatusBar commandAction={commandAction} />
    </>
  );
}

export default App;
