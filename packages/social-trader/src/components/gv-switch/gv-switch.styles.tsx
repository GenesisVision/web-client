import { Center } from "components/center/center";
import { RowItem } from "components/row-item/row-item";
import styled from "styled-components";
import {
  $primaryColor,
  $secondaryColor,
  $switchHandlerColor
} from "utils/style/colors";

export const GVSwitchTrack = styled.span<{
  checked?: boolean;
}>`
  top: 8px;
  left: 0;
  width: 32px;
  height: 11px;
  display: block;
  opacity: ${({ checked }) => (checked ? "1" : "0.18")};
  position: absolute;
  margin-top: -6px;
  transition: 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  transition-property: opacity, background-color, color;
  border-radius: 7px;
  background-color: currentColor;
`;

export const GVSwitchInput = styled.input`
  top: 0;
  left: 0;
  width: 100%;
  cursor: inherit;
  height: 100%;
  margin: 0;
  opacity: 0;
  padding: 0;
  position: absolute;
`;

export const GVSwitchInputWrapper = styled.span<{
  checked?: boolean;
}>`
  width: 15px;
  height: 15px;
  z-index: 1;
  padding: 0;
  transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  display: inline-flex;
  align-items: center;
  flex: 0 0 auto;
  overflow: visible;
  font-size: 1.5rem;
  text-align: center;
  border-radius: 50%;
  margin: 0;
  border: 0;
  outline: none;
  position: relative;
  user-select: none;
  vertical-align: middle;
  justify-content: center;
  text-decoration: none;
  background-color: transparent;
  ${({ checked }) => (checked ? "transform: translateX(17px);" : "")};
`;

export const GVSwitchSwitchWrapper = styled.span<{
  color?: string;
  disabled?: boolean;
}>`
  width: 32px;
  display: inline-flex;
  position: relative;
  flex-shrink: 0;
  vertical-align: middle;
  transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  ${({ color }) => {
    switch (color) {
      case "primary":
        return `color:${$primaryColor}`;
      case "secondary":
        return `color:${$secondaryColor}`;
    }
  }};
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  opacity: ${({ disabled }) => (disabled ? "0.5" : "1")};
`;

export const GVSwitchHandler = styled.span`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: ${$switchHandlerColor};
`;

export const GVSwitchError = styled.span`
  position: absolute;
  left: 0;
  bottom: -24px;
  font-size: 0.7em;
  color: #eb3b5a;
  white-space: nowrap;
`;

export const GVSwitchLabel = styled(RowItem)`
  cursor: pointer;
  font-weight: normal;
  line-height: 1.38;
  user-select: none;
`;

export const GVSwitchContainer = styled(Center)`
  position: relative;
`;
