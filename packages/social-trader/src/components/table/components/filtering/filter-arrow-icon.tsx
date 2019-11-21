import classNames from "classnames";
import * as React from "react";

const _FilterArrowIcon: React.FC<{ isOpen?: boolean }> = ({ isOpen }) => (
  <svg
    className={classNames("filter__arrow", {
      "filter__arrow__is-open": isOpen
    })}
    width="6"
    height="4"
    viewBox="0 0 6 4"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 1L3 3L5 1"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const FilterArrowIcon = React.memo(_FilterArrowIcon);

export default FilterArrowIcon;
