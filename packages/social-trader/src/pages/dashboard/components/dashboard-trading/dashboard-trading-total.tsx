import { StatisticItemList } from "components/statistic-item-list/statistic-item-list";
import { TooltipLabel } from "components/tooltip-label/tooltip-label";
import { withBlurLoader } from "decorators/with-blur-loader";
import DashboardStatisticPeriods from "pages/dashboard/components/dashboard-statistic/dashboard-statistic-periods";
import DashboardValueItem from "pages/dashboard/components/dashboard-statistic/dashboard-value-item";
import { hasProfits } from "pages/dashboard/dashboard.helpers";
import React from "react";
import { useTranslation } from "react-i18next";
import { CurrencyEnum } from "utils/types";

import { TDashboardTradingStatistic } from "../../dashboard.types";
import styles from "./dashboard-trading.module.scss";

const _DashboardTradingTotal: React.FC<Props> = ({
  currency,
  data: { equity, aum, profits, total }
}) => {
  const [t] = useTranslation();
  return (
    <div className={styles["dashboard-trading__values"]}>
      <StatisticItemList>
        <DashboardValueItem
          label={
            <TooltipLabel
              tooltipContent={t("dashboard-page.tooltips.trading.total")}
              labelText={t("dashboard-page.statistic.total")}
            />
          }
          value={total}
          currency={currency}
        />
        <DashboardValueItem
          label={
            <TooltipLabel
              tooltipContent={t("dashboard-page.tooltips.trading.your-equity")}
              labelText={t("dashboard-page.statistic.equity")}
            />
          }
          value={equity}
          currency={currency}
        />
        <DashboardValueItem
          label={
            <TooltipLabel
              tooltipContent={t("dashboard-page.tooltips.trading.aum")}
              labelText={t("dashboard-page.statistic.AUM")}
            />
          }
          value={aum}
          currency={currency}
        />
      </StatisticItemList>
      {hasProfits(profits) && (
        <DashboardStatisticPeriods
          withProfitability
          currency={currency}
          data={profits}
        />
      )}
    </div>
  );
};

interface Props {
  currency: CurrencyEnum;
  data: TDashboardTradingStatistic;
}

const DashboardTradingTotal = withBlurLoader(
  React.memo(_DashboardTradingTotal)
);
export default DashboardTradingTotal;
