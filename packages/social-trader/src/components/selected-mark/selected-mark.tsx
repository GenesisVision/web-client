import clsx from "clsx";
import React from "react";

import styles from "./selected-mark.module.scss";

const _SelectedMark: React.FC<Props> = ({ selected, className }) => {
  return (
    <div
      className={clsx(styles["selected-mark"], className, {
        [styles["selected-mark--selected"]]: selected
      })}
    >
      &#10004;
    </div>
  );
};

interface Props {
  selected: boolean;
  className?: string;
}

const SelectedMark = React.memo(_SelectedMark);
export default SelectedMark;
