import { OrderProgramData, OrderSignalModel } from "gv-api-web";
import { DECIMAL_SCALE } from "modules/copytrading-tables/components/copytrading-tables.constants";
import moment from "moment";
import * as React from "react";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";
import AssetAvatar from "shared/components/avatar/asset-avatar/asset-avatar";
import Chip from "shared/components/chip/chip";
import GVButton from "shared/components/gv-button";
import BaseProfitability from "shared/components/profitability/base-profitability";
import Profitability from "shared/components/profitability/profitability";
import { PROFITABILITY_PREFIX } from "shared/components/profitability/profitability.helper";
import TableCell from "shared/components/table/components/table-cell";
import TableRow from "shared/components/table/components/table-row";
import { composeProgramDetailsUrl } from "shared/utils/compose-url";
import { formatValue } from "shared/utils/formatter";

import TradesHistoryFeesTooltip from "./trades-history-fees-tooltip";

const _TradesHistoryRow: React.FC<Props> = ({ trade, title }) => {
  const program =
    trade.providers.length > 0
      ? trade.providers[0].program
      : ({} as OrderProgramData);
  const otherPrograms = trade.providers;
  const hasOtherPrograms = otherPrograms.length > 1;
  return (
    <TableRow className="details-trades__row">
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
            {hasOtherPrograms ? (
              <Chip className={"traders-count"}>+{otherPrograms.length}</Chip>
            ) : null}
          </div>
        ) : null}
      </TableCell>
      <TableCell className="details-trades__cell program-details-trades__cell--ticket">
        {moment(trade.date).format()}
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
          value={formatValue(trade.volume, DECIMAL_SCALE / 2)}
          displayType="text"
          thousandSeparator=" "
        />
      </TableCell>
      <TableCell className="details-trades__cell program-details-trades__cell--price">
        <NumberFormat
          value={formatValue(trade.price, DECIMAL_SCALE)}
          displayType="text"
          thousandSeparator=" "
        />
      </TableCell>
      <TableCell className="details-trades__cell program-details-trades__cell--profit">
        <Profitability
          value={formatValue(trade.profit, DECIMAL_SCALE)}
          prefix={PROFITABILITY_PREFIX.SIGN}
        >
          <NumberFormat
            value={formatValue(trade.profit, DECIMAL_SCALE)}
            thousandSeparator=" "
            allowNegative={false}
            displayType="text"
            suffix={trade.profit !== 0 ? ` ${trade.currency}` : ""}
          />
        </Profitability>
      </TableCell>
      <TableCell className="details-trades__cell program-details-trades__cell--date">
        <TradesHistoryFeesTooltip trade={trade} />
      </TableCell>
    </TableRow>
  );
};

const TradesHistoryRow = React.memo(_TradesHistoryRow);
export default TradesHistoryRow;

interface Props {
  trade: OrderSignalModel;
  title: string;
}
