import classNames from "classnames";
import { PopoverContentCardBlock } from "components/popover/popover-card.block";
import React from "react";

import styles from "./tooltip-content.module.scss";

const _TooltipContent: React.FC<Props> = ({
  small,
  children,
  fixed = true
}) => {
  return (
    <PopoverContentCardBlock size={"small"} fixed={fixed}>
      <div
        className={classNames(styles["tooltip-content"], {
          [styles["tooltip-content--small"]]: small
        })}
      >
        {children}
      </div>
    </PopoverContentCardBlock>
  );
};

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  small?: boolean;
  fixed?: boolean;
}

export const TooltipContent = React.memo(_TooltipContent);
