import * as React from "react";
import styled from "styled-components";
import { pSBC } from "utils/psbc";
import {
  $backgroundChipNegative,
  $backgroundChipPositive,
  $negativeColor,
  $popoverBackground,
  $primaryColor,
  $secondaryBackgroundColor,
  $textLightColor,
  $warningBackgroundColor,
  $warningColor
} from "utils/style/colors";
import {
  adaptiveBorderRadius,
  fontSize,
  height,
  horizontalPaddings,
  transition,
  verticalPaddings,
  width
} from "utils/style/mixins";
import { $boxShadow1 } from "utils/style/shadow";
import { $fontSizeCommon, $fontSizeH3 } from "utils/style/sizes";
import { Sizeable } from "utils/types";

export enum CHIP_TYPE {
  EMPTY = "empty",
  POSITIVE = "positive",
  NEGATIVE = "negative",
  WARNING = "warning"
}

interface Props extends Sizeable {
  pointer?: boolean;
  hover?: boolean;
  stretch?: boolean;
  disabled?: boolean;
  className?: string;
  rounded?: boolean;
  type?: CHIP_TYPE;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void | undefined;
}

const SMALL_SIZE = 32;

const Container = styled.div<Props>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  font-weight: 600;
  letter-spacing: 0.4px;
  box-shadow: ${$boxShadow1};
  ${transition("background-color")}
  ${adaptiveBorderRadius(8)}
  ${verticalPaddings(7)}
  ${horizontalPaddings(13)}
  ${fontSize($fontSizeCommon)}
  
  background-color: ${({ type }: Props) => {
    switch (type) {
      case CHIP_TYPE.EMPTY:
        return $popoverBackground;
      case CHIP_TYPE.NEGATIVE:
        return $backgroundChipNegative;
      case CHIP_TYPE.POSITIVE:
        return $backgroundChipPositive;
      case CHIP_TYPE.WARNING:
        return $warningBackgroundColor;
      default:
        return $secondaryBackgroundColor;
    }
  }};
  
  color: ${({ type = CHIP_TYPE.EMPTY }: Props) => {
    switch (type) {
      case CHIP_TYPE.EMPTY:
        return $textLightColor;
      case CHIP_TYPE.NEGATIVE:
        return $negativeColor;
      case CHIP_TYPE.POSITIVE:
        return $primaryColor;
      case CHIP_TYPE.WARNING:
        return $warningColor;
    }
  }};
  
  width: ${({ stretch, size }: Props) => {
    if (stretch) return "auto !important";
    if (size === "small") return width(SMALL_SIZE);
  }};
  
 ${({ size }: Props) => {
   if (size === "small")
     return `
    ${height(SMALL_SIZE)}
    ${fontSize($fontSizeH3)}
    `;
 }}
  
 ${({ rounded }: Props) => rounded && "border-radius: 2rem;"}
 
 ${({ disabled }: Props) => disabled && "opacity: 0.5;"}
  
 ${({ pointer, hover, type, disabled, onClick }: Props) => {
   if (!disabled && (typeof onClick === "function" || pointer)) {
     const color =
       type === CHIP_TYPE.POSITIVE
         ? pSBC(0.015, $backgroundChipPositive)
         : type === CHIP_TYPE.NEGATIVE
         ? pSBC(0.015, $backgroundChipNegative)
         : pSBC(0.015, $secondaryBackgroundColor);
     return `
     cursor: pointer;
     ${hover && `background-color:${color}`}
    `;
   }
 }}
 
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
`;

const Chip: React.FC<Props> = props => {
  const { children, onClick, disabled } = props;
  return (
    <Container {...props} onClick={disabled ? () => {} : onClick}>
      <Content>{children}</Content>
    </Container>
  );
};

export default Chip;
