import "./style.scss";

import classNames from "classnames";
import { RowItem } from "components/row-item/row-item";
import React from "react";

export interface GVTabProps {
  label: React.ReactNode;
  value: string;
  count?: number;
  selected?: boolean;
  visible?: boolean;
  className?: string;
  countClassName?: string;
  onChange?: (e: React.SyntheticEvent<EventTarget>, value: string) => void;
  onClick?: (e: React.SyntheticEvent<EventTarget>) => void;
}

const GVTab: React.FC<GVTabProps> = ({
  label,
  value,
  count,
  selected,
  visible = true,
  className,
  countClassName,
  onChange,
  onClick
}) => {
  const handleChange = (e: React.SyntheticEvent<EventTarget>) => {
    if (onChange) {
      onChange(e, value);
    }
    if (onClick) {
      onClick(e);
    }
  };

  const renderCount = () => {
    if (count === undefined) return null;
    return (
      <span className={classNames(countClassName, "gv-tab__count")}>
        {count}
      </span>
    );
  };

  if (!visible) {
    return null;
  }

  return (
    <RowItem>
      <div
        className={classNames(className, "gv-tab", {
          "gv-tab--active": selected
        })}
        data-test-id={label}
        onClick={handleChange}
      >
        {label}
        {renderCount()}
      </div>
    </RowItem>
  );
};

GVTab.defaultProps = {
  visible: true
};

export default GVTab;
