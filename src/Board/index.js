import React, { useCallback, useState } from "react";

import { nextId } from "../helpers";
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

  const handleAddCard = useCallback(
    type => {
      setItems([
        ...items,
        { id: nextId(), description: "", type, editing: true }
      ]);
    },
    [items]
  );

  const handleSaveCard = useCallback(
    ({ id, description, type }) => {
      const updatedItem = { id, description, type };
      const updatedItemIndex = items.findIndex(item => item.id === id);

      setItems([
        ...items.slice(0, updatedItemIndex),
        updatedItem,
        ...items.slice(updatedItemIndex + 1)
      ]);
    },
    [items]
  );

  return (
    <div className="Board">
      {initialColumns.map(column => (
        <Column
          key={column.id}
          {...column}
          items={itemsByType(items, column.type)}
          onDrop={item => handleDrop(item, column.type)}
          onAddCard={handleAddCard}
          onSaveCard={handleSaveCard}
        />
      ))}
    </div>
  );
}

export default Board;
