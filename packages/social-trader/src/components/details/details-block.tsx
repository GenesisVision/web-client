import "./details.block.scss";

import classNames from "classnames";
import * as React from "react";

export enum DETAILS_BLOCK_TYPE {
  SOLID = "SOLID",
  BORDERED = "BORDERED",
  TRANSPARENT = "TRANSPARENT"
}

const DetailsBlock: React.FC<Props> = ({
  landscapeTablet,
  tablet,
  landscapePhone = true,
  row,
  horizontalPaddings,
  table,
  wide,
  children,
  className,
  type = DETAILS_BLOCK_TYPE.SOLID
}) => (
  <div
    className={classNames("details-block", className, {
      "details-block--landscape-tablet": landscapeTablet,
      "details-block--tablet": tablet,
      "details-block--landscape-phone":
        landscapePhone && !landscapeTablet && !tablet,
      "details-block--row": row,
      "details-block--horizontal-paddings": !!horizontalPaddings,
      "details-block--table": !!table,
      "details-block--wide": !!wide,
      "details-block--solid": type === DETAILS_BLOCK_TYPE.SOLID,
      "details-block--bordered": type === DETAILS_BLOCK_TYPE.BORDERED,
      "details-block--transparent": type === DETAILS_BLOCK_TYPE.TRANSPARENT
    })}
  >
    {children}
  </div>
);

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  landscapeTablet?: boolean;
  tablet?: boolean;
  landscapePhone?: boolean;
  row?: boolean;
  type?: DETAILS_BLOCK_TYPE;
  className?: string;
  wide?: boolean;
  table?: boolean;
  horizontalPaddings?: boolean;
}

export default DetailsBlock;
