import "./pager.scss";

import classNames from "classnames";
import * as React from "react";

export const _PagerButton: React.FC<Props> = ({
  page,
  label,
  current,
  clickHandle
}) => (
  <div
    className={classNames("pager__button", {
      "pager__button--current": page === current
    })}
    onClick={clickHandle(page)}
  >
    {label || page}
  </div>
);
export const PagerButton = React.memo(_PagerButton);
export default PagerButton;

interface Props {
  current: number;
  page: number;
  label?: string;
  key?: string | number;
  clickHandle(page: number): () => void;
}
