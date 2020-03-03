import GVColors from "components/gv-styles/gv-colors";
import { Row } from "components/row/row";
import { StatisticItemList } from "components/statistic-item-list/statistic-item-list";
import { PieStatisticItem } from "components/statistic-item/pie-statistic-item";
import StatisticItem from "components/statistic-item/statistic-item";
import { TooltipLabel } from "components/tooltip-label/tooltip-label";
import * as React from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import { CurrencyEnum } from "utils/types";

export const $piePendingColor = "#f7931a";
export const $pieAvailableColor = "#5758a5";

const _WalletBalanceElements: React.FC<Props> = ({
  pending,
  total,
  currency,
  available,
  invested
}) => {
  const [t] = useTranslation();
  return (
    <Row large>
      <StatisticItemList>
        <StatisticItem
          big
          accent
          label={
            <TooltipLabel
              tooltipContent={t("wallet-page.tooltip.total-balance")}
              labelText={t("wallet-page.total-balance")}
            />
          }
          condition={total !== undefined}
        >
          <NumberFormat
            value={total}
            thousandSeparator={" "}
            suffix={` ${currency}`}
            displayType="text"
          />
        </StatisticItem>
        <div className="wallet-balance__divider" />
        <PieStatisticItem
          condition={available !== undefined}
          value={available!}
          total={total!}
          label={t("wallet-page.available")}
          suffix={currency}
          color={$pieAvailableColor}
          tooltipContentLabel={t("wallet-page.tooltip.available")}
        />
        <PieStatisticItem
          condition={invested !== undefined}
          value={invested!}
          total={total!}
          label={t("wallet-page.invested")}
          suffix={currency}
          color={GVColors.$primaryColor}
          tooltipContentLabel={t("wallet-page.tooltip.invested")}
        />
        <PieStatisticItem
          condition={pending !== undefined}
          value={pending!}
          total={total!}
          label={t("wallet-page.trading")}
          suffix={currency}
          color={$piePendingColor}
          tooltipContentLabel={t("wallet-page.tooltip.pending")}
        />
      </StatisticItemList>
    </Row>
  );
};

interface Props {
  total?: number;
  available?: number;
  invested?: number;
  pending?: number;
  currency: CurrencyEnum;
}

const WalletBalanceElements = React.memo(_WalletBalanceElements);
export default WalletBalanceElements;
