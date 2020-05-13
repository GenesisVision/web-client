import classNames from "classnames";
import React from "react";

import styles from "./selected-mark.module.scss";

const _SelectedMark: React.FC<Props> = ({ selected, className }) => {
  return (
    <div
      className={classNames(styles["selected-mark"], className, {
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
