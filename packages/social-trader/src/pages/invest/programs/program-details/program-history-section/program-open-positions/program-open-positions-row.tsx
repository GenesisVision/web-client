import clsx from "clsx";
import { CurrencyItem } from "components/currency-item/currency-item";
import styles from "components/details/details-description-section/details-statistic-section/details-history/trades.module.scss";
import BaseProfitability from "components/profitability/base-profitability";
import Profitability from "components/profitability/profitability";
import { PROFITABILITY_PREFIX } from "components/profitability/profitability.helper";
import TableCell from "components/table/components/table-cell";
import TableRow from "components/table/components/table-row";
import { UpdateItemsFuncType } from "components/table/components/table.types";
import { DEFAULT_DECIMAL_SCALE, TRADE_ASSET_TYPE } from "constants/constants";
import { OrderSignalModel, TradesViewModel } from "gv-api-web";
import { ClosePositionButton } from "pages/invest/programs/program-details/program-history-section/program-open-positions/close-position-button";
import React from "react";
import NumberFormat from "react-number-format";
import { formatDate } from "utils/dates";
import { formatValue } from "utils/formatter";
import { CurrencyEnum } from "utils/types";

const _ProgramOpenPositionsRow: React.FC<Props> = ({
  programId,
  assetType,
  canCloseOpenPositions,
  updateItems,
  position,
  data: { showDate, showDirection, showPrice, showPriceOpen, showProfit }
}) => (
  <TableRow stripy>
    {showDate && (
      <TableCell
        className={clsx(
          styles["details-trades__cell"],
          styles["program-details-trades__cell--date"]
        )}
      >
        {formatDate(position.date)}
      </TableCell>
    )}
    <TableCell
      className={clsx(
        styles["details-trades__cell"],
        styles["program-details-trades__cell--symbol"]
      )}
    >
      <CurrencyItem
        clickable={position.assetData ? position.assetData.hasAssetInfo : false}
        url={position.assetData ? position.assetData.url : ""}
        logo={position.assetData ? position.assetData.logoUrl : ""}
        small
        name={position.symbol}
        symbol={position.symbol}
      />
    </TableCell>
    {showDirection && (
      <TableCell>
        <BaseProfitability
          isPositive={position.direction === "Buy"}
          isNegative={position.direction === "Sell"}
        >
          {position.direction}
        </BaseProfitability>
      </TableCell>
    )}
    <TableCell>
      <NumberFormat
        value={formatValue(position.volume, DEFAULT_DECIMAL_SCALE / 2)}
        displayType="text"
        thousandSeparator=" "
      />
    </TableCell>
    {showPrice && (
      <TableCell>
        <NumberFormat
          value={formatValue(position.price, DEFAULT_DECIMAL_SCALE)}
          displayType="text"
          thousandSeparator=" "
        />
      </TableCell>
    )}
    {showPriceOpen && (
      <TableCell>
        <NumberFormat
          value={formatValue(position.priceCurrent, DEFAULT_DECIMAL_SCALE)}
          displayType="text"
          thousandSeparator=" "
        />
      </TableCell>
    )}
    {showProfit && (
      <TableCell className={styles["details-trades__cell--profit"]}>
        <Profitability
          value={formatValue(position.profit, DEFAULT_DECIMAL_SCALE)}
          prefix={PROFITABILITY_PREFIX.SIGN}
        >
          <NumberFormat
            value={formatValue(position.profit, DEFAULT_DECIMAL_SCALE)}
            thousandSeparator=" "
            displayType="text"
            allowNegative={false}
            suffix={` ${position.profitCurrency}`}
          />
        </Profitability>
        {canCloseOpenPositions && (
          <ClosePositionButton
            assetType={assetType}
            onApply={updateItems}
            volume={position.volume}
            symbol={position.symbol}
            id={programId}
          />
        )}
      </TableCell>
    )}
  </TableRow>
);

interface Props {
  programId: string;
  assetType: TRADE_ASSET_TYPE;
  canCloseOpenPositions?: boolean;
  updateItems?: UpdateItemsFuncType;
  data: TradesViewModel;
  currency: CurrencyEnum;
  position: OrderSignalModel;
}

const ProgramOpenPositionsRow = React.memo(_ProgramOpenPositionsRow);
export default ProgramOpenPositionsRow;
