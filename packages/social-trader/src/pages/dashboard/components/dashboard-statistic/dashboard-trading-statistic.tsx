import { StatisticItemList } from "components/statistic-item-list/statistic-item-list";
import { TooltipLabel } from "components/tooltip-label/tooltip-label";
import { useAccountCurrency } from "hooks/account-currency.hook";
import { DashboardBlockOrientation } from "pages/dashboard/components/dashboard-block/dashboard-block";
import DashboardStatisticContainer from "pages/dashboard/components/dashboard-statistic/dashboard-statistic.container";
import DashboardValueItem from "pages/dashboard/components/dashboard-statistic/dashboard-value-item";
import { TDashboardTradingStatistic } from "pages/dashboard/dashboard.types";
import React from "react";
import { useTranslation } from "react-i18next";
import { TRADING_ROUTE } from "routes/dashboard.routes";

import { fetchTradingTotalStatistic } from "../../services/dashboard.service";
import { DashboardTradingEmpty } from "pages/dashboard/components/dashboard-statistic/dashboard-trading-empty";

interface Props {
  orientation?: DashboardBlockOrientation;
}

const _DashboardTradingStatistic: React.FC<Props> = ({ orientation }) => {
  const [t] = useTranslation();
  const currency = useAccountCurrency();
  return (
    <DashboardStatisticContainer
      orientation={orientation}
      EmptyBlock={DashboardTradingEmpty}
      currency={currency}
      label={t("dashboard-page:statistic.trading")}
      request={fetchTradingTotalStatistic}
      all={TRADING_ROUTE}
      renderValues={({ equity, aum }: TDashboardTradingStatistic) => (
        <StatisticItemList>
          <DashboardValueItem
            label={
              <TooltipLabel
                tooltipContent={t(
                  "dashboard-page:tooltips.trading.your-equity"
                )}
                labelText={t("dashboard-page:statistic.equity")}
              />
            }
            value={equity}
            currency={currency}
          />
          <DashboardValueItem
            label={
              <TooltipLabel
                tooltipContent={t("dashboard-page:tooltips.trading.aum")}
                labelText={t("dashboard-page:statistic.AUM")}
              />
            }
            value={aum}
            currency={currency}
          />
        </StatisticItemList>
      )}
    />
  );
};

const DashboardTradingStatistic = React.memo(_DashboardTradingStatistic);
export default DashboardTradingStatistic;
