import { FollowDetailsList } from "gv-api-web";
import useApiRequest from "hooks/api-request.hook";
import DashboardBlock from "pages/dashboard/components/dashboard-block/dashboard-block";
import DashboardFollowThem from "pages/dashboard/components/dashboard-trading/dashboard-follow-them";
import { getFollowThem } from "pages/dashboard/services/dashboard.service";
import React from "react";
import { useTranslation } from "react-i18next";

const _DashboardFollowThemContainer: React.FC<Props> = () => {
  const [t] = useTranslation();
  const { data } = useApiRequest<FollowDetailsList[]>({
    fetchOnMount: true,
    request: getFollowThem
  });
  if (!data) return null;
  return (
    <DashboardBlock label={t("dashboard-page.trading.follow-them")}>
      <DashboardFollowThem loaderData={[]} data={data!} />
    </DashboardBlock>
  );
};

interface Props {}

const DashboardFollowThemContainer = React.memo(_DashboardFollowThemContainer);
export default DashboardFollowThemContainer;
