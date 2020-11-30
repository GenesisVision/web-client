import React from "react";
import { css } from "styled-components";
import { $negativeColor, $positiveColor, $textColor } from "utils/style/colors";
import { $paddingSmall } from "utils/style/sizes";

export interface IPropsGvInput {
  onPaste?: VoidFunction;
  onFocus?: VoidFunction;
  showError?: boolean;
  ref?: any;
  onKeyDown?: (e: any) => any;
  bottomLine?: boolean;
  correct?: boolean;
  adornment?: React.ReactNode;
  label?: string | React.ReactNode;
  value?: string | number;
  error?: string;
  adornmentPosition?: "start" | "end";
  className?: string;
  noMargin?: boolean;
  wide?: boolean;
  focused?: boolean;
  disabled?: boolean;
  touched?: boolean;
}

export const GVInputStyles = css`
  display: inline-flex;
  position: relative;

  & input {
    width: 100%;
  }

  ${({ label }: IPropsGvInput) =>
    !!label && `margin-top: ${$paddingSmall / 2}px;`}

  &::before {
    left: 0;
    right: 0;
    bottom: 0;
    content: "";
    position: absolute;
    transition: 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    transition-property: border-bottom-color, opacity;
    opacity: 0.1;
    pointer-events: none;
    ${({ bottomLine = true }: IPropsGvInput) =>
      bottomLine && `border-bottom: 1px solid ${$textColor};`}
  }

  &::after {
    left: 0;
    right: 0;
    bottom: 0;
    content: "";
    position: absolute;
    transition: transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
    pointer-events: none;
    ${({ bottomLine = true }: IPropsGvInput) =>
      bottomLine && `border-bottom: 1px solid ${$textColor};`};
    transform: ${({ correct, touched, error, focused }: IPropsGvInput) => {
      if (correct) return "scale(1)";
      if ((touched && error) || focused) return "scaleX(1)";
      return "scaleX(0)";
    }};
    border-bottom-color: ${({ correct, touched, error }: IPropsGvInput) => {
      if (touched && error) return $negativeColor;
      if (correct) return $positiveColor;
      return $textColor;
    }};
  }

  &:hover {
    &::before {
      ${({ disabled }: IPropsGvInput) => !disabled && `opacity: 0.3;`}
    }
  }
`;
