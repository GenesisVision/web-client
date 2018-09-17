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
    const { type, children, rounded, onClick } = this.props;
    return (
      <div
        className={classnames("chip", {
          [`chip--${type}`]: type,
          "chip--rounded": rounded,
          "chip--pointer": typeof onClick === "function"
        })}
        onClick={this.handleClick}
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
  rounded: PropTypes.bool,
  type: PropTypes.oneOf(["positive", "negative"]),
  onClick: PropTypes.func
};

export default Chip;
