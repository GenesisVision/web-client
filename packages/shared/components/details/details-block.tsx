import "./details.scss";

import classNames from "classnames";
import * as React from "react";

const _DetailsBlock: React.FC<React.HTMLAttributes<HTMLDivElement> & Props> = ({
  horizontalPaddings,
  table,
  wide,
  children,
  className,
  type = DETAILS_BLOCK_TYPE.SOLID
}) => (
  <div
    className={classNames("details__new-block", className, {
      "details__new-block--horizontal-paddings": !!horizontalPaddings,
      "details__new-block--table": !!table,
      "details__new-block--wide": !!wide,
      "details__new-block--solid": type === DETAILS_BLOCK_TYPE.SOLID,
      "details__new-block--bordered": type === DETAILS_BLOCK_TYPE.BORDERED,
      "details__new-block--transparent": type === DETAILS_BLOCK_TYPE.TRANSPARENT
    })}
  >
    {children}
  </div>
);

export enum DETAILS_BLOCK_TYPE {
  SOLID = "SOLID",
  BORDERED = "BORDERED",
  TRANSPARENT = "TRANSPARENT"
}

interface Props {
  type?: DETAILS_BLOCK_TYPE;
  className?: string;
  wide?: boolean;
  table?: boolean;
  horizontalPaddings?: boolean;
}

const DetailsBlock = React.memo(_DetailsBlock);
export default DetailsBlock;
