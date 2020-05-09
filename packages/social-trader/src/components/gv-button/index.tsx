import classNames from "classnames";
import React from "react";

import styles from "./style.module.scss";

export enum GV_BTN_SIZE {
  SMALL = "SMALL",
  LARGE = "LARGE",
  BIG = "BIG",
  MIDDLE = "MIDDLE"
}

export interface GVButtonProps {
  isSuccessful?: boolean;
  isPending?: boolean;
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
  name?: string;
  noPadding?: boolean;
}

const GVButton: React.FC<GVButtonProps> = ({
  isSuccessful,
  isPending,
  testId,
  bold,
  wide,
  size = GV_BTN_SIZE.MIDDLE,
  id,
  className,
  title,
  variant = "contained",
  color = "primary",
  type = "button",
  disabled,
  onClick,
  children,
  name,
  noPadding
}) => {
  const classname = classNames(styles["gv-btn"], className, {
    [styles["gv-btn--successful"]]: isSuccessful,
    [styles["gv-btn--pending"]]: isPending,
    [styles["gv-btn--bold"]]: bold,
    [styles["gv-btn--wide"]]: wide,
    [styles["gv-btn--large"]]: size === GV_BTN_SIZE.LARGE,
    [styles["gv-btn--big"]]: size === GV_BTN_SIZE.BIG,
    [styles["gv-btn--small"]]: size === GV_BTN_SIZE.SMALL,
    [styles["gv-btn--danger"]]: color === "danger",
    [styles["gv-btn--primary"]]: color === "primary",
    [styles["gv-btn--secondary"]]: color === "secondary",
    [styles["gv-btn--primary-dark"]]: color === "primary-dark",
    [styles["gv-btn--text"]]: variant === "text",
    [styles["gv-btn--outlined"]]: variant === "outlined",
    [styles["gv-btn--contained"]]: variant === "contained",
    [styles["gv-btn--no-padding"]]: noPadding
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
      <span
        className={classNames(styles["gv-btn__label"], {
          [styles["gv-btn__label--success"]]: isSuccessful
        })}
      >
        {children}
      </span>
      <span
        className={classNames(styles["gv-btn__success-symbol"], {
          [styles["gv-btn__success-symbol--success"]]: isSuccessful
        })}
      >
        ✔
      </span>
    </button>
  );
};

export default GVButton;
