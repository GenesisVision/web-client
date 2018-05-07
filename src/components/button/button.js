import React, { Component } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import './button.css';

export default class Button extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    class: PropTypes.string,
    disabled: PropTypes.bool,
    fullWidth: PropTypes.bool,
    primary: PropTypes.bool,
    secondary: PropTypes.bool
  };

  static defaultProps = {
    className: "",
    disabled: false,
    fullWidth: false,
    primary: false,
    secondary: false
  };

  render() {
    const {
      label,
      className,
      disabled,
      primary,
      secondary,
      style
    } = this.props;
    return (
      <button
        disabled={disabled}
        className={classnames("gv-btn", className, {
          "gv-btn--disabled": disabled,
          "gv-btn--primary": primary,
          "gv-btn--secondary": secondary
        })}
        style={style}
      >
        {label}
      </button>
    );
  }
}
