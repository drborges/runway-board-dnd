import React from "react";
import classnames from "classnames";
import { useDrop } from "react-dnd";

import "./Column.scss";

const Column = ({ accept, children, title, onDrop, count }) => {
  const [{ isOver }, drop] = useDrop({
    accept,
    drop: onDrop,
    collect: monitor => ({
      isOver: monitor.isOver()
    })
  });

  const css = classnames({
    column: true,
    "drag-over": isOver
  });

  return (
    <div className={css} ref={drop}>
      <div className="header">
        {title} <span className="count">({count})</span>
      </div>
      <div className="body">{children}</div>
    </div>
  );
};

export default Column;