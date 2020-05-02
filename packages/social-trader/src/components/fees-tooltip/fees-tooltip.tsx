import { HORIZONTAL_POPOVER_POS } from "components/popover/popover";
import { PopoverContent } from "components/popover/popover-content";
import Tooltip from "components/tooltip/tooltip";
import * as React from "react";
import { compose } from "redux";

import styles from "./fees-tooltip.module.scss";

const _FeesTooltip: React.FC<Props> = ({ children, header, footer }) => (
  <Tooltip
    horizontal={HORIZONTAL_POPOVER_POS.RIGHT}
    className={styles["fees-tooltip"]}
    render={() => (
      <PopoverContent
        type={"list"}
        className={styles["fees-tooltip-container"]}
      >
        <div className={styles["fees-tooltip-container__header"]}>{header}</div>
        {footer && (
          <div className={styles["fees-tooltip-container__footer"]}>
            {footer}
          </div>
        )}
      </PopoverContent>
    )}
  >
    <span>{children}</span>
  </Tooltip>
);

const FeesTooltip = compose<React.FC<OwnProps>>(React.memo)(_FeesTooltip);

export default FeesTooltip;

interface Props extends OwnProps {}

interface OwnProps {
  header: JSX.Element;
  footer?: JSX.Element;
}
