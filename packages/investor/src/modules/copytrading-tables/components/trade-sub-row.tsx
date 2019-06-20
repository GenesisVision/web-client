import { OrderSignalProgramInfo } from "gv-api-web";
import { DECIMAL_SCALE } from "modules/copytrading-tables/components/copytrading-tables.constants";
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
import ConfirmPopup from "shared/components/confirm-popup/confirm-popup";
import GVButton from "shared/components/gv-button";
import TableCell from "shared/components/table/components/table-cell";
import TableRow from "shared/components/table/components/table-row";
import { UpdateRowFuncType } from "shared/components/table/components/table.types";
import { composeProgramDetailsUrl } from "shared/utils/compose-url";
import { formatValue } from "shared/utils/formatter";

const _TradeSubRow: React.FC<Props> = ({
  provider,
  tradeId,
  closeCopytradingTrade,
  symbol,
  t,
  update,
  title
}) => {
  const [isOpenPopup, setOpenPopup] = useState<boolean>(false);
  const { program } = provider;
  return (
    <TableRow key={provider.programId}>
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
      <TableCell className="details-trades__cell program-details-trades__cell--direction">
        {moment(provider.firstOrderDate).format()}
      </TableCell>
      <TableCell className="details-trades__cell program-details-trades__cell--direction">
        {symbol}
      </TableCell>
      <TableCell className="details-trades__cell program-details-trades__cell--direction" />
      <TableCell className="details-trades__cell program-details-trades__cell--direction">
        <NumberFormat
          value={formatValue(provider.volume, DECIMAL_SCALE / 2)}
          displayType="text"
          thousandSeparator=" "
        />
      </TableCell>
      <TableCell className="details-trades__cell program-details-trades__cell--direction" />
      <TableCell className="details-trades__cell program-details-trades__cell--direction">
        <NumberFormat
          value={formatValue(provider.priceOpenAvg, DECIMAL_SCALE / 2)}
          displayType="text"
          thousandSeparator=" "
        />
      </TableCell>
      <TableCell className="details-trades__cell program-details-trades__cell--direction" />
      <TableCell className="details-trades__cell program-details-trades__cell--direction">
        <GVButton variant="text" onClick={() => setOpenPopup(true)}>
          {t("buttons.cancel")}
        </GVButton>
        <ConfirmPopup
          header={t("investor.copytrading-tables.close-trade-confirm.header")}
          body={t("investor.copytrading-tables.close-trade-confirm.body", {
            symbol: symbol,
            volume: provider.volume
          })}
          onClose={() => setOpenPopup(false)}
          open={isOpenPopup}
          onApply={() => {
            setOpenPopup(false);
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

interface Props extends DispatchProps, OwnProps, InjectedTranslateProps {}

interface OwnProps {
  title: string;
  provider: OrderSignalProgramInfo;
  tradeId: string;
  symbol: string;
  update: UpdateRowFuncType;
}

interface DispatchProps {
  closeCopytradingTrade: CloseCopytradingTrade;
}
