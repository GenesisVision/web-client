import "./style.scss";

import classnames from "classnames";
import React from "react";

interface GVButtonProps {
  id?: string;
  title?: string;
  variant?: "text" | "outlined" | "contained";
  color?: "primary" | "secondary";
  type?: "button" | "submit";
  className?: string;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children: string | JSX.Element;
  name?: string;
  noPadding?: boolean;
}

const GVButton: React.FC<GVButtonProps> = ({
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
  const classname = classnames("gv-btn", className, {
    "gv-btn--primary": color === "primary",
    "gv-btn--secondary": color === "secondary",
    "gv-btn--text": variant === "text",
    "gv-btn--outlined": variant === "outlined",
    "gv-btn--contained": variant === "contained",
    "gv-btn--no-padding": noPadding
  });
  return (
    <button
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
