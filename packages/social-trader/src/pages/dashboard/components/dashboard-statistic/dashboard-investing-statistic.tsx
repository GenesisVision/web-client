import { MutedText } from "components/muted-text/muted-text";
import { useAccountCurrency } from "hooks/account-currency.hook";
import { DashboardInvestingCounts } from "pages/dashboard/components/dashboard-statistic/dashboard-investing-counts";
import { DashboardNewUserBlock } from "pages/dashboard/components/dashboard-statistic/dashboard-new-user.block";
import DashboardStatisticContainer from "pages/dashboard/components/dashboard-statistic/dashboard-statistic.container";
import { TDashboardInvestingStatistic } from "pages/dashboard/dashboard.types";
import React from "react";
import { useTranslation } from "react-i18next";
import { INVESTMENTS_ROUTE } from "routes/dashboard.routes";
import { GV_FUNDS_ROUTE, GV_PROGRAMS_ROUTE } from "routes/invest.routes";

import { getTotalInvestingStatistic } from "../../services/dashboard.service";

const _DashboardInvestingStatistic: React.FC<Props> = ({
  landscapeTablet,
  tablet
}) => {
  const currency = useAccountCurrency();
  const [t] = useTranslation();
  return (
    <DashboardStatisticContainer
      landscapeTablet={landscapeTablet}
      tablet={tablet}
      EmptyBlock={DashboardInvestingEmpty}
      currency={currency}
      label={t("dashboard-page.statistic.investing")}
      request={getTotalInvestingStatistic}
      all={INVESTMENTS_ROUTE}
      renderValues={({
        fundsCount,
        programsCount,
        equity
      }: TDashboardInvestingStatistic) => (
        <DashboardInvestingCounts
          balance={equity}
          currency={currency}
          programs={programsCount}
          funds={fundsCount}
        />
      )}
    />
  );
};

interface Props {
  landscapeTablet?: boolean;
  tablet?: boolean;
}

const DashboardInvestingEmpty: React.FC = React.memo(() => {
  const [t] = useTranslation();
  return (
    <DashboardNewUserBlock
      leftField={{
        link: GV_PROGRAMS_ROUTE,
        linkLabel: t(
          "dashboard-page.statistic.get-started.investing.left-field.button"
        ),
        text: (
          <>
            <MutedText>
              {t(
                "dashboard-page.statistic.get-started.investing.left-field.text"
              )}
            </MutedText>
            {t(
              "dashboard-page.statistic.get-started.investing.left-field.text-2"
            )}
          </>
        )
      }}
      rightField={{
        link: GV_FUNDS_ROUTE,
        linkLabel: t(
          "dashboard-page.statistic.get-started.investing.right-field.button"
        ),
        text: (
          <>
            {t(
              "dashboard-page.statistic.get-started.investing.right-field.text"
            )}
          </>
        )
      }}
    />
  );
});

const DashboardInvestingStatistic = React.memo(_DashboardInvestingStatistic);
export default DashboardInvestingStatistic;
