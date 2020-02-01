import "./style.scss";

import classnames from "classnames";
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
    <div
      className={classnames(className, "gv-tabs", {
        "gv-tabs--title": visibleTabs === 1
      })}
    >
      {tabs}
    </div>
  );
};

export default GVTabs;
