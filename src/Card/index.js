import React from "react";
import classnames from "classnames";
import { useDrag } from "react-dnd";

import "./Card.scss";

const Card = ({ id, description, type }) => {
  const [{ dragging }, drag] = useDrag({
    item: { id, description, type },
    collect: monitor => ({
      dragging: monitor.isDragging()
    })
  });

  const css = classnames({
    card: true,
    dragging
  });

  return (
    <div ref={drag} className={css}>
      <div className={`header ${type}`} />
      <div className="body">{description}</div>
    </div>
  );
};

export default Card;
