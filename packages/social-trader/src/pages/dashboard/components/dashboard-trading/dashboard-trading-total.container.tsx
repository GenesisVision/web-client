import "./dashboard-trading.scss";

import { useAccountCurrency } from "hooks/account-currency.hook";
import { fetchDashboardTradingTotalAction } from "pages/dashboard/actions/dashboard.actions";
import DashboardBlock from "pages/dashboard/components/dashboard-block/dashboard-block";
import { dashboardTradingTotalSelector } from "pages/dashboard/reducers/dashboard-trading-total.reducer";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { getTradingStatisticLoaderData } from "../../dashboard.loaders-data";
import DashboardTradingTotal from "./dashboard-trading-total";

const _DashboardTradingTotalContainer: React.FC = () => {
  const dispatch = useDispatch();
  const currency = useAccountCurrency();
  const [t] = useTranslation();
  const data = useSelector(dashboardTradingTotalSelector);
  useEffect(() => {
    dispatch(fetchDashboardTradingTotalAction(currency));
  }, []);
  return (
    <DashboardBlock label={t("dashboard-page.trading.title")}>
      <DashboardTradingTotal
        currency={currency}
        loaderData={getTradingStatisticLoaderData()}
        data={data!}
      />
    </DashboardBlock>
  );
};

const DashboardTradingTotalContainer = React.memo(
  _DashboardTradingTotalContainer
);
export default DashboardTradingTotalContainer;
