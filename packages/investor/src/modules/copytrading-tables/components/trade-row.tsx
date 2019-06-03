import { OrderSignalModel } from "gv-api-web";
import TradeSubRow from "modules/copytrading-tables/components/trade-sub-row";
import moment from "moment";
import * as React from "react";
import { useState } from "react";
import NumberFormat from "react-number-format";
import GVProgramAvatar from "shared/components/gv-program-avatar";
import BaseProfitability from "shared/components/profitability/base-profitability";
import Profitability from "shared/components/profitability/profitability";
import { PROFITABILITY_PREFIX } from "shared/components/profitability/profitability.helper";
import ProgramAvatar from "shared/components/program-avatar/program-avatar";
import TableCell from "shared/components/table/components/table-cell";
import TableRow from "shared/components/table/components/table-row";
import { formatValue } from "shared/utils/formatter";

const DECIMAL_SCALE = 8;

const TradeRow: React.FC<{ trade: OrderSignalModel }> = ({ trade }) => {
  const [state, setState] = useState<boolean>(false);
  const program = trade.providers[0].program;
  return (
    <>
      <TableRow
        className="details-trades__row"
        onClick={
          trade.providers.length > 1 ? () => setState(!state) : undefined
        }
      >
        <TableCell className="details-trades__cell program-details-trades__cell--direction">
          <GVProgramAvatar
            url={program.logo}
            level={program.level}
            color={program.color}
          />
          {` ${program.title}`}
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
        <TableCell className="details-trades__cell program-details-trades__cell--price">
          <NumberFormat
            value={formatValue(trade.priceCurrent, DECIMAL_SCALE)}
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
            />
          </Profitability>
        </TableCell>
        <TableCell className="details-trades__cell program-details-trades__cell--profit">
          <button>x</button>
        </TableCell>
      </TableRow>
      {state
        ? trade.providers.map(provider => <TradeSubRow provider={provider} />)
        : null}
    </>
  );
};

export default React.memo(TradeRow);
