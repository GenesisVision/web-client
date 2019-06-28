import { OrderSignalModel, OrderSignalProgramInfo } from "gv-api-web";
import { DECIMAL_SCALE } from "modules/copytrading-tables/components/copytrading-tables.constants";
import TradeSubRow from "modules/copytrading-tables/components/trade-sub-row";
import {
  CloseCopytradingTrade,
  closeCopytradingTrade
} from "modules/copytrading-tables/services/copytrading-tables.service";
import moment from "moment";
import * as React from "react";
import { useState } from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { compose } from "redux";
import AssetAvatar from "shared/components/avatar/asset-avatar/asset-avatar";
import Chip from "shared/components/chip/chip";
import ConfirmPopup from "shared/components/confirm-popup/confirm-popup";
import GVButton from "shared/components/gv-button";
import BaseProfitability from "shared/components/profitability/base-profitability";
import Profitability from "shared/components/profitability/profitability";
import { PROFITABILITY_PREFIX } from "shared/components/profitability/profitability.helper";
import TableCell from "shared/components/table/components/table-cell";
import TableRow from "shared/components/table/components/table-row";
import { UpdateRowFuncType } from "shared/components/table/components/table.types";
import { composeProgramDetailsUrl } from "shared/utils/compose-url";
import { formatValue } from "shared/utils/formatter";

const _TradeRow: React.FC<Props> = ({
  trade,
  closeCopytradingTrade,
  t,
  title,
  update
}) => {
  const [isOpenSubrows, toggleSubrows] = useState<boolean>(false);
  const [isOpenPopup, togglePopup] = useState<boolean>(false);
  const program = trade.providers[0].program;
  const otherPrograms = trade.providers;
  const hasOtherPrograms = trade.providers.length > 1;
  return (
    <>
      <TableRow
        className="details-trades__row"
        onClick={
          hasOtherPrograms ? () => toggleSubrows(!isOpenSubrows) : undefined
        }
      >
        <TableCell className="details-trades__cell program-details-trades__cell--direction">
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
            {hasOtherPrograms ? <Chip>+{otherPrograms.length}</Chip> : null}
          </div>
        </TableCell>
        <TableCell className="details-trades__cell program-details-trades__cell--symbol">
          {moment(trade.date).format()}
        </TableCell>
        <TableCell className="details-trades__cell program-details-trades__cell--volume">
          {trade.symbol}
        </TableCell>
        <TableCell className="details-trades__cell program-details-trades__cell--price">
          <BaseProfitability
            isPositive={trade.direction === "Buy"}
            isNegative={trade.direction === "Sell"}
          >
            {`${trade.direction}`}
          </BaseProfitability>
        </TableCell>
        <TableCell className="details-trades__cell program-details-trades__cell--price">
          <NumberFormat
            value={formatValue(trade.volume, DECIMAL_SCALE / 2)}
            displayType="text"
            thousandSeparator=" "
          />
        </TableCell>
        <TableCell className="details-trades__cell program-details-trades__cell--profit">
          <NumberFormat
            value={formatValue(trade.price, DECIMAL_SCALE)}
            displayType="text"
            thousandSeparator=" "
          />
        </TableCell>
        <TableCell className="details-trades__cell program-details-trades__cell--profit">
          <NumberFormat
            value={formatValue(trade.priceCurrent, DECIMAL_SCALE)}
            displayType="text"
            thousandSeparator=" "
          />
        </TableCell>
        <TableCell>
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
        <TableCell>
          <GVButton variant="text" onClick={() => togglePopup(true)}>
            {t("buttons.cancel")}
          </GVButton>
          <ConfirmPopup
            header={t("investor.copytrading-tables.close-trade-confirm.header")}
            body={t("investor.copytrading-tables.close-trade-confirm.body", {
              symbol: trade.symbol,
              volume: trade.volume
            })}
            onClose={() => togglePopup(false)}
            open={isOpenPopup}
            onApply={() => {
              togglePopup(false);
              closeCopytradingTrade(trade.id, () => {
                update(undefined);
              });
            }}
            applyButtonText={t("buttons.confirm")}
            onCancel={() => togglePopup(false)}
          />
        </TableCell>
      </TableRow>
      {isOpenSubrows
        ? otherPrograms.map((provider: OrderSignalProgramInfo) => (
            <TradeSubRow
              title={title}
              key={trade.id}
              provider={provider}
              tradeId={trade.id}
              symbol={trade.symbol}
              update={update}
            />
          ))
        : null}
    </>
  );
};

const mapDispatchToProps = {
  closeCopytradingTrade
};

const TradeRow = compose<React.FC<OwnProps>>(
  translate(),
  connect(
    undefined,
    mapDispatchToProps
  ),
  React.memo
)(_TradeRow);

export default TradeRow;

interface Props extends DispatchProps, OwnProps, InjectedTranslateProps {}

interface OwnProps {
  trade: OrderSignalModel;
  title: string;
  update: UpdateRowFuncType;
}

interface DispatchProps {
  closeCopytradingTrade: CloseCopytradingTrade;
}
