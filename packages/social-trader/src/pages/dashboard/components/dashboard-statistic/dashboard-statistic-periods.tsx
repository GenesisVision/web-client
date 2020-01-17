import { ProfitabilityValuePercent } from "components/profitability/profitability-value-percent";
import { StatisticItemList } from "components/statistic-item-list/statistic-item-list";
import StatisticItem from "components/statistic-item/statistic-item";
import Crashable from "decorators/crashable";
import { TDashboardTotalField } from "pages/dashboard/dashboard.types";
import React from "react";
import { useTranslation } from "react-i18next";
import { CurrencyEnum } from "utils/types";

const _DashboardStatisticPeriods: React.FC<Props> = ({
  currency,
  withProfitability,
  data: { day, week, month }
}) => {
  const [t] = useTranslation();
  return (
    <StatisticItemList>
      <DashboardStatisticPeriodsItem
        currency={currency}
        withProfitability={withProfitability}
        label={t("dashboard-page.total.day")}
        item={day}
      />
      <DashboardStatisticPeriodsItem
        currency={currency}
        withProfitability={withProfitability}
        label={t("dashboard-page.total.week")}
        item={week}
      />
      <DashboardStatisticPeriodsItem
        currency={currency}
        withProfitability={withProfitability}
        label={t("dashboard-page.total.month")}
        item={month}
      />
    </StatisticItemList>
  );
};

interface Props {
  currency: CurrencyEnum;
  withProfitability?: boolean;
  data: {
    day: TDashboardTotalField;
    week: TDashboardTotalField;
    month: TDashboardTotalField;
  };
}

const _DashboardStatisticPeriodsItem: React.FC<{
  currency: CurrencyEnum;
  withProfitability?: boolean;
  item: TDashboardTotalField;
  label: string;
}> = ({ item: { profit, profitPercent }, label, currency }) => {
  return (
    <StatisticItem label={label}>
      <div className="dashboard-statistic-periods-item__value-container">
        <ProfitabilityValuePercent
          currency={currency}
          percent={profitPercent}
          value={profit}
        />
      </div>
    </StatisticItem>
  );
};
export const DashboardStatisticPeriodsItem = React.memo(
  _DashboardStatisticPeriodsItem
);

const DashboardStatisticPeriods = React.memo(
  Crashable(_DashboardStatisticPeriods)
);
export default DashboardStatisticPeriods;
