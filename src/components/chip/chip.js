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
    const { type, children, round, onClick } = this.props;
    return (
      <span
        className={classnames("chip", {
          [`chip--${type}`]: type,
          "chip--round": round,
          "chip--pointer": typeof onClick === "function"
        })}
        onClick={this.handleClick}
      >
        {children}
      </span>
    );
  }
}

Chip.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
    PropTypes.node
  ]),
  round: PropTypes.bool,
  type: PropTypes.oneOf(["positive", "negative"]),
  onClick: PropTypes.func
};

export default Chip;
