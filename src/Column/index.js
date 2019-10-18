import React from "react";
import classnames from "classnames";
import { useDrop } from "react-dnd";

import Card from "../Card";

import "./Column.scss";

const Column = ({
  accept,
  items = [],
  type,
  title,
  onDrop,
  onAddCard,
  onSaveCard,
  maxWip = 3
}) => {
  const withinWipLimit = items.length < maxWip;
  const [{ isOver, canDrop }, drop] = useDrop({
    accept,
    drop: withinWipLimit ? onDrop : () => {},
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: withinWipLimit && monitor.canDrop()
    })
  });

  const css = classnames({
    column: true,
    "drag-over": isOver && canDrop,
    droppable: canDrop
  });

  return (
    <div className={css} ref={drop}>
      <div className="header">
        <span className="title">{title}</span>
        <span className="count">({items.length})</span>
        {type === "doing" && <div className="max-wip">Max WIP: {maxWip}</div>}
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
