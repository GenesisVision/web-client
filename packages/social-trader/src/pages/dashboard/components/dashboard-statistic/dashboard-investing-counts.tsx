import { Row } from "components/row/row";
import { TooltipLabel } from "components/tooltip-label/tooltip-label";
import DashboardValueItem from "pages/dashboard/components/dashboard-statistic/dashboard-value-item";
import React from "react";
import { useTranslation } from "react-i18next";
import { CurrencyEnum } from "utils/types";

export const DashboardInvestingCounts: React.FC<{
  balance: number;
  currency: CurrencyEnum;
  programs: number;
  funds: number;
  assets: number;
}> = React.memo(({ balance, currency, programs, funds, assets }) => {
  const [t] = useTranslation();
  return (
    <Row>
      <DashboardValueItem
        label={
          <TooltipLabel
            tooltipContent={t("dashboard-page:tooltips.investing.balance")}
            labelText={t("dashboard-page:statistic.balance")}
          />
        }
        value={balance}
        currency={currency}
      />
      <DashboardValueItem
        label={
          <TooltipLabel
            tooltipContent={t("dashboard-page:tooltips.investing.programs")}
            labelText={t("dashboard-page:statistic.programs")}
          />
        }
        value={programs}
      />
      <DashboardValueItem
        label={
          <TooltipLabel
            tooltipContent={t("dashboard-page:tooltips.investing.funds")}
            labelText={t("dashboard-page:statistic.funds")}
          />
        }
        value={funds}
      />
      <DashboardValueItem
        label={
          <TooltipLabel
            tooltipContent={t("dashboard-page:tooltips.investing.assets")}
            labelText={t("dashboard-page:statistic.assets")}
          />
        }
        value={assets}
      />
    </Row>
  );
});
