import { StatisticItemList } from "components/statistic-item-list/statistic-item-list";
import { Text } from "components/text/text";
import { useAccountCurrency } from "hooks/account-currency.hook";
import { CREATE_ACCOUNT_PAGE_ROUTE } from "pages/create-account/create-account.constants";
import { CREATE_FUND_PAGE_ROUTE } from "pages/create-fund/create-fund.constants";
import { DashboardNewUserBlock } from "pages/dashboard/components/dashboard-statistic/dashboard-new-user.block";
import DashboardStatisticContainer from "pages/dashboard/components/dashboard-statistic/dashboard-statistic.container";
import DashboardValueItem from "pages/dashboard/components/dashboard-statistic/dashboard-value-item";
import { TDashboardTradingStatistic } from "pages/dashboard/dashboard.types";
import React from "react";
import { useTranslation } from "react-i18next";
import { TRADING_ROUTE } from "routes/dashboard.routes";

import { fetchTradingTotalStatistic } from "../../services/dashboard.service";

const _DashboardTradingStatistic: React.FC<Props> = ({
  landscapeTablet,
  tablet
}) => {
  const [t] = useTranslation();
  const currency = useAccountCurrency();
  return (
    <DashboardStatisticContainer
      landscapeTablet={landscapeTablet}
      tablet={tablet}
      EmptyBlock={DashboardTradingEmpty}
      currency={currency}
      label={t("dashboard-page.statistic.trading")}
      request={fetchTradingTotalStatistic}
      all={TRADING_ROUTE}
      renderValues={({ equity, aum }: TDashboardTradingStatistic) => (
        <StatisticItemList>
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
      )}
    />
  );
};

const DashboardTradingEmpty: React.FC = React.memo(() => {
  const [t] = useTranslation();
  return (
    <DashboardNewUserBlock
      leftField={{
        link: CREATE_ACCOUNT_PAGE_ROUTE,
        linkLabel: t(
          "dashboard-page.statistic.get-started.trading.left-field.button"
        ),
        text: (
          <>
            {t("dashboard-page.statistic.get-started.trading.left-field.text")}{" "}
            <Text muted>
              {t(
                "dashboard-page.statistic.get-started.trading.left-field.text-2"
              )}
            </Text>
          </>
        )
      }}
      rightField={{
        link: CREATE_FUND_PAGE_ROUTE,
        linkLabel: t(
          "dashboard-page.statistic.get-started.trading.right-field.button"
        ),
        text: (
          <>
            {t("dashboard-page.statistic.get-started.trading.right-field.text")}
          </>
        )
      }}
    />
  );
});

interface Props {
  landscapeTablet?: boolean;
  tablet?: boolean;
}

const DashboardTradingStatistic = React.memo(_DashboardTradingStatistic);
export default DashboardTradingStatistic;
