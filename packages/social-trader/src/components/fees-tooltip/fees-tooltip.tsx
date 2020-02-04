import "./fees-tooltip.scss";

import { HORIZONTAL_POPOVER_POS } from "components/popover/popover";
import { PopoverContent } from "components/popover/popover-content";
import Tooltip from "components/tooltip/tooltip";
import * as React from "react";
import { compose } from "redux";

const _FeesTooltip: React.FC<Props> = ({ children, header, footer }) => (
  <Tooltip
    horizontal={HORIZONTAL_POPOVER_POS.RIGHT}
    className="fees-tooltip"
    render={() => (
      <PopoverContent type={"list"} className="fees-tooltip-container">
        <div className="fees-tooltip-container__header">{header}</div>
        {footer && (
          <div className="fees-tooltip-container__footer">{footer}</div>
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
