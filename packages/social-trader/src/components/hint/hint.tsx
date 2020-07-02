import clsx from "clsx";
import { VERTICAL_POPOVER_POS } from "components/popover/popover";
import Tooltip from "components/tooltip/tooltip";
import { TooltipContent } from "components/tooltip/tooltip-content";
import * as React from "react";

import styles from "./hint.module.scss";

const _Hint: React.FC<Props> = ({
  content,
  tooltipContent,
  className,
  vertical
}) => {
  return (
    <div className={clsx(styles["hint"], className)}>
      <Tooltip
        vertical={vertical}
        render={() => <TooltipContent>{tooltipContent}</TooltipContent>}
      >
        <div className={styles["hint__content"]}>{content}</div>
      </Tooltip>
    </div>
  );
};

const Hint = React.memo(_Hint);
export default Hint;

interface Props {
  content: React.ReactNode;
  tooltipContent: React.ReactNode;
  className?: string;
  vertical: VERTICAL_POPOVER_POS;
}
