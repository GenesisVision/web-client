import {
  IButtonProps,
  ILabelProps,
  ISuccessMarkProps
} from "components/button/button.types";
import {
  $negativeColor,
  $positiveColor,
  $primaryColor,
  $secondaryColor,
  $textAccentColor,
  $textColor
} from "components/gv-styles/gv-colors/gv-colors";
import {
  $btnHeight,
  $btnHeightSmall,
  $btnHeightXsmall,
  $btnWidthSmall,
  $fontSizeCommon,
  $fontSizeParagraph,
  $fontSizeXxsmall,
  $paddingSmall,
  $paddingXxsmall
} from "components/gv-styles/gv-sizes";
import { css } from "styled-components";

export const LabelAdditionalStyles = css`
  opacity: ${({ isSuccessful }: ILabelProps) => (isSuccessful ? 0 : 1)};
`;

export const SuccessMarkStyles = {
  position: "absolute"
};

export const SuccessMarkAdditionalStyles = css`
  opacity: ${({ isSuccessful }: ISuccessMarkProps) => (isSuccessful ? 1 : 0)};
`;

export const ButtonStyles = {
  "box-sizing": "border-box",
  position: "relative",
  display: "flex",
  "align-items": "center",
  "justify-content": "center",
  "white-space": "nowrap",
  border: "0",
  outline: "none",
  "background-color": "transparent",
  "letter-spacing": { value: 0.3, unit: "px" },
  "text-decoration": "none",
  "border-radius": { value: 2, unit: "em" },
  "border-width": { value: 0.1, unit: "em" },
  "border-style": "solid"
};

export const ButtonAdditionalStyles = css`
  opacity: ${({ disabled, isSuccessful }: IButtonProps) =>
    !disabled || isSuccessful ? 1 : 0.5};
  cursor: ${({ disabled }: IButtonProps) => (disabled ? "default" : "pointer")};
  color: ${({ variant, color }: IButtonProps) =>
    variant === "contained" && color === "primary-dark"
      ? $primaryColor
      : $textAccentColor};
  background-color: ${({ variant, color, isSuccessful }: IButtonProps) => {
    if (isSuccessful) return $positiveColor;
    switch (variant) {
      case "contained":
        switch (color) {
          case "danger":
            return $negativeColor;
          case "primary":
            return $primaryColor;
          case "primary-dark":
            return `rgba(${$primaryColor}, 0.2)`;
          case "secondary":
            return $secondaryColor;
        }
        break;
      case "outlined":
        return "transparent";
    }
  }};
  border-color: ${({ variant, color }: IButtonProps) => {
    switch (variant) {
      case "contained":
        switch (color) {
          case "danger":
            return $negativeColor;
          case "primary":
            return $primaryColor;
          case "primary-dark":
            return $primaryColor;
          case "secondary":
            return $textColor;
        }
        break;
      case "outlined":
        switch (color) {
          case "danger":
            return $negativeColor;
          case "primary":
            return $primaryColor;
          case "primary-dark":
            return $primaryColor;
          case "secondary":
            return $secondaryColor;
        }
    }
  }};
  padding: ${({ noPadding, size }: IButtonProps) => {
    if (noPadding) return 0;
    switch (size) {
      case "xlarge":
        return `${$paddingXxsmall}px ${$paddingSmall}px`;
      case "large":
        return "10px 32px";
      case "xsmall":
        return `0 ${$paddingXxsmall}`;
    }
  }};
  font-weight: ${({ bold, size }: IButtonProps) => {
    if (bold) return 600;
    switch (size) {
      case "xlarge":
      case "large":
        return 600;
      default:
        return 400;
    }
  }};
  height: ${({ size }: IButtonProps) => {
    switch (size) {
      case "xlarge":
        return $btnHeight;
      case "large":
        return "50px";
      case "small":
        return $btnHeightSmall;
      case "xsmall":
        return $btnHeightXsmall;
    }
  }};
  width: ${({ wide, size }: IButtonProps) => {
    if (wide) return "100%";
    switch (size) {
      case "small":
        return $btnWidthSmall;
      case "xsmall":
        return "auto";
    }
  }};
  font-size: ${({ size }: IButtonProps) => {
    switch (size) {
      case "xlarge":
        return $fontSizeParagraph;
      case "large":
        return $fontSizeCommon;
      case "middle":
        return $fontSizeCommon;
      case "small":
        return $fontSizeCommon;
      case "xsmall":
        return $fontSizeXxsmall;
    }
  }};
`;
