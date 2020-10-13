import * as React from "react";
import styled from "styled-components";
import { $mainColor, $panelBackgroundColor } from "utils/style/colors";
import {
  adaptiveBorderRadius,
  fontSize,
  height,
  horizontalPaddings,
  lineHeight
} from "utils/style/mixins";
import {
  $fontSizeH3,
  $fontSizeXsmall,
  $paddingXxsmall,
  $paddingXxxsmall
} from "utils/style/sizes";
import { OptionalClickable } from "utils/types";

const Container = styled.div`
  ${fontSize($fontSizeXsmall)};
  ${adaptiveBorderRadius(19.5)};
  ${height(18)};
  ${lineHeight(18)};
  ${horizontalPaddings($paddingXxsmall)};
  cursor: pointer;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  text-transform: uppercase;
  line-height: 16px;
  white-space: nowrap;
  transition-property: border-color;
  border: 1px solid #6e757b;
  background-color: transparent;
  color: ${$mainColor};

  &:hover,
  &:active {
    border-color: ${$mainColor};
    background-color: ${$mainColor};
    &,
    & span {
      color: ${$panelBackgroundColor};
    }
  }
`;

const Plus = styled.span`
  ${fontSize($fontSizeH3)};
  font-weight: 400;
  padding-right: ${$paddingXxxsmall}px;
`;

const _TileFilterButton: React.FC<ITagFilterButton> = ({ title, onClick }) => {
  return (
    <Container onClick={onClick}>
      <Plus>+</Plus>
      {title}
    </Container>
  );
};

const TileFilterButton = React.memo(_TileFilterButton);
export default TileFilterButton;

export interface ITagFilterButton extends OptionalClickable {
  title: string | React.ComponentType<any> | JSX.Element;
  isActive?: boolean;
}
