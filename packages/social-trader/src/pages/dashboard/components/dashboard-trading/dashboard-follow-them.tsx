import { ProgramDetailsFull } from "gv-api-web";
import DashboardTradingTable from "pages/dashboard/components/dashboard-trading/dashboard-trading-table";
import { TAsset } from "pages/dashboard/dashboard.types";
import { getFollowThem } from "pages/dashboard/services/dashboard.service";
import React from "react";
import { useTranslation } from "react-i18next";
import FollowCard from "shared/modules/follows-table/components/follow-card";

const _DashboardFollowThem: React.FC<Props> = () => {
  const [t] = useTranslation();
  return (
    <DashboardTradingTable
      getItems={getFollowThem}
      title={t("dashboard-page.trading.follow-them")}
      renderBodyCard={(asset: TAsset) => (
        <FollowCard
          follow={(asset as unknown) as ProgramDetailsFull}
          toggleFavorite={() => {}}
          title={""}
        />
      )}
    />
  );
};

interface Props {}

const DashboardFollowThem = React.memo(_DashboardFollowThem);
export default DashboardFollowThem;
