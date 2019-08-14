import { OrderSignalModel, OrderSignalProgramInfo } from "gv-api-web";
import { OPEN_TRADES_PROVIDERS_COLUMNS } from "modules/copytrading-tables/components/copytrading-tables.constants";
import TradeSubRow from "modules/copytrading-tables/components/trade-sub-row";
import {
  CloseCopytradingTrade,
  closeCopytradingTrade
} from "modules/copytrading-tables/services/copytrading-tables.service";
import moment from "moment";
import * as React from "react";
import { useState } from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { compose } from "redux";
import AssetAvatar from "shared/components/avatar/asset-avatar/asset-avatar";
import Count from "shared/components/avatar/count/count";
import ConfirmPopup from "shared/components/confirm-popup/confirm-popup";
import GVButton from "shared/components/gv-button";
import BaseProfitability from "shared/components/profitability/base-profitability";
import Profitability from "shared/components/profitability/profitability";
import { PROFITABILITY_PREFIX } from "shared/components/profitability/profitability.helper";
import TableCell from "shared/components/table/components/table-cell";
import TableRow from "shared/components/table/components/table-row";
import { UpdateRowFuncType } from "shared/components/table/components/table.types";
import { DEFAULT_DECIMAL_SCALE } from "shared/constants/constants";
import useIsOpen from "shared/hooks/is-open.hook";
import { composeProgramDetailsUrl } from "shared/utils/compose-url";
import { formatValue } from "shared/utils/formatter";

import ProvidersPopup from "./providers-popup/providers-popup";

const _TradeRow: React.FC<Props> = ({
  trade,
  closeCopytradingTrade,
  t,
  title,
  update
}) => {
  const [anchor, toggleSubrows] = useState<EventTarget | undefined>(undefined);
  const [isOpenPopup, setOpenPopup, setClosePopup] = useIsOpen();
  const program = trade.providers[0].program;
  const otherPrograms = trade.providers;
  const hasOtherPrograms = otherPrograms.length > 1;
  return (
    <>
      <TableRow stripy>
        <TableCell className="details-trades__cell traders-avatar">
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
        </TableCell>
        <TableCell className="details-trades__cell">
          {moment(trade.date).format()}
        </TableCell>
        <TableCell className="details-trades__cell">{trade.symbol}</TableCell>
        <TableCell className="details-trades__cell">
          <BaseProfitability
            isPositive={trade.direction === "Buy"}
            isNegative={trade.direction === "Sell"}
          >
            {`${trade.direction}`}
          </BaseProfitability>
        </TableCell>
        <TableCell className="details-trades__cell">
          <NumberFormat
            value={formatValue(trade.volume, DEFAULT_DECIMAL_SCALE / 2)}
            displayType="text"
            thousandSeparator=" "
          />
        </TableCell>
        <TableCell className="details-trades__cell">
          <NumberFormat
            value={formatValue(trade.price, DEFAULT_DECIMAL_SCALE)}
            displayType="text"
            thousandSeparator=" "
          />
        </TableCell>
        <TableCell className="details-trades__cell">
          <NumberFormat
            value={formatValue(trade.priceCurrent, DEFAULT_DECIMAL_SCALE)}
            displayType="text"
            thousandSeparator=" "
          />
        </TableCell>
        <TableCell className="details-trades__cell">
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
        <TableCell className="overflow--initial details-trades__cell">
          <GVButton
            className={"button--circle"}
            color={"secondary"}
            variant={"contained"}
            onClick={e => {
              e.stopPropagation();
              setOpenPopup();
            }}
          >
            +
          </GVButton>
        </TableCell>
      </TableRow>
      <ProvidersPopup
        columns={OPEN_TRADES_PROVIDERS_COLUMNS}
        anchor={anchor}
        onClose={() => toggleSubrows(undefined)}
        otherPrograms={otherPrograms}
        renderRow={(provider: OrderSignalProgramInfo) => (
          <TradeSubRow
            title={title}
            key={trade.id}
            provider={provider}
            currency={trade.currency}
            tradeId={trade.id}
            symbol={trade.symbol}
            update={update}
          />
        )}
      />
      <ConfirmPopup
        header={t("investor.copytrading-tables.close-trade-confirm.header")}
        body={t("investor.copytrading-tables.close-trade-confirm.body", {
          symbol: trade.symbol,
          volume: trade.volume
        })}
        onClose={setClosePopup}
        open={isOpenPopup}
        onApply={() => {
          setClosePopup;
          closeCopytradingTrade(trade.id, () => {
            update(undefined);
          });
        }}
        applyButtonText={t("buttons.confirm")}
        onCancel={setClosePopup}
      />
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

interface Props extends DispatchProps, OwnProps, WithTranslation {}

interface OwnProps {
  trade: OrderSignalModel;
  title: string;
  update: UpdateRowFuncType;
}

interface DispatchProps {
  closeCopytradingTrade: CloseCopytradingTrade;
}
