import React from "react";

function SimpleButton(props) {
  return (
    <div
      className={
        props.className
          ? props.className
          : `m-btn-simple`
      }
      onClick={() => props.onClick()}
      style={{ ...props.style }}
    >
      <span>{props.children}</span>
    </div>
  );
}

export default SimpleButton;
