import { DataStorageContext } from "components/data-storage/data-storage";
import useApiRequest, { DEFAULT_INTERVAL } from "hooks/api-request.hook";
import DashboardBlock from "pages/dashboard/components/dashboard-block/dashboard-block";
import DashboardFollowThem from "pages/dashboard/components/dashboard-trading/dashboard-follow-them";
import { getFollowThem } from "pages/dashboard/services/dashboard.service";
import React, { useCallback, useContext } from "react";
import { useTranslation } from "react-i18next";

const _DashboardFollowThemContainer: React.FC<Props> = () => {
  const { updateData } = useContext(DataStorageContext);
  const [t] = useTranslation();
  const { data, sendRequest } = useApiRequest({
    interval: DEFAULT_INTERVAL,
    name: "DashboardFollowThemContainer",
    cache: true,
    request: getFollowThem,
    fetchOnMount: true
  });
  const handleUpdateItems = useCallback(() => {
    updateData();
    sendRequest();
  }, []);
  return (
    <DashboardBlock label={t("dashboard-page:trading.follow-them")}>
      <DashboardFollowThem
        loaderData={[]}
        data={data?.items!}
        onApply={handleUpdateItems}
      />
    </DashboardBlock>
  );
};

interface Props {}

const DashboardFollowThemContainer = React.memo(_DashboardFollowThemContainer);
export default DashboardFollowThemContainer;
