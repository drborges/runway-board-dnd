import React, { useCallback, useState } from "react";

import DraggableItems from "../DraggableItems";
import Column from "../Column";
import Card from "../Card";

import "./Board.scss";

const itemsByType = (items, type) => items.filter(item => item.type === type);

function Board({ initialItems }) {
  const [items, setItems] = useState(initialItems);
  const todoItems = itemsByType(items, "todo");
  const doingItems = itemsByType(items, "doing");
  const doneItems = itemsByType(items, "done");
  const handleDrop = useCallback(
    ({ id, description }, type) => {
      const updatedDraggedTodo = { id, description, type };
      const remainingItems = items.filter(t => t.id !== id);
      setItems([...remainingItems, updatedDraggedTodo]);
    },
    [items]
  );

  return (
    <div className="Board">
      <Column
        accept={[DraggableItems.DOING, DraggableItems.DONE]}
        items={todoItems}
        title="Todo"
        onDrop={item => handleDrop(item, "todo")}
      />

      <Column
        accept={[DraggableItems.TODO, DraggableItems.DONE]}
        title="Doing"
        items={doingItems}
        onDrop={item => handleDrop(item, "doing")}
      />

      <Column
        accept={[DraggableItems.TODO, DraggableItems.DOING]}
        title="Done"
        items={doneItems}
        onDrop={item => handleDrop(item, "done")}
      />
    </div>
  );
}

export default Board;
