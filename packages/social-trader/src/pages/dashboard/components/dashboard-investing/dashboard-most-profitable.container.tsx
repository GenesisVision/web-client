import { useAccountCurrency } from "hooks/account-currency.hook";
import {
  fetchDashboardInvestmentsFundsAction,
  fetchDashboardInvestmentsMostProfitableAction,
  fetchDashboardInvestmentsProgramsAction,
  fetchDashboardInvestmentsTotalAction
} from "pages/dashboard/actions/dashboard.actions";
import DashboardBlock from "pages/dashboard/components/dashboard-block/dashboard-block";
import DashboardInvestingMostProfitable from "pages/dashboard/components/dashboard-investing/dashboard-most-profitable";
import { dashboardInvestmentsMostProfitableItemsSelector } from "pages/dashboard/reducers/dashboard-investments-most-profitable.reducer";
import React, { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

const _DashboardInvestingMostProfitableContainer: React.FC = () => {
  const [t] = useTranslation();
  const dispatch = useDispatch();
  const currency = useAccountCurrency();
  const data = useSelector(dashboardInvestmentsMostProfitableItemsSelector);
  useEffect(() => {
    dispatch(
      fetchDashboardInvestmentsMostProfitableAction({ showIn: currency })
    );
  }, []);
  const handleUpdateItems = useCallback(() => {
    dispatch(fetchDashboardInvestmentsProgramsAction());
    dispatch(fetchDashboardInvestmentsFundsAction({ showIn: currency }));
    dispatch(fetchDashboardInvestmentsTotalAction(currency));
    dispatch(
      fetchDashboardInvestmentsMostProfitableAction({ showIn: currency })
    );
  }, [currency]);
  return (
    <DashboardBlock label={t("dashboard-page:investing.most-profitable")}>
      <DashboardInvestingMostProfitable
        onApply={handleUpdateItems}
        data={data!}
        loaderData={[]}
      />
    </DashboardBlock>
  );
};

const DashboardInvestingMostProfitableContainer = React.memo(
  _DashboardInvestingMostProfitableContainer
);
export default DashboardInvestingMostProfitableContainer;
