import { DataStorageContext } from "hooks/data-storage";
import { fetchDashboardFollowThemAction } from "pages/dashboard/actions/dashboard.actions";
import DashboardBlock from "pages/dashboard/components/dashboard-block/dashboard-block";
import DashboardFollowThem from "pages/dashboard/components/dashboard-trading/dashboard-follow-them";
import { dashboardTradingFollowThemItemsSelector } from "pages/dashboard/reducers/dashboard-trading-follow-them.reducer";
import React, { useCallback, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

const _DashboardFollowThemContainer: React.FC<Props> = () => {
  const { updateData } = useContext(DataStorageContext);
  const dispatch = useDispatch();
  const [t] = useTranslation();
  const data = useSelector(dashboardTradingFollowThemItemsSelector);
  useEffect(() => {
    dispatch(fetchDashboardFollowThemAction());
  }, []);
  const handleUpdateItems = useCallback(() => {
    updateData();
    dispatch(fetchDashboardFollowThemAction());
  }, []);
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
