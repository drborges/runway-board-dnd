import React from "react";
import ReactDOM from "react-dom";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

import Board from "./Board";

import "./styles.css";

const nextId = ((i = 0) => () => i++)();
const initialTodos = [
  { id: nextId(), description: "Learn React DnD", type: "doing" },
  { id: nextId(), description: "Use React in Runway", type: "todo" },
  { id: nextId(), description: "Learn React", type: "doing" },
  { id: nextId(), description: "Spike on React DnD with hooks", type: "done" },
  { id: nextId(), description: "Write specs for dnd spike", type: "todo" }
];

const App = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Board initialItems={initialTodos} />
    </DndProvider>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
