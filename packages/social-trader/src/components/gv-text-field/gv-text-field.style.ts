import { IPropsGvInput } from "components/gv-input/gv-input.styles";
import React, { ReactNode } from "react";
import { NumberFormatValues } from "react-number-format";
import { css } from "styled-components";
import {
  $panelBackgroundColor,
  $textDarkColor,
  $textLightColor
} from "utils/style/colors";
import { $fontSizeCommon, $fontSizeH4 } from "utils/style/sizes";
import { Sizeable } from "utils/types";

export interface GVTextFieldProps extends IPropsGvInput, Sizeable {
  align?: "left" | "center" | "right";
  maxLength?: number;
  fixedVertical?: boolean;
  children?: ReactNode;
  name: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  InputComponent?: React.ComponentType<any> | string;
  onBlur?: (e: any) => void;
  onChange?: (e: React.ChangeEvent<any>) => void;
  onValueChange?: (e: NumberFormatValues) => void;
  form?: any;
  autoFocus?: boolean;
}

export const gvTextFieldStyle = css`
  order: 1;
  color: ${$textLightColor};
  font-family: Montserrat, sans-serif;
  font-weight: normal;
  letter-spacing: 0.2px;
  border: 0;
  margin: 0;
  display: block;
  min-width: 0;
  flex-grow: 1;
  box-sizing: content-box;
  background: none;
  -webkit-tap-highlight-color: transparent;
  text-align: ${({ align }: GVTextFieldProps) => align};
  font-size: ${({ size = "middle" }: GVTextFieldProps) => {
    switch (size) {
      case "middle":
        return `${$fontSizeH4}px`;
      case "small":
        return `${$fontSizeCommon}px`;
    }
  }};
  line-height: ${({ size = "middle" }: GVTextFieldProps) => {
    switch (size) {
      case "middle":
        return 1.38;
      case "small":
        return 1;
    }
  }};
  padding: ${({ size = "middle" }: GVTextFieldProps) => {
    switch (size) {
      case "middle":
        return "6px 0 7px";
      case "small":
        return "3px 0";
    }
  }};
  &:focus {
    outline: none;
  }
  &:disabled {
    color: ${$textDarkColor};
  }
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus {
    -webkit-text-fill-color: ${$textLightColor};
    -webkit-box-shadow: 0 0 0 30px ${$panelBackgroundColor} inset;
    caret-color: ${$textLightColor};
  }
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
