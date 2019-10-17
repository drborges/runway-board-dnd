import React, { useState } from "react";
import ReactDOM from "react-dom";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

import DraggableItems from "./DraggableItems";
import Column from "./Column";
import Card from "./Card";

import "./styles.css";

const nextId = ((i = 0) => () => i++)();

const initialTodos = [
  { id: nextId(), description: "Learn React DnD", state: "todo" },
  { id: nextId(), description: "Use React in Runway", state: "todo" },
  { id: nextId(), description: "Spike React", state: "doing" }
];

const todosByState = (todos, state) => todos.filter(t => t.state === state);

function App() {
  const [todos, setTodos] = useState(initialTodos);
  const todoItems = todosByState(todos, "todo");
  const doingItems = todosByState(todos, "doing");
  const doneItems = todosByState(todos, "done");
  const handleDrop = ({ id, description }, state) => {
    const draggedTodoWithUpdatedState = { id, description, state };
    const remainingTodos = todos.filter(t => t.id !== id);
    setTodos([...remainingTodos, draggedTodoWithUpdatedState]);
  };

  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <Column
          accept={[DraggableItems.DOING, DraggableItems.DONE]}
          title="Todo"
          onDrop={item => handleDrop(item, "todo")}
          count={todoItems.length}
        >
          {todoItems.map(item => (
            <Card
              key={item.id}
              id={item.id}
              description={item.description}
              state={item.state}
            />
          ))}
        </Column>

        <Column
          accept={[DraggableItems.TODO, DraggableItems.DONE]}
          title="Doing"
          onDrop={item => handleDrop(item, "doing")}
          count={doingItems.length}
        >
          {doingItems.map(item => (
            <Card
              key={item.id}
              id={item.id}
              description={item.description}
              state={item.state}
            />
          ))}
        </Column>

        <Column
          accept={[DraggableItems.TODO, DraggableItems.DOING]}
          title="Done"
          onDrop={item => handleDrop(item, "done")}
          count={doneItems.length}
        >
          {doneItems.map(item => (
            <Card
              key={item.id}
              id={item.id}
              description={item.description}
              state={item.state}
            />
          ))}
        </Column>
      </DndProvider>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
