import Tooltip from "components/tooltip/tooltip";
import { TooltipContent } from "components/tooltip/tooltip-content";
import React from "react";
import styled from "styled-components";
import { $mainColor } from "utils/style/colors";

// it is duplicate of Hint in notify-button component
const Hint = styled.div`
  margin-left: 5px;
  border: 1px solid ${$mainColor};
  border-radius: 100%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 15px;
  height: 15px;
  font-size: 8px;
  color: ${$mainColor};
  cursor: help;
`;

export const LiquidationPriceInfoBadge = () => (
  <Tooltip
    render={() => (
      <TooltipContent>
        The price is the bankruptcy price at which margin loss reaches zero. The
        liquidation order will be replaced with the bankruptcy price.
      </TooltipContent>
    )}
  >
    <Hint>?</Hint>
  </Tooltip>
);
