import Tooltip from "components/tooltip/tooltip";
import { TooltipContent } from "components/tooltip/tooltip-content";
import React from "react";

export const LiquidationPriceLessThanZeroTooltip = () => (
  <Tooltip
    render={() => (
      <TooltipContent>
        Position risk is low, and there is no liquidation price for the time
        being. Please note that increasing the position or reducing the margin
        will increase the risk.
      </TooltipContent>
    )}
  >
    <span style={{ cursor: "help" }}>--</span>
  </Tooltip>
);
