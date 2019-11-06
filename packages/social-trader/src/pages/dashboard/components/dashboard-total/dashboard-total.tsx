import DashboardStatisticPeriods from "pages/dashboard/components/dashboard-statistic/dashboard-statistic-periods";
import DashboardValueItem from "pages/dashboard/components/dashboard-statistic/dashboard-value-item";
import React from "react";
import { useTranslation } from "react-i18next";
import { StatisticItemList } from "shared/components/statistic-item-list/statistic-item-list";
import { withBlurLoader } from "shared/decorators/with-blur-loader";
import { CurrencyEnum } from "shared/utils/types";

import { TDashboardTotal } from "../../dashboard.types";

const _DashboardTotal: React.FC<Props> = ({
  currency,
  data: {
    available,
    invested,
    pending,
    profits: { dayProfit, monthProfit, weekProfit },
    total
  }
}) => {
  const [t] = useTranslation();
  return (
    <div className="dashboard-total__values">
      <StatisticItemList>
        <DashboardValueItem
          label={t("dashboard-page.total.available")}
          value={available}
          currency={currency}
        />
        <DashboardValueItem
          label={t("dashboard-page.total.invested")}
          value={invested}
          currency={currency}
        />
        <DashboardValueItem
          label={t("dashboard-page.total.pending")}
          value={pending}
          currency={currency}
        />
        <DashboardValueItem
          label={t("dashboard-page.total.total")}
          value={total}
          currency={currency}
        />
      </StatisticItemList>
      <DashboardStatisticPeriods
        data={{
          day: dayProfit,
          month: monthProfit,
          week: weekProfit
        }}
        currency={currency}
        withProfitability
      />
    </div>
  );
};

interface Props {
  currency: CurrencyEnum;
  data: TDashboardTotal;
}

const DashboardTotal = withBlurLoader(React.memo(_DashboardTotal));
export default DashboardTotal;
