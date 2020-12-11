import { RowItem } from "components/row-item/row-item";
import React, { useCallback } from "react";
import styled from "styled-components";
import {
  $labelColor,
  $primaryColor,
  $secondaryColor,
  $textLightColor
} from "utils/style/colors";
import {
  adaptiveBorderRadius,
  adaptiveMargin,
  adaptivePadding,
  fontSize,
  horizontalPaddings,
  transition,
  verticalPaddings
} from "utils/style/mixins";
import { $fontSizeCommon, $paddingXxxsmall } from "utils/style/sizes";

export interface GVTabProps {
  label: React.ReactNode;
  value: string;
  count?: number;
  selected?: boolean;
  visible?: boolean;
  onChange?: (e: React.SyntheticEvent<EventTarget>, value: string) => void;
  onClick?: (e: React.SyntheticEvent<EventTarget>) => void;
}

const Count = styled.div<{ selected?: boolean }>`
  display: inline-block;
  text-align: center;
  min-width: 8px;
  margin-bottom: -4px;
  line-height: 1;
  ${transition("color", "background-color")};
  ${adaptiveMargin("left", $paddingXxxsmall)};
  ${horizontalPaddings(7)};
  ${verticalPaddings(4)};
  ${adaptiveBorderRadius(6)};

  background-color: ${({ selected }) => {
    if (selected) return `${$primaryColor}10`;
    return `${$secondaryColor}50`;
  }};
  color: ${({ selected }) => {
    if (selected) return $primaryColor;
    return $labelColor;
  }};
`;

const Tab = styled.div<{ selected?: boolean }>`
  font-weight: 600;
  font-style: normal;
  letter-spacing: 0.1px;
  white-space: nowrap;

  ${transition("color")};
  ${fontSize($fontSizeCommon)}
  ${adaptivePadding("bottom", $paddingXxxsmall)};

  color: ${({ selected }) => {
    if (selected) return $textLightColor;
    return $labelColor;
  }};
  cursor: ${({ selected }) => {
    if (selected) return "default";
    return "pointer";
  }};

  &::after {
    ${transition("width")};
    content: "";
    display: block;
    padding-top: 0.2em;
    width: 0;
    border-bottom: 0.15em solid ${$primaryColor};
  }
  ${({ selected }) =>
    selected &&
    `&::after {
      width: 13px;
    }`}
`;

const GVTab: React.FC<GVTabProps> = ({
  label,
  value,
  count,
  selected,
  visible = true,
  onChange,
  onClick
}) => {
  const handleChange = useCallback(
    (e: React.SyntheticEvent<EventTarget>) => {
      if (onChange) onChange(e, value);
      if (onClick) onClick(e);
    },
    [onChange, onClick]
  );

  if (!visible) return null;

  return (
    <RowItem>
      <Tab selected={selected} data-test-id={label} onClick={handleChange}>
        {label}
        {count !== undefined && <Count selected={selected}>{count}</Count>}
      </Tab>
    </RowItem>
  );
};

export default GVTab;
