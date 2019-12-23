import GVButton from "components/gv-button";
import Link from "components/link/link";
import { CREATE_ACCOUNT_PAGE_ROUTE } from "pages/create-account/create-account.constants";
import { CREATE_FUND_PAGE_ROUTE } from "pages/create-fund/create-fund.constants";
import DashboardStatisticContainer from "pages/dashboard/components/dashboard-statistic/dashboard-statistic.container";
import DashboardValueItem from "pages/dashboard/components/dashboard-statistic/dashboard-value-item";
import { TDashboardTradingStatistic } from "pages/dashboard/dashboard.types";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { currencySelector } from "reducers/account-settings-reducer";
import { TRADING_ROUTE } from "routes/dashboard.routes";

import { fetchTradingTotalStatistic } from "../../services/dashboard.service";

const _DashboardTradingStatistic: React.FC<Props> = () => {
  const [t] = useTranslation();
  const currency = useSelector(currencySelector);
  return (
    <DashboardStatisticContainer
      EmptyBlock={DashboardTradingEmpty}
      currency={currency}
      label={t("dashboard-page.statistic.trading")}
      request={fetchTradingTotalStatistic}
      all={TRADING_ROUTE}
      renderValues={({ equity, aum }: TDashboardTradingStatistic) => (
        <>
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
        </>
      )}
    />
  );
};

const DashboardTradingEmpty: React.FC = React.memo(() => {
  const [t] = useTranslation();
  return (
    <div className=" dashboard-statistic__values">
      <div className="dashboard-statistic__create-block">
        <h1>{t("dashboard-page.statistic.get-started-title")}</h1>
        <div className="dashboard-statistic__create-block-text">
          {t("dashboard-page.statistic.get-started-account")}
        </div>
        <div className="dashboard-statistic__create-block-links">
          <Link to={CREATE_ACCOUNT_PAGE_ROUTE}>
            <GVButton color="primary">{t("buttons.create-account")}</GVButton>
          </Link>
        </div>
      </div>
      <div className="dashboard-statistic__create-block">
        <div className="dashboard-statistic__create-block-text">
          {t("dashboard-page.statistic.get-started-fund")}
        </div>
        <div className="dashboard-statistic__create-block-links">
          <Link to={CREATE_FUND_PAGE_ROUTE}>
            <GVButton color="primary">{t("buttons.create-fund")}</GVButton>
          </Link>
        </div>
      </div>
    </div>
  );
});

interface Props {}

const DashboardTradingStatistic = React.memo(_DashboardTradingStatistic);
export default DashboardTradingStatistic;
