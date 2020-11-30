import { TradesComponentsCell } from "components/details/details-description-section/details-statistic-section/details-history/trades-components";
import BaseProfitability from "components/profitability/base-profitability";
import Profitability from "components/profitability/profitability";
import { PROFITABILITY_PREFIX } from "components/profitability/profitability.helper";
import TableRow from "components/table/components/table-row";
import Tooltip from "components/tooltip/tooltip";
import { TooltipContent } from "components/tooltip/tooltip-content";
import TradesHistoryFeesTooltipWithOwner from "components/trades-history-fees-tooltip/trades-history-fees-tooltip-with-owner";
import { DEFAULT_DECIMAL_SCALE } from "constants/constants";
import { OrderSignalModel } from "gv-api-web";
import { ProvidersButton } from "pages/invest/programs/program-details/program-history-section/program-trades/providers-button";
import React from "react";
import NumberFormat from "react-number-format";
import { formatDate } from "utils/dates";
import { formatValue } from "utils/formatter";

const _ProgramTradesRow: React.FC<Props> = ({
  trade,
  showSwaps,
  showTickets
}) => {
  const volume = +formatValue(trade.volume, DEFAULT_DECIMAL_SCALE / 2);
  return (
    <TableRow stripy>
      <TradesComponentsCell>
        <BaseProfitability
          isPositive={trade.direction === "Buy"}
          isNegative={trade.direction === "Sell"}
        >
          {trade.direction}
        </BaseProfitability>
        {` / ${trade.entry}`}
      </TradesComponentsCell>
      <TradesComponentsCell>{trade.symbol}</TradesComponentsCell>
      <TradesComponentsCell>
        <Tooltip
          disable={trade.volume >= volume}
          render={() => <TooltipContent>{trade.volume}</TooltipContent>}
        >
          <span>{trade.volume < volume ? `< ${volume}` : volume}</span>
        </Tooltip>
      </TradesComponentsCell>
      <TradesComponentsCell>
        <NumberFormat
          value={formatValue(trade.price, DEFAULT_DECIMAL_SCALE)}
          displayType="text"
          thousandSeparator=" "
        />
      </TradesComponentsCell>
      <TradesComponentsCell>
        <Profitability
          value={formatValue(trade.profit, DEFAULT_DECIMAL_SCALE)}
          prefix={PROFITABILITY_PREFIX.SIGN}
        >
          <NumberFormat
            value={formatValue(trade.profit, DEFAULT_DECIMAL_SCALE)}
            thousandSeparator=" "
            allowNegative={false}
            displayType="text"
          />
        </Profitability>
      </TradesComponentsCell>
      <TradesComponentsCell>
        <TradesHistoryFeesTooltipWithOwner trade={trade} />
      </TradesComponentsCell>
      {showSwaps && <TradesComponentsCell>{trade.swap}</TradesComponentsCell>}
      <TradesComponentsCell>{formatDate(trade.date)}</TradesComponentsCell>
      {showTickets && (
        <TradesComponentsCell>{trade.ticket}</TradesComponentsCell>
      )}
      <TradesComponentsCell>
        {!!trade.providers.length && (
          <ProvidersButton providers={trade.providers} />
        )}
      </TradesComponentsCell>
    </TableRow>
  );
};

interface Props {
  trade: OrderSignalModel;
  showSwaps: boolean;
  showTickets: boolean;
}

const ProgramTradesRow = React.memo(_ProgramTradesRow);
export default ProgramTradesRow;
