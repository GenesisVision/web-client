import DashboardStatisticPeriods from "pages/dashboard/components/dashboard-statistic/dashboard-statistic-periods";
import DashboardValueItem from "pages/dashboard/components/dashboard-statistic/dashboard-value-item";
import React from "react";
import { useTranslation } from "react-i18next";
import { StatisticItemList } from "shared/components/statistic-item-list/statistic-item-list";
import { withBlurLoader } from "shared/decorators/with-blur-loader";
import { CurrencyEnum } from "shared/utils/types";

import { TDashboardTradingStatistic } from "../../dashboard.types";

const _DashboardTradingTotal: React.FC<Props> = ({
  currency,
  data: { equity, assetsUnderManagement, profits }
}) => {
  const [t] = useTranslation();
  return (
    <div className="dashboard-trading__values">
      <StatisticItemList>
        <DashboardValueItem
          label={t("dashboard-page.statistic.equity")}
          value={equity}
          currency={currency}
        />
        <DashboardValueItem
          label={t("dashboard-page.statistic.AUM")}
          value={assetsUnderManagement}
          currency={currency}
        />
      </StatisticItemList>
      <DashboardStatisticPeriods currency={currency} data={profits} />
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
