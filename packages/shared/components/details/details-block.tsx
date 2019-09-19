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
    className={classNames("details__block", className, {
      "details__block--horizontal-paddings": !!horizontalPaddings,
      "details__block--table": !!table,
      "details__block--wide": !!wide,
      "details__block--solid": type === DETAILS_BLOCK_TYPE.SOLID,
      "details__block--bordered": type === DETAILS_BLOCK_TYPE.BORDERED,
      "details__block--transparent": type === DETAILS_BLOCK_TYPE.TRANSPARENT
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
