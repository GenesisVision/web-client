import { FeeDetails } from "gv-api-web";
import React from "react";
import FeeCommission from "shared/components/fee-commission/fee-commission";
import { HORIZONTAL_POPOVER_POS } from "shared/components/popover/popover";
import Tooltip from "shared/components/tooltip/tooltip";

const _PortfolioEventFeesTooltip: React.FC<Props> = ({ fees, children }) => (
  <Tooltip
    horizontal={HORIZONTAL_POPOVER_POS.RIGHT}
    className="portfolio-event-details__popover"
    render={() =>
      fees.map((fee, idx) => (
        <FeeCommission
          key={idx}
          title={fee.title}
          value={fee.amount}
          currency={fee.currency}
        />
      ))
    }
  >
    {children}
  </Tooltip>
);

const PortfolioEventFeesTooltip = React.memo(_PortfolioEventFeesTooltip);
export default PortfolioEventFeesTooltip;

interface Props {
  fees: FeeDetails[];
}
