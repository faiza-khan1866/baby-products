import React from "react";
import { Card } from "react-bootstrap";

const TrimesterCard = ({ bgColor, content }) => {
  return (
    <Card
      className="trimester-card"
      style={{ backgroundColor: `${bgColor}` }}
    >
      <div
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
    </Card>
  );
};

export default TrimesterCard;
