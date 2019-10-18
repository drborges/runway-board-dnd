import React from "react";
import classnames from "classnames";
import { useDrop } from "react-dnd";

import Card from "../Card";

import "./Column.scss";

const Column = ({ accept, items, title, onDrop }) => {
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

      <div className="body">
        {items.map(item => (
          <Card key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Column;
