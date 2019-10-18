import React from "react";
import ReactDOM from "react-dom";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

import DraggableItems from "./DraggableItems";
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

const initialColumns = [
  {
    id: nextId(),
    type: "todo",
    title: "Todo",
    accept: [DraggableItems.DOING, DraggableItems.DONE]
  },
  {
    id: nextId(),
    type: "doing",
    title: "Doing",
    accept: [DraggableItems.TODO, DraggableItems.DONE]
  },
  {
    id: nextId(),
    type: "done",
    title: "Done",
    accept: [DraggableItems.TODO, DraggableItems.DOING]
  }
];

const App = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Board initialColumns={initialColumns} initialItems={initialTodos} />
    </DndProvider>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
