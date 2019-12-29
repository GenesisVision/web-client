import { StatisticItemList } from "components/statistic-item-list/statistic-item-list";
import { withBlurLoader } from "decorators/with-blur-loader";
import DashboardStatisticPeriods from "pages/dashboard/components/dashboard-statistic/dashboard-statistic-periods";
import DashboardValueItem from "pages/dashboard/components/dashboard-statistic/dashboard-value-item";
import React from "react";
import { useTranslation } from "react-i18next";
import { CurrencyEnum } from "utils/types";

import { TDashboardTradingStatistic } from "../../dashboard.types";

const _DashboardTradingTotal: React.FC<Props> = ({
  currency,
  data: { equity, aum, profits, total }
}) => {
  const [t] = useTranslation();
  return (
    <div className="dashboard-trading__values">
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
      <DashboardStatisticPeriods
        withProfitability
        currency={currency}
        data={profits}
      />
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
