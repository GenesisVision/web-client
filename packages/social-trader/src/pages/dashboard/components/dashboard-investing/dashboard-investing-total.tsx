import { withBlurLoader } from "decorators/with-blur-loader";
import { useAccountCurrency } from "hooks/account-currency.hook";
import { DashboardInvestingCounts } from "pages/dashboard/components/dashboard-statistic/dashboard-investing-counts";
import DashboardStatisticPeriods from "pages/dashboard/components/dashboard-statistic/dashboard-statistic-periods";
import { hasProfits } from "pages/dashboard/dashboard.helpers";
import React from "react";

import { TDashboardInvestingStatistic } from "../../dashboard.types";
import styles from "./dashboard-investing.module.scss";

const _DashboardInvestingTotal: React.FC<Props> = ({
  data: { profits, equity, fundsCount, programsCount, coinsCount }
}) => {
  const currency = useAccountCurrency();
  return (
    <div className={styles["dashboard-investing__values"]}>
      <DashboardInvestingCounts
        balance={equity}
        currency={currency}
        programs={programsCount}
        funds={fundsCount}
        assets={coinsCount}
      />
      {hasProfits(profits) && (
        <DashboardStatisticPeriods
          data={profits}
          currency={currency}
          withProfitability
        />
      )}
    </div>
  );
};

interface Props {
  data: TDashboardInvestingStatistic;
}

const DashboardInvestingTotal = withBlurLoader(
  React.memo(_DashboardInvestingTotal)
);
export default DashboardInvestingTotal;
