import React, { useState } from "react";
import classnames from "classnames";
import { useDrag } from "react-dnd";

import { useInput } from "../hooks";
import "./Card.scss";

const Card = ({ id, description, type, editing = false, onSave }) => {
  const input = useInput(description);
  const [isEditing, setIsEditing] = useState(editing);
  const [{ dragging }, drag] = useDrag({
    item: { id, description, type },
    collect: monitor => ({
      dragging: monitor.isDragging()
    })
  });

  const handleSaveCard = event => {
    setIsEditing(false);
    onSave({
      id,
      type,
      description: event.target.value
    });
  };

  const handleKeyDown = event => {
    if (event.key === "Enter") handleSaveCard(event);
  };

  const css = classnames({
    card: true,
    dragging
  });

  return (
    <div ref={drag} className={css} onDoubleClick={() => setIsEditing(true)}>
      <div className={`header ${type}`} />
      <div className="body">
        {isEditing && (
          <textArea
            placeholder="What is this about?"
            {...input}
            onBlur={handleSaveCard}
            onKeyDown={handleKeyDown}
          />
        )}

        {!isEditing && <span className="description">{description}</span>}
      </div>
    </div>
  );
};

export default Card;
