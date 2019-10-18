import React, { useCallback, useState } from "react";

import Column from "../Column";

import "./Board.scss";

const itemsByType = (items, type) => items.filter(item => item.type === type);

function Board({ initialColumns, initialItems }) {
  const [items, setItems] = useState(initialItems);
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
      {initialColumns.map(column => (
        <Column
          key={column.id}
          accept={column.accept}
          title={column.title}
          items={itemsByType(items, column.type)}
          onDrop={item => handleDrop(item, column.type)}
        />
      ))}
    </div>
  );
}

export default Board;
