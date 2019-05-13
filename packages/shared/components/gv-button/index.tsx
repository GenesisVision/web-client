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
  onClick?: () => void;
  children: string | JSX.Element;
}

const GVButton: React.SFC<GVButtonProps> = ({
  id,
  className,
  title,
  variant,
  color,
  type,
  disabled,
  onClick,
  children
}) => {
  const classname = classnames("gv-btn", className, {
    "gv-btn--primary": color === "primary",
    "gv-btn--secondary": color === "secondary",
    "gv-btn--text": variant === "text",
    "gv-btn--outlined": variant === "outlined",
    "gv-btn--contained": variant === "contained"
  });
  return (
    <button
      id={id}
      disabled={disabled}
      className={classname}
      onClick={onClick}
      title={title}
      type={type}
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
