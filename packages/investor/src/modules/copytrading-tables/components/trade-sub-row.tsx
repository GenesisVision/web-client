import { OrderSignalProgramInfo } from "gv-api-web";
import {
  CloseCopytradingTrade,
  closeCopytradingTrade
} from "modules/copytrading-tables/services/copytrading-tables.service";
import moment from "moment";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { compose } from "redux";
import AssetAvatar from "shared/components/avatar/asset-avatar/asset-avatar";
import ConfirmPopup from "shared/components/confirm-popup/confirm-popup";
import GVButton from "shared/components/gv-button";
import Profitability from "shared/components/profitability/profitability";
import { PROFITABILITY_PREFIX } from "shared/components/profitability/profitability.helper";
import TableCell from "shared/components/table/components/table-cell";
import TableRow from "shared/components/table/components/table-row";
import { UpdateRowFuncType } from "shared/components/table/components/table.types";
import { DEFAULT_DECIMAL_SCALE } from "shared/constants/constants";
import useIsOpen from "shared/hooks/is-open.hook";
import { composeProgramDetailsUrl } from "shared/utils/compose-url";
import { formatValue } from "shared/utils/formatter";

const _TradeSubRow: React.FC<Props> = ({
  provider,
  tradeId,
  closeCopytradingTrade,
  symbol,
  currency,
  t,
  update,
  title
}) => {
  const [isOpenPopup, setOpenPopup, setClosePopup] = useIsOpen();
  const { program } = provider;
  return (
    <TableRow key={provider.programId}>
      <TableCell className="details-trades__cell">
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
        </div>
      </TableCell>
      <TableCell className="details-trades__cell">
        {moment(provider.firstOrderDate).format()}
      </TableCell>
      <TableCell className="details-trades__cell">{symbol}</TableCell>
      <TableCell className="details-trades__cell">
        <NumberFormat
          value={formatValue(provider.volume, DEFAULT_DECIMAL_SCALE / 2)}
          displayType="text"
          thousandSeparator=" "
        />
      </TableCell>
      <TableCell className="details-trades__cell">
        <NumberFormat
          value={formatValue(provider.priceOpenAvg, DEFAULT_DECIMAL_SCALE)}
          displayType="text"
          thousandSeparator=" "
        />
      </TableCell>
      <TableCell className="details-trades__cell">
        <Profitability
          value={formatValue(provider.profit, DEFAULT_DECIMAL_SCALE)}
          prefix={PROFITABILITY_PREFIX.SIGN}
        >
          <NumberFormat
            value={formatValue(provider.profit, DEFAULT_DECIMAL_SCALE)}
            thousandSeparator=" "
            allowNegative={false}
            displayType="text"
            suffix={provider.profit !== 0 ? ` ${currency}` : ""}
          />
        </Profitability>
      </TableCell>
      <TableCell className="overflow--initial details-trades__cell">
        <GVButton
          className={"button--circle"}
          color={"secondary"}
          variant={"contained"}
          onClick={setOpenPopup}
        >
          +
        </GVButton>
        <ConfirmPopup
          applyButtonText={t("buttons.confirm")}
          header={t("investor.copytrading-tables.close-trade-confirm.header")}
          body={t("investor.copytrading-tables.close-trade-confirm.body", {
            symbol: symbol,
            volume: provider.volume
          })}
          onClose={setClosePopup}
          onCancel={setClosePopup}
          open={isOpenPopup}
          onApply={() => {
            setClosePopup;
            closeCopytradingTrade(
              tradeId,
              () => update(undefined),
              provider.programId
            );
          }}
        />
      </TableCell>
    </TableRow>
  );
};

const TradeSubRow = compose<React.FC<OwnProps>>(
  translate(),
  connect<{}, DispatchProps>(
    undefined,
    {
      closeCopytradingTrade
    }
  ),
  React.memo
)(_TradeSubRow);

export default TradeSubRow;

interface Props extends DispatchProps, OwnProps, WithTranslation {}

interface OwnProps {
  title: string;
  provider: OrderSignalProgramInfo;
  currency: string;
  tradeId: string;
  symbol: string;
  update: UpdateRowFuncType;
}

interface DispatchProps {
  closeCopytradingTrade: CloseCopytradingTrade;
}
