import React, { Component } from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import PropTypes from "prop-types";
import "./button.css";

const GVLink = ({ isExternal, children, href, ...other }) => {
  const target = isExternal ? "_self" : null;
  return (
    <Link to={href} target={target} {...other}>
      {children}
    </Link>
  );
};

export default class Button extends Component {
  static propTypes = {
    label: PropTypes.string,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    fullWidth: PropTypes.bool,
    primary: PropTypes.bool,
    secondary: PropTypes.bool,
    onClick: PropTypes.func,
    href: PropTypes.string,
    isExternal: PropTypes.bool,
    icon: PropTypes.element
  };

  static defaultProps = {
    className: "",
    disabled: false,
    fullWidth: false,
    primary: false,
    secondary: false,
    isExternal: false,
    label: null,
    icon: null
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
      icon,
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
        {icon}
        {label}
      </button>
    );
  }
}
