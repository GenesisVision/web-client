import { StatisticItemList } from "components/statistic-item-list/statistic-item-list";
import { withBlurLoader } from "decorators/with-blur-loader";
import { useAccountCurrency } from "hooks/account-currency.hook";
import DashboardStatisticPeriods from "pages/dashboard/components/dashboard-statistic/dashboard-statistic-periods";
import DashboardValueItem from "pages/dashboard/components/dashboard-statistic/dashboard-value-item";
import { hasProfits } from "pages/dashboard/dashboard.helpers";
import React from "react";
import { useTranslation } from "react-i18next";

import { TDashboardTradingStatistic } from "../../dashboard.types";
import styles from "./dashboard-trading.module.scss";

const _DashboardTradingTotal: React.FC<Props> = ({
  data: { equity, aum, profits, total }
}) => {
  const currency = useAccountCurrency();
  const [t] = useTranslation();
  return (
    <div className={styles["dashboard-trading__values"]}>
      <StatisticItemList>
        <DashboardValueItem
          label={t("dashboard-page.statistic.total")}
          value={total}
          currency={currency}
        />
        <DashboardValueItem
          label={t("dashboard-page.statistic.equity")}
          value={equity}
          currency={currency}
        />
        <DashboardValueItem
          label={t("dashboard-page.statistic.AUM")}
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
  data: TDashboardTradingStatistic;
}

const DashboardTradingTotal = withBlurLoader(
  React.memo(_DashboardTradingTotal)
);
export default DashboardTradingTotal;
