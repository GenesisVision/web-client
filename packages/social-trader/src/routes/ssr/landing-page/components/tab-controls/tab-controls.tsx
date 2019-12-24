import "./tab-controls.scss";

import classNames from "classnames";
import React from "react";

interface Props {
  currentTabId: number;
  tabsItems: any;
  onChange: (id: number) => void;
  className?: string;
}

const _TabControls: React.FC<Props> = ({
  currentTabId,
  tabsItems,
  onChange,
  className
}) => {
  return (
    <ul className={classNames("tab-controls", className)}>
      {tabsItems.map((tab: any, index: number) => (
        <li
          key={index}
          className={classNames("tab-controls__item", {
            "tab-controls__item--active": currentTabId === tab.id
          })}
        >
          <button
            onClick={() => onChange(tab.id)}
            type="button"
            className="tab-controls__item-btn"
          >
            {tab.name}
          </button>
        </li>
      ))}
    </ul>
  );
};

const TabControls = React.memo(_TabControls);
export default TabControls;
