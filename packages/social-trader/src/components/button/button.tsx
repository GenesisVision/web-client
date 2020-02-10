import "./button.scss";

import classNames from "classnames";
import Link from "components/link/link";
import React from "react";

interface IButton {
  label: any;
  className: string;
  disabled: boolean;
  fullWidth: boolean;
  primary: boolean;
  secondary: boolean;
  onClick?(): any;
  href?: string;
  isExternal: boolean;
  icon?: any;
}
interface IGVLinkProps {
  className: string;
  isExternal: boolean;
  href: string;
}
const GVLink: React.FC<IGVLinkProps> = ({
  className,
  isExternal,
  children,
  href,
  ...other
}) => {
  return (
    <Link to={href} className={className} {...other}>
      {children}
    </Link>
  );
};

export default class Button extends React.PureComponent<IButton> {
  render() {
    const {
      label = null,
      className = "",
      disabled = false,
      primary = false,
      secondary = false,
      href,
      onClick,
      fullWidth = false,
      isExternal = false,
      icon = null,
      ...other
    } = this.props;
    const cn = classNames("gv-btn", className, {
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
