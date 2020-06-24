import classNames from "classnames";
import * as React from "react";

import styles from "./details.block.module.scss";

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
    className={classNames(styles["details-block"], className, {
      [styles["details-block--landscape-tablet"]]: landscapeTablet,
      [styles["details-block--tablet"]]: tablet,
      [styles["details-block--landscape-phone"]]:
        landscapePhone && !landscapeTablet && !tablet,
      [styles["details-block--row"]]: row,
      [styles["details-block--horizontal-paddings"]]: !!horizontalPaddings,
      [styles["details-block--table"]]: !!table,
      [styles["details-block--wide"]]: !!wide,
      [styles["details-block--solid"]]: type === DETAILS_BLOCK_TYPE.SOLID,
      [styles["details-block--bordered"]]: type === DETAILS_BLOCK_TYPE.BORDERED,
      [styles["details-block--transparent"]]:
        type === DETAILS_BLOCK_TYPE.TRANSPARENT
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
