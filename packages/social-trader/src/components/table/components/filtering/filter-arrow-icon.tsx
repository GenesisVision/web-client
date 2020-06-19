import classNames from "classnames";
import * as React from "react";

import styles from "./filter.module.scss";

const _FilterArrowIcon: React.FC<{ isOpen?: boolean }> = ({ isOpen }) => (
  <svg
    className={classNames(styles["filter__arrow"], {
      [styles["filter__arrow__is-open"]]: isOpen
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
