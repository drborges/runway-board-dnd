import React from "react";
import { useDrag } from "react-dnd";

import "./Card.scss";

const Card = ({ id, description, type }) => {
  const [{ opacity }, drag] = useDrag({
    item: { id, description, type },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.2 : 1
    })
  });

  return (
    <div ref={drag} className="card" style={{ opacity }}>
      <div className={`header ${type}`} />
      <div className="body">{description}</div>
    </div>
  );
};

export default Card;
