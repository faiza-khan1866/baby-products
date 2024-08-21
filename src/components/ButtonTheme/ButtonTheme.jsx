import React from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";

function ButtonTheme(props) {
  return (
    <Button
      variant={
        props.outline ? `outline-${props.variant}` : props.variant || "primary"
      }
      onClick={props.onClick ? () => props.onClick() : () => {}}
      size={props.size}
      block={props.block || false}
      type={props.type || "button"}
      disabled={props.disabled}
      style={{ ...props.style }}
      className={`btn-theme ${props.outline ? "outline-bg" : "with-bg"} ${
        props.className
      }`}
    >
      {props.children}
    </Button>
  );
}

ButtonTheme.propTypes = {
  outline: PropTypes.bool,
  onClick: PropTypes.func,
  variant: PropTypes.string,
  block: PropTypes.bool,
  size: PropTypes.oneOf(["lg", "sm"]),
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  style: PropTypes.object,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

export default ButtonTheme;
