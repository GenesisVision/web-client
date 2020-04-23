import FeeCommission from "components/fee-commission/fee-commission";
import { HORIZONTAL_POPOVER_POS } from "components/popover/popover";
import { Row } from "components/row/row";
import Tooltip from "components/tooltip/tooltip";
import { TooltipContent } from "components/tooltip/tooltip-content";
import Crashable from "decorators/crashable";
import withLoader from "decorators/with-loader";
import { FeeDetails } from "gv-api-web";
import React from "react";

const _PortfolioEventFeesTooltip: React.FC<Props> = ({ fees, children }) => {
  const notNullFees = fees.filter(({ amount }) => amount > 0);
  return notNullFees.length > 0 ? (
    <Tooltip
      horizontal={HORIZONTAL_POPOVER_POS.RIGHT}
      render={() => (
        <TooltipContent>
          {notNullFees.map((fee, idx) => (
            <Row small key={idx}>
              <FeeCommission
                title={fee.title}
                value={fee.amount}
                currency={fee.currency}
              />
            </Row>
          ))}
        </TooltipContent>
      )}
    >
      {children}
    </Tooltip>
  ) : (
    <>{children}</>
  );
};

const PortfolioEventFeesTooltip = withLoader(
  Crashable(_PortfolioEventFeesTooltip)
);
export default PortfolioEventFeesTooltip;

interface Props {
  fees: FeeDetails[];
}
