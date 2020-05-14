import styles from "components/download-button/download-button.module.scss";
import React from "react";

export const ExportIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="14"
    className={styles["download-icon"]}
  >
    <g fill="none" fillRule="evenodd" stroke="#00BDAF" strokeWidth="2">
      <path d="M.5 13h11M6 10V3M2 5l4-3 4 3" />
    </g>
  </svg>
);
