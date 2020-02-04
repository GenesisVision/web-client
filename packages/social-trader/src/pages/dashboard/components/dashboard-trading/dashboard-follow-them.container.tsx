import {
  fetchDashboardFollowThemAction,
  fetchDashboardTradingTotalAction
} from "pages/dashboard/actions/dashboard.actions";
import DashboardBlock from "pages/dashboard/components/dashboard-block/dashboard-block";
import DashboardFollowThem from "pages/dashboard/components/dashboard-trading/dashboard-follow-them";
import { dashboardTradingFollowThemItemsSelector } from "pages/dashboard/reducers/dashboard-trading-follow-them.reducer";
import React, { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { currencySelector } from "reducers/account-settings-reducer";

const _DashboardFollowThemContainer: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const currency = useSelector(currencySelector);
  const [t] = useTranslation();
  const data = useSelector(dashboardTradingFollowThemItemsSelector);
  useEffect(() => {
    dispatch(fetchDashboardFollowThemAction());
  }, []);
  const handleUpdateItems = useCallback(() => {
    dispatch(fetchDashboardTradingTotalAction(currency));
    dispatch(fetchDashboardFollowThemAction());
  }, [currency]);
  return (
    <DashboardBlock label={t("dashboard-page.trading.follow-them")}>
      <DashboardFollowThem
        loaderData={[]}
        data={data!}
        onApply={handleUpdateItems}
      />
    </DashboardBlock>
  );
};

interface Props {}

const DashboardFollowThemContainer = React.memo(_DashboardFollowThemContainer);
export default DashboardFollowThemContainer;
