import "./selected-mark.scss";

import classNames from "classnames";
import React from "react";

const _SelectedMark: React.FC<Props> = ({ selected, className }) => {
  return (
    <div
      className={classNames("selected-mark", className, {
        "selected-mark--selected": selected
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
