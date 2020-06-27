import { DataStorageContext } from "components/data-storage/data-storage";
import { useAccountCurrency } from "hooks/account-currency.hook";
import {
  fetchDashboardInvestmentsFundsAction,
  fetchDashboardInvestmentsMostProfitableAction,
  fetchDashboardInvestmentsProgramsAction
} from "pages/dashboard/actions/dashboard.actions";
import DashboardBlock from "pages/dashboard/components/dashboard-block/dashboard-block";
import DashboardInvestingMostProfitable from "pages/dashboard/components/dashboard-investing/dashboard-most-profitable";
import { dashboardInvestmentsMostProfitableItemsSelector } from "pages/dashboard/reducers/dashboard-investments-most-profitable.reducer";
import React, { useCallback, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

const _DashboardInvestingMostProfitableContainer: React.FC = () => {
  const { updateData } = useContext(DataStorageContext);
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
    updateData();
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
