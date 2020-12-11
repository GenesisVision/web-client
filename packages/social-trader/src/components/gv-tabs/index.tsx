import { Row } from "components/row/row";
import React from "react";
import styled from "styled-components";

import { GVTabProps } from "./gv-tab";

export interface GVTabsProps {
  value: string;
  onChange?: (e: React.SyntheticEvent<EventTarget>, value: string) => void;
  children: Array<React.ReactElement<GVTabProps>>;
}

const Tabs = styled(Row)`
  width: 100%;
  box-sizing: border-box;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
`;

const GVTabs: React.FC<GVTabsProps> = ({ value, onChange, children }) => {
  const tabs = children.map(child => {
    const childValue = child.props.value;
    const selected = childValue === value;
    return React.cloneElement(child, {
      key: childValue,
      selected,
      onChange
    });
  });
  return <Tabs>{tabs}</Tabs>;
};

export default GVTabs;
