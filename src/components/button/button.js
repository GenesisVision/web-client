import React, { Component } from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import PropTypes from "prop-types";
import "./button.css";

const GVLink = ({ isExternal, children, href, ...other }) =>
  isExternal ? (
    <a href={href} {...other}>
      {children}
    </a>
  ) : (
    <Link to={href} {...other}>
      {children}
    </Link>
  );

export default class Button extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    class: PropTypes.string,
    disabled: PropTypes.bool,
    fullWidth: PropTypes.bool,
    primary: PropTypes.bool,
    secondary: PropTypes.bool,
    onClick: PropTypes.func,
    href: PropTypes.string,
    icon: PropTypes.Component,
    isExternal: PropTypes.bool
  };

  static defaultProps = {
    className: "",
    disabled: false,
    fullWidth: false,
    primary: false,
    secondary: false,
    isExternal: false
  };

  render() {
    const {
      label,
      className,
      disabled,
      primary,
      secondary,
      href,
      onClick,
      fullWidth,
      isExternal,
      ...other
    } = this.props;
    const cn = classnames("gv-btn", className, {
      "gv-btn--full-width": fullWidth,
      "gv-btn--disabled": disabled,
      "gv-btn--primary": primary,
      "gv-btn--secondary": secondary
    });
    return href ? (
      <GVLink isExternal={isExternal} className={cn} href={href} {...other}>
        {label}
      </GVLink>
    ) : (
      <button
        disabled={disabled}
        className={cn}
        onClick={onClick}
        title={label}
        {...other}
      >
        {label}
      </button>
    );
  }
}
