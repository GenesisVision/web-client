import "./style.scss";

import classNames from "classnames";
import { Row } from "components/row/row";
import React from "react";

import { GVTabProps } from "./gv-tab";

export interface GVTabsProps {
  value: string;
  className?: string;
  onChange?: (e: React.SyntheticEvent<EventTarget>, value: string) => void;
  children: Array<React.ReactElement<GVTabProps>>;
}

const GVTabs: React.FC<GVTabsProps> = ({
  className,
  value,
  onChange,
  children
}) => {
  const tabs = children.map(child => {
    const childValue = child.props.value;
    const selected = childValue === value;
    return React.cloneElement(child, {
      key: childValue,
      selected,
      onChange
    });
  });
  const visibleTabs = children.filter(child => child.props.visible).length;
  return (
    <Row
      className={classNames(className, "gv-tabs", {
        "gv-tabs--title": visibleTabs === 1
      })}
    >
      {tabs}
    </Row>
  );
};

export default GVTabs;
