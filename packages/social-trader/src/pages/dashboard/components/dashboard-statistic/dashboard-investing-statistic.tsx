import GVButton from "components/gv-button";
import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import { DashboardInvestingCounts } from "pages/dashboard/components/dashboard-statistic/dashboard-investing-counts";
import DashboardStatisticContainer from "pages/dashboard/components/dashboard-statistic/dashboard-statistic.container";
import { TDashboardInvestingStatistic } from "pages/dashboard/dashboard.types";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { currencySelector } from "reducers/account-settings-reducer";
import { INVESTMENTS_ROUTE } from "routes/dashboard.routes";
import { GV_FUNDS_ROUTE, GV_PROGRAMS_ROUTE } from "routes/invest.routes";

import { getTotalInvestingStatistic } from "../../services/dashboard.service";

const _DashboardInvestingStatistic: React.FC<Props> = ({
  landscapeTablet,
  tablet
}) => {
  const currency = useSelector(currencySelector);
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
  const { linkCreator } = useToLink();
  const [t] = useTranslation();
  return (
    <div className="dashboard-statistic__create-block dashboard-statistic__values">
      <h1>{t("dashboard-page.statistic.get-started-title")}</h1>
      <div className="dashboard-statistic__create-block-text">
        {t("dashboard-page.statistic.get-started-invest")}
      </div>
      <div className="dashboard-statistic__create-block-links">
        <div className="dashboard-statistic__create-block-link">
          <Link to={linkCreator(GV_PROGRAMS_ROUTE)}>
            <GVButton color="primary">{t("navigation.gv-programs")}</GVButton>
          </Link>
        </div>
        <div className="dashboard-statistic__create-block-link">
          <Link to={linkCreator(GV_FUNDS_ROUTE)}>
            <GVButton color="primary">{t("navigation.gv-funds")}</GVButton>
          </Link>
        </div>
      </div>
    </div>
  );
});

const DashboardInvestingStatistic = React.memo(_DashboardInvestingStatistic);
export default DashboardInvestingStatistic;
