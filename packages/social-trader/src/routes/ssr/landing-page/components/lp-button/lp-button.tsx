import "./lp-button.scss";

import classnames from "classnames";
import Link, { ToType } from "components/link/link";
import React from "react";

interface LPButtonProps {
  id?: string;
  type?: "button" | "submit";
  color?: "primary" | "secondary";
  className?: string;
  disabled?: boolean;
  onClick?: (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>
  ) => void;
  children: string | JSX.Element;
  href?: string | ToType;
}

const _LPButton: React.FC<LPButtonProps> = ({
  id,
  color,
  className,
  type,
  disabled,
  onClick,
  children,
  href
}) => {
  const classname = classnames("lp-button", className, {
    "lp-button--primary": color === "primary",
    "lp-button--secondary": color === "secondary"
  });
  switch (true) {
    case href &&
      typeof href === "string" &&
      (href.includes("http") || href.includes("mailto")):
      const title = typeof children === "string" ? children : String(href);
      return (
        <a title={title} href={href as string} className={classname}>
          {children}
        </a>
      );
    case !href:
      return (
        <button
          id={id}
          disabled={disabled}
          className={classname}
          onClick={onClick}
          type={type}
        >
          {children}
        </button>
      );
    case !!href:
      return (
        <Link className={classname} onClick={onClick} to={href}>
          {children}
        </Link>
      );
    default:
      return null;
  }
};

_LPButton.defaultProps = {
  color: "primary",
  type: "button"
};

const LPButton = React.memo(_LPButton);
export default LPButton;
