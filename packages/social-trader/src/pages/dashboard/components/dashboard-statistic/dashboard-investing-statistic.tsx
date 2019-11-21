import GVButton from "components/gv-button";
import Link from "components/link/link";
import DashboardStatisticContainer from "pages/dashboard/components/dashboard-statistic/dashboard-statistic.container";
import DashboardValueItem from "pages/dashboard/components/dashboard-statistic/dashboard-value-item";
import { TDashboardInvestingStatistic } from "pages/dashboard/dashboard.types";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { currencySelector } from "reducers/account-settings-reducer";
import { INVESTMENTS_ROUTE } from "routes/dashboard.routes";
import { GV_FUNDS_ROUTE, GV_PROGRAMS_ROUTE } from "routes/invest.routes";

import { getTotalInvestingStatistic } from "../../services/dashboard.service";

const _DashboardInvestingStatistic: React.FC<Props> = () => {
  const currency = useSelector(currencySelector);
  const [t] = useTranslation();
  return (
    <DashboardStatisticContainer
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
        <>
          <DashboardValueItem
            label={t("dashboard-page.statistic.balance")}
            value={equity}
            currency={currency}
          />
          <DashboardValueItem
            label={t("dashboard-page.statistic.programs")}
            value={programsCount}
            currency={currency}
          />
          <DashboardValueItem
            label={t("dashboard-page.statistic.funds")}
            value={fundsCount}
            currency={currency}
          />
        </>
      )}
    />
  );
};

interface Props {}

const DashboardInvestingEmpty: React.FC = React.memo(() => {
  const [t] = useTranslation();
  return (
    <div className="dashboard-statistic__create-block dashboard-statistic__values">
      <h1>{t("dashboard-page.statistic.get-started-title")}</h1>
      <div className="dashboard-statistic__create-block-text">
        {t("dashboard-page.statistic.get-started-invest")}
      </div>
      <div className="dashboard-statistic__create-block-links">
        <Link to={GV_PROGRAMS_ROUTE}>
          <GVButton color="primary">{t("navigation.gv-programs")}</GVButton>
        </Link>
        <Link to={GV_FUNDS_ROUTE}>
          <GVButton color="primary">{t("navigation.gv-funds")}</GVButton>
        </Link>
      </div>
    </div>
  );
});

const DashboardInvestingStatistic = React.memo(_DashboardInvestingStatistic);
export default DashboardInvestingStatistic;
