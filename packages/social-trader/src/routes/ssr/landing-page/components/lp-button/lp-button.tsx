import "./lp-button.scss";

import classnames from "classnames";
import Link from "components/link/link";
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
  href?: string;
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
    case href && (href.includes("http") || href.includes("mailto")):
      return (
        <Link to={href} className={classname}>
          {children}
        </Link>
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
        <Link
          className={classname}
          onClick={onClick}
          to={{
            pathname: href as string
          }}
        >
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
