import { RowItem } from "components/row-item/row-item";
import styled from "styled-components";
import { $mainColor, $textColor, $textDarkColor } from "utils/style/colors";
import { fontSize, height } from "utils/style/mixins";
import {
  $fontSizeH4,
  $fontSizeSmall,
  $fontSizeXsmall
} from "utils/style/sizes";
import { SizesType } from "utils/types";

export const SelectValue = styled.button<{
  disabled?: boolean;
  bottomLine?: boolean;
  size?: SizesType;
}>`
  width: 100%;
  justify-content: space-between;
  padding: 0;
  letter-spacing: 0.4px;
  font-weight: 400;
  border: none;
  outline: none;
  background: transparent;
  box-shadow: none;
  color: ${({ disabled }) => (disabled ? $textDarkColor : $mainColor)};
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  ${({ bottomLine }) =>
    bottomLine && `border-bottom: 1px dotted ${$textColor};`};
  ${({ size = "middle" }) => {
    switch (size) {
      case "small":
        return fontSize($fontSizeXsmall);
      case "middle":
        return fontSize($fontSizeSmall);
    }
  }};
`;

export const SelectText = styled.span<{ size?: SizesType }>`
  display: inline-flex;
  align-items: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  ${({ size = "middle" }) => {
    switch (size) {
      case "small":
        return fontSize($fontSizeSmall);
      case "middle":
        return fontSize($fontSizeH4);
    }
  }};
`;

export const SelectIcon = styled(RowItem)`
  display: inline-flex;
  margin-left: auto;
`;

export const SelectContainer = styled.div<{ fixedWidth?: boolean }>`
  display: flex;
  ${height(22)};
  ${({ fixedWidth }) => fixedWidth && `min-width: 150px;`};
`;
