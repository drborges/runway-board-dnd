import React from "react";
import { useDrag } from "react-dnd";

import "./Card.scss";

const Card = ({ id, description, state }) => {
  const [{ opacity }, drag] = useDrag({
    item: { id, description, type: state },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.2 : 1
    })
  });

  return (
    <div ref={drag} className="card" style={{ opacity }}>
      <div className={`header ${state}`} />
      <div className="body">{description}</div>
    </div>
  );
};

export default Card;
