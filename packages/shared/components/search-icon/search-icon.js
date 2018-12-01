import "./search-icon.scss";

import classnames from "classnames";
import React from "react";

const SearchIcon = ({ primary }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      className={classnames("search-icon", { "search-icon--primary": primary })}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.46154 13.9231C11.0301 13.9231 13.9231 11.0301 13.9231 7.46154C13.9231 3.89293 11.0301 1 7.46154 1C3.89293 1 1 3.89293 1 7.46154C1 11.0301 3.89293 13.9231 7.46154 13.9231Z"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M11.8314 11.8311L16.4004 16.4001"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SearchIcon;
