import React from "react";
import { Sizeable } from "utils/types";

export interface IButtonProps
  extends Sizeable,
    React.HTMLAttributes<HTMLButtonElement> {
  isSuccessful?: boolean;
  isPending?: boolean;
  testId?: string;
  bold?: boolean;
  wide?: boolean;
  id?: string;
  title?: string;
  variant?: "text" | "outlined" | "contained";
  color?: "primary" | "secondary" | "primary-dark" | "danger";
  type?: "button" | "submit";
  className?: string;
  disabled?: boolean;
  successSymbol?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  name?: string;
  noPadding?: boolean;
}

export interface ILabelProps {
  isSuccessful?: boolean;
}

export interface ISuccessMarkProps {
  isSuccessful?: boolean;
}
