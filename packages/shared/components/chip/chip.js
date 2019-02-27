import "./chip.scss";

import classnames from "classnames";
import PropTypes from "prop-types";
import React, { Component } from "react";

class Chip extends Component {
  handleClick = event => {
    if (typeof this.props.onClick === "function") {
      this.props.onClick(event);
    }
  };

  render() {
    const {
      type,
      children,
      rounded,
      onClick,
      className,
      disabled
    } = this.props;
    return (
      <div
        className={classnames("chip", className, {
          [`chip--${type}`]: type,
          "chip--rounded": rounded,
          "chip--disabled": disabled,
          "chip--pointer": !disabled && typeof onClick === "function"
        })}
        onClick={!disabled && this.handleClick}
      >
        <div className="chip__content">{children}</div>
      </div>
    );
  }
}

Chip.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
    PropTypes.node
  ]),
  className: PropTypes.string,
  rounded: PropTypes.bool,
  type: PropTypes.oneOf(["positive", "negative", "warning"]),
  onClick: PropTypes.func
};

export default Chip;
