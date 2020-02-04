import { StatisticItemList } from "components/statistic-item-list/statistic-item-list";
import DashboardValueItem from "pages/dashboard/components/dashboard-statistic/dashboard-value-item";
import React from "react";
import { useTranslation } from "react-i18next";
import { CurrencyEnum } from "utils/types";

export const DashboardInvestingCounts: React.FC<{
  balance: number;
  currency: CurrencyEnum;
  programs: number;
  funds: number;
}> = React.memo(({ balance, currency, programs, funds }) => {
  const [t] = useTranslation();
  return (
    <StatisticItemList>
      <DashboardValueItem
        label={t("dashboard-page.statistic.balance")}
        value={balance}
        currency={currency}
      />
      <DashboardValueItem
        label={t("dashboard-page.statistic.programs")}
        value={programs}
      />
      <DashboardValueItem
        label={t("dashboard-page.statistic.funds")}
        value={funds}
      />
    </StatisticItemList>
  );
});
