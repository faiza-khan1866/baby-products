import React from "react";

function HoverCurve(props) {
  return (
    // <div style={{ height: "150px", overflow: "hidden" }}>
      <svg
        viewBox="0 0 500 200"
        enableBackground="new 0 0 500 200"
        preserveAspectRatio="none"
        style={{ ...props.svgStyle, height: "100%", width: "100%" }}
        className={props.svgClass}
      >
        <path
          d="M91.05,85.03 C183.03,124.50 163.28,-14.64 269.37,10.03 L269.94,156.08 L91.05,156.08 Z"
          style={{
            ...props.pathStyle,
            stroke: "none",
            fill: props.color || "#e65550",
          }}
          className={props.pathClass}
        ></path>
      </svg>
    // </div>
  );
}

export default HoverCurve;
