import useApiRequest from "hooks/api-request.hook";
import { DataStorageContext } from "hooks/data-storage";
import DashboardBlock from "pages/dashboard/components/dashboard-block/dashboard-block";
import DashboardFollowThem from "pages/dashboard/components/dashboard-trading/dashboard-follow-them";
import { getFollowThem } from "pages/dashboard/services/dashboard.service";
import React, { useCallback, useContext } from "react";
import { useTranslation } from "react-i18next";

const _DashboardFollowThemContainer: React.FC<Props> = () => {
  const { updateData } = useContext(DataStorageContext);
  const [t] = useTranslation();
  const { data, sendRequest } = useApiRequest({
    request: getFollowThem,
    fetchOnMount: true
  });
  const handleUpdateItems = useCallback(() => {
    updateData();
    sendRequest();
  }, []);
  return (
    <DashboardBlock label={t("dashboard-page.trading.follow-them")}>
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
