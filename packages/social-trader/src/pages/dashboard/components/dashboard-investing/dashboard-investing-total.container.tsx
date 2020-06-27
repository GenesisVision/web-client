import { DataStorageContext } from "components/data-storage/data-storage";
import DashboardBlock from "pages/dashboard/components/dashboard-block/dashboard-block";
import DashboardInvestingTotal from "pages/dashboard/components/dashboard-investing/dashboard-investing-total";
import { getTotalLoaderData } from "pages/dashboard/dashboard.loaders-data";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";

const _DashboardInvestingTotalContainer: React.FC = () => {
  const [t] = useTranslation();
  const title = t("dashboard-page:investing.title");
  const { data } = useContext(DataStorageContext);
  return (
    <DashboardBlock label={title}>
      <DashboardInvestingTotal loaderData={getTotalLoaderData()} data={data!} />
    </DashboardBlock>
  );
};

const DashboardInvestingTotalContainer = React.memo(
  _DashboardInvestingTotalContainer
);
export default DashboardInvestingTotalContainer;
