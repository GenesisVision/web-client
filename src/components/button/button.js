import React, { Component } from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import PropTypes from "prop-types";
import "./button.css";

export default class Button extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    class: PropTypes.string,
    disabled: PropTypes.bool,
    fullWidth: PropTypes.bool,
    primary: PropTypes.bool,
    secondary: PropTypes.bool,
    onClick: PropTypes.func,
    href: PropTypes.string
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
      style,
      href,
      onClick,
      fullWidth,
      ...other
    } = this.props;
    const cn = classnames("gv-btn", className, {
      "gv-btn--full-width": fullWidth,
      "gv-btn--disabled": disabled,
      "gv-btn--primary": primary,
      "gv-btn--secondary": secondary
    });
    return href ? (
      <Link className={cn} to={href} title={label} {...other}>
        {label}
      </Link>
    ) : (
      <button
        disabled={disabled}
        className={cn}
        onClick={onClick}
        style={style}
        title={label}
        {...other}
      >
        {label}
      </button>
    );
  }
}
