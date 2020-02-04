import "./style.scss";

import classNames from "classnames";
import React from "react";

export enum GV_BTN_SIZE {
  SMALL = "SMALL",
  LARGE = "LARGE",
  BIG = "BIG",
  MIDDLE = "MIDDLE"
}

interface GVButtonProps {
  testId?: string;
  bold?: boolean;
  wide?: boolean;
  size?: GV_BTN_SIZE;
  id?: string;
  title?: string;
  variant?: "text" | "outlined" | "contained";
  color?: "primary" | "secondary" | "primary-dark" | "danger";
  type?: "button" | "submit";
  className?: string;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children?: string | JSX.Element;
  name?: string;
  noPadding?: boolean;
}

const GVButton: React.FC<GVButtonProps> = ({
  testId,
  bold,
  wide,
  size = GV_BTN_SIZE.MIDDLE,
  id,
  className,
  title,
  variant,
  color,
  type,
  disabled,
  onClick,
  children,
  name,
  noPadding
}) => {
  const classname = classNames("gv-btn", className, {
    "gv-btn--bold": bold,
    "gv-btn--wide": wide,
    "gv-btn--large": size === GV_BTN_SIZE.LARGE,
    "gv-btn--big": size === GV_BTN_SIZE.BIG,
    "gv-btn--small": size === GV_BTN_SIZE.SMALL,
    "gv-btn--danger": color === "danger",
    "gv-btn--primary": color === "primary",
    "gv-btn--secondary": color === "secondary",
    "gv-btn--primary-dark": color === "primary-dark",
    "gv-btn--text": variant === "text",
    "gv-btn--outlined": variant === "outlined",
    "gv-btn--contained": variant === "contained",
    "gv-btn--no-padding": noPadding
  });
  return (
    <button
      data-test-id={testId}
      id={id}
      disabled={disabled}
      className={classname}
      onClick={onClick}
      title={title}
      type={type}
      name={name}
    >
      {children}
    </button>
  );
};

GVButton.defaultProps = {
  variant: "contained",
  color: "primary",
  type: "button"
};

export default GVButton;
