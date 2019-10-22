import {
  OrderProgramData,
  OrderSignalModel,
  OrderSignalProgramInfo
} from "gv-api-web";
import { TRADES_HISTORY_PROVIDERS_COLUMNS } from "modules/copytrading-tables/components/copytrading-tables.constants";
import * as React from "react";
import { useState } from "react";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";
import AssetAvatar from "shared/components/avatar/asset-avatar/asset-avatar";
import Count from "shared/components/avatar/count/count";
import GVButton from "shared/components/gv-button";
import BaseProfitability from "shared/components/profitability/base-profitability";
import Profitability from "shared/components/profitability/profitability";
import { PROFITABILITY_PREFIX } from "shared/components/profitability/profitability.helper";
import TableCell from "shared/components/table/components/table-cell";
import TableRow from "shared/components/table/components/table-row";
import { DEFAULT_DECIMAL_SCALE } from "shared/constants/constants";
import { composeProgramDetailsUrl } from "shared/utils/compose-url";
import { formatDate } from "shared/utils/dates";
import { formatValue } from "shared/utils/formatter";

import ProvidersPopup from "./providers-popup/providers-popup";
import TradeHistorySubRow from "./trade-history-sub-row";
import TradesHistoryFeesTooltip from "./trades-history-fees-tooltip";

const _TradesHistoryRow: React.FC<Props> = ({ trade, title }) => {
  const [anchor, toggleSubrows] = useState<EventTarget | undefined>(undefined);
  const program =
    trade.providers.length > 0
      ? trade.providers[0].program
      : ({} as OrderProgramData);
  const otherPrograms = trade.providers;
  const hasOtherPrograms = otherPrograms.length > 1;
  return (
    <>
      <TableRow stripy>
        <TableCell className="details-trades__cell program-details-trades__cell--entry traders-avatar">
          {trade.providers.length > 0 ? (
            <div className="dashboard-programs__cell--avatar-title">
              <Link
                to={{
                  pathname: composeProgramDetailsUrl(program.url),
                  state: `/ ${title}`
                }}
              >
                <AssetAvatar
                  url={program.logo}
                  alt={program.title}
                  color={program.color}
                  level={program.level}
                  levelProgress={program.levelProgress}
                />
              </Link>
              <Link
                to={{
                  pathname: composeProgramDetailsUrl(program.url),
                  state: `/ ${title}`
                }}
              >
                <GVButton variant={"text"} color={"secondary"}>
                  {program.title}
                </GVButton>
              </Link>
              {hasOtherPrograms && (
                <Count
                  count={otherPrograms.length - 1}
                  onClick={event => {
                    toggleSubrows(event.currentTarget);
                  }}
                />
              )}
            </div>
          ) : null}
        </TableCell>
        <TableCell className="details-trades__cell program-details-trades__cell--ticket">
          {formatDate(trade.date)}
        </TableCell>
        <TableCell className="details-trades__cell program-details-trades__cell--direction">
          <BaseProfitability
            isPositive={trade.direction === "Buy"}
            isNegative={trade.direction === "Sell"}
          >
            {`${trade.direction}`}
          </BaseProfitability>
          {` / ${trade.entry}`}
        </TableCell>
        <TableCell className="details-trades__cell program-details-trades__cell--symbol">
          {trade.symbol}
        </TableCell>
        <TableCell className="details-trades__cell program-details-trades__cell--volume">
          <NumberFormat
            value={formatValue(trade.volume, DEFAULT_DECIMAL_SCALE / 2)}
            displayType="text"
            thousandSeparator=" "
          />
        </TableCell>
        <TableCell className="details-trades__cell program-details-trades__cell--price">
          <NumberFormat
            value={formatValue(trade.price, DEFAULT_DECIMAL_SCALE)}
            displayType="text"
            thousandSeparator=" "
          />
        </TableCell>
        <TableCell className="details-trades__cell program-details-trades__cell--profit">
          <Profitability
            value={formatValue(trade.profit, DEFAULT_DECIMAL_SCALE)}
            prefix={PROFITABILITY_PREFIX.SIGN}
          >
            <NumberFormat
              value={formatValue(trade.profit, DEFAULT_DECIMAL_SCALE)}
              thousandSeparator=" "
              allowNegative={false}
              displayType="text"
              suffix={trade.profit !== 0 ? ` ${trade.currency}` : ""}
            />
          </Profitability>
        </TableCell>
        <TableCell className="details-trades__cell program-details-trades__cell--date">
          <TradesHistoryFeesTooltip trade={trade}>
            <span>
              {formatValue(trade.totalCommission, DEFAULT_DECIMAL_SCALE)}
            </span>
          </TradesHistoryFeesTooltip>
        </TableCell>
      </TableRow>
      <ProvidersPopup
        columns={TRADES_HISTORY_PROVIDERS_COLUMNS}
        anchor={anchor}
        onClose={() => toggleSubrows(undefined)}
        otherPrograms={otherPrograms}
        renderRow={(provider: OrderSignalProgramInfo) => (
          <TradeHistorySubRow
            title={title}
            key={trade.id}
            provider={provider}
            symbol={trade.symbol}
          />
        )}
      />
    </>
  );
};

const TradesHistoryRow = React.memo(_TradesHistoryRow);
export default TradesHistoryRow;

interface Props {
  trade: OrderSignalModel;
  title: string;
}
