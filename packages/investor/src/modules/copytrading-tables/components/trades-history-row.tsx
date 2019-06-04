import { line } from "d3-shape";
import { OrderSignalModel, OrderSignalProgramInfo } from "gv-api-web";
import moment from "moment";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";
import AssetAvatar from "shared/components/avatar/asset-avatar/asset-avatar";
import BaseProfitability from "shared/components/profitability/base-profitability";
import Profitability from "shared/components/profitability/profitability";
import { PROFITABILITY_PREFIX } from "shared/components/profitability/profitability.helper";
import { GVScroll } from "shared/components/scroll/gvscroll";
import TableCell from "shared/components/table/components/table-cell";
import TableRow from "shared/components/table/components/table-row";
import Tooltip from "shared/components/tooltip/tooltip";
import { formatValue } from "shared/utils/formatter";

const DECIMAL_SCALE = 8;

const getCommission = (trade: OrderSignalModel) => {
  let commission = trade.tradingFee ? trade.tradingFee.amount : 0;
  trade.providers.forEach(provider => {
    provider.fees.forEach(fee => {
      commission += fee.amount;
    });
  });
  return commission;
};

const _ProviderFees: React.FC<ProviderFeesProps> = ({
  provider,
  isOnlyOne,
  t
}) => {
  const { program, fees } = provider;
  return (
    <div className="provider-fees">
      {!isOnlyOne ? (
        <div className="provider-fees__avatar">
          <AssetAvatar
            url={program.logo}
            alt={program.title}
            color={program.color}
          />
          {program.title}
        </div>
      ) : null}
      {fees.map(fee => {
        return (
          <div key={fee.type} className="provider-fees__item">
            {t(`investor.copytrading-tables.fees.${fee.type}`, fee)}
          </div>
        );
      })}
    </div>
  );
};

const ProviderFees = translate()(_ProviderFees);

type ProviderFeesProps = InjectedTranslateProps & {
  provider: OrderSignalProgramInfo;
  isOnlyOne: boolean;
};

const _FeesPopover: React.FC<FeesPopoverProps> = ({ trade, t }) => {
  const commission = getCommission(trade);
  const providers = trade.providers.filter(
    provider => provider.fees.length > 0
  );
  if (commission === 0) return <div>{commission}</div>;
  const isOnlyOne = providers.length === 1;
  return (
    <Tooltip
      render={() => (
        <GVScroll autoHeight autoHeightMax="260px">
          <div className="fees-popover">
            {trade.tradingFee
              ? t(`investor.copytrading-tables.fees.trading`, trade.tradingFee)
              : null}
            {providers.map(provider => (
              <ProviderFees
                isOnlyOne={isOnlyOne}
                key={provider.programId}
                provider={provider}
              />
            ))}
          </div>
        </GVScroll>
      )}
    >
      <div>{commission}</div>
    </Tooltip>
  );
};

const FeesPopover = translate()(_FeesPopover);

type FeesPopoverProps = InjectedTranslateProps & {
  trade: OrderSignalModel;
};

const _TradesHistoryRow: React.FC<{ trade: OrderSignalModel }> = ({
  trade
}) => {
  return (
    <TableRow className="details-trades__row">
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
          />
        </Profitability>
      </TableCell>
      <TableCell className="details-trades__cell program-details-trades__cell--date">
        <FeesPopover trade={trade} />
      </TableCell>
      <TableCell className="details-trades__cell program-details-trades__cell--ticket">
        {moment(trade.date).format()}
      </TableCell>
      <TableCell className="details-trades__cell program-details-trades__cell--entry">
        {trade.providers.map(provider => provider.program.title).join(", ")}
      </TableCell>
    </TableRow>
  );
};

const TradesHistoryRow = React.memo(_TradesHistoryRow);
export default TradesHistoryRow;
