import clsx from "clsx";
import Link, { ToType } from "components/link/link";
import React from "react";

import styles from "./lp-button.module.scss";

interface LPButtonProps {
  id?: string;
  type?: "button" | "submit";
  color?: "primary" | "secondary" | "pink";
  circle?: boolean;
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
  circle,
  className,
  type,
  disabled,
  onClick,
  children,
  href
}) => {
  const classname = clsx(styles["lp-button"], className, {
    [styles["lp-button--pink"]]: color === "pink",
    [styles["lp-button--primary"]]: color === "primary",
    [styles["lp-button--secondary"]]: color === "secondary",
    [styles["lp-button--circle"]]: circle
  });
  const title = typeof children === "string" ? children : String(href);
  switch (true) {
    case href &&
      typeof href === "string" &&
      (href.includes("http") || href.includes("mailto")):
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
        <Link
          white
          title={title}
          className={classname}
          onClick={onClick}
          to={href}
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
