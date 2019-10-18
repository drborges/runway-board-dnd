import React from "react";
import classnames from "classnames";
import { useDrop } from "react-dnd";

import Card from "../Card";

import "./Column.scss";

const Column = ({
  accept,
  items,
  type,
  title,
  onDrop,
  onAddCard,
  onSaveCard
}) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept,
    drop: onDrop,
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  });

  const css = classnames({
    column: true,
    "drag-over": isOver,
    droppable: canDrop
  });

  return (
    <div className={css} ref={drop}>
      <div className="header">
        <span className="title">{title}</span>
        <span className="count">({items.length})</span>
      </div>

      <button onClick={() => onAddCard(type)}>New Card</button>

      <div className="body">
        {items.map(item => (
          <Card key={item.id} {...item} onSave={onSaveCard} />
        ))}
      </div>
    </div>
  );
};

export default Column;
