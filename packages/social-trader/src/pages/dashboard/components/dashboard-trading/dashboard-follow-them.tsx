import { FollowDetailsList } from "gv-api-web";
import FollowCard from "modules/follows-table/components/follow-card";
import DashboardTradingTable from "pages/dashboard/components/dashboard-trading/dashboard-trading-table";
import { getFollowThem } from "pages/dashboard/services/dashboard.service";
import React from "react";
import { useTranslation } from "react-i18next";

const _DashboardFollowThem: React.FC<Props> = () => {
  const [t] = useTranslation();
  return (
    <DashboardTradingTable
      getItems={getFollowThem}
      title={t("dashboard-page.trading.follow-them")}
      renderBodyCard={(asset: FollowDetailsList) => (
        <FollowCard follow={asset} title={""} />
      )}
    />
  );
};

interface Props {}

const DashboardFollowThem = React.memo(_DashboardFollowThem);
export default DashboardFollowThem;
