import {
  IButtonProps,
  ILabelProps,
  ISuccessMarkProps
} from "components/button/button.types";
import { css, keyframes } from "styled-components";
import { pSBC } from "utils/psbc";
import {
  $negativeColor,
  $positiveColor,
  $primaryColor,
  $secondaryColor,
  $textAccentColor,
  $textColor
} from "utils/style/colors";
import { getBoxShadowValue, transition } from "utils/style/mixins";
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
} from "utils/style/sizes";

const pending = keyframes`
  0% {
    color: rgba(255, 255, 255, 8);
  }
  50% {
    color: rgba(255, 255, 255, 0.3);
  }
`;

export const LabelStyles = {
  ...transition("opacity")
};

export const LabelDynamicStyles = css`
  opacity: ${({ isSuccessful }: ILabelProps) => (isSuccessful ? 0 : 1)};
`;

export const SuccessMarkStyles = {
  position: "absolute",
  ...transition("opacity")
};

export const SuccessMarkDynamicStyles = css`
  opacity: ${({ isSuccessful }: ISuccessMarkProps) => (isSuccessful ? 1 : 0)};
`;

export const ButtonDynamicStyles = css`
  box-sizing: border-box;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  outline: none;
  text-decoration: none;
  border-radius: 2em;
  border-style: solid;
  ${transition(
    "filter",
    "background-color",
    "box-shadow",
    "color",
    "opacity",
    "padding"
  )};
  border-width: ${({ variant = "contained" }: IButtonProps) =>
    variant === "outlined" ? "0.1em" : 0};
  opacity: ${({ disabled, isSuccessful }: IButtonProps) =>
    !disabled || isSuccessful ? 1 : 0.4};
  cursor: ${({ disabled }: IButtonProps) => (disabled ? "default" : "pointer")};
  color: ${({ variant = "contained", color = "primary" }: IButtonProps) => {
    switch (variant) {
      case "contained":
        switch (color) {
          case "primary-dark":
            return $primaryColor;
        }
        break;
      case "text":
        switch (color) {
          case "primary":
            return $primaryColor;
          case "danger":
            return $negativeColor;
          case "secondary":
            return $textAccentColor;
        }
    }
    return variant === "contained" && color === "primary-dark"
      ? $primaryColor
      : $textAccentColor;
  }};
  box-shadow: ${({ variant = "contained", color }: IButtonProps) => {
    switch (variant) {
      case "contained":
        switch (color) {
          case "danger":
            return getBoxShadowValue(`${pSBC(-0.9, $negativeColor)}50`);
          case "primary":
            return getBoxShadowValue(`${pSBC(-0.9, $primaryColor)}50`);
          case "secondary":
            return getBoxShadowValue(`${pSBC(-0.9, $secondaryColor)}50`);
        }
    }
    return "none";
  }};
  background-color: ${({
    variant = "contained",
    color = "primary",
    isSuccessful
  }: IButtonProps) => {
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
      case "text":
      case "outlined":
        return "transparent";
    }
  }};
  border-color: ${({
    variant = "contained",
    color = "primary"
  }: IButtonProps) => {
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
  padding: ${({ noPadding, size = "middle" }: IButtonProps) => {
    if (noPadding) return 0;
    switch (size) {
      case "xlarge":
        return `${$paddingXxsmall}px ${$paddingSmall}px`;
      case "large":
      case "middle":
      case "small":
        return "10px 32px";
      case "xsmall":
        return `0 ${$paddingXxsmall}`;
    }
  }};
  font-weight: ${({ bold, size = "middle" }: IButtonProps) => {
    if (bold) return 600;
    switch (size) {
      case "xlarge":
      case "large":
        return 600;
      default:
        return 400;
    }
  }};
  height: ${({ noPadding, size = "middle" }: IButtonProps) => {
    if (noPadding) return "auto";
    switch (size) {
      case "xlarge":
        return `${$btnHeight}px`;
      case "large":
        return `${50}px`;
      case "small":
        return `${$btnHeightSmall}px`;
      case "xsmall":
        return `${$btnHeightXsmall}px`;
    }
  }};
  width: ${({ noPadding, wide, size = "middle" }: IButtonProps) => {
    if (noPadding) return "auto";
    if (wide) return "100%";
    switch (size) {
      case "small":
        return `${$btnWidthSmall}px`;
      case "xsmall":
        return "auto";
    }
  }};
  font-size: ${({ size = "middle" }: IButtonProps) => {
    switch (size) {
      case "xlarge":
        return `${$fontSizeParagraph}px`;
      case "large":
        return `${$fontSizeCommon}px`;
      case "middle":
        return `${$fontSizeCommon}px`;
      case "small":
        return `${$fontSizeCommon}px`;
      case "xsmall":
        return `${$fontSizeXxsmall}px`;
    }
  }};

  filter: ${({ isPending }: IButtonProps) =>
    isPending ? "grayscale(50%)" : "unset"};
  animation: ${({ isPending }: IButtonProps) =>
    isPending
      ? css`
          ${pending} 2s cubic-bezier(0.4, 0, 0.2, 1) infinite
        `
      : "unset"};

  &:hover {
    filter: ${({
      variant = "contained",
      isPending,
      disabled,
      isSuccessful
    }: IButtonProps) => {
      if (isSuccessful || disabled || isPending || variant === "outlined")
        return "none";
      return "brightness(70%)";
    }};
  }
`;
