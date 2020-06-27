import { DataStorageContext } from "components/data-storage/data-storage";
import DashboardBlock from "pages/dashboard/components/dashboard-block/dashboard-block";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";

import { getTradingStatisticLoaderData } from "../../dashboard.loaders-data";
import DashboardTradingTotal from "./dashboard-trading-total";

const _DashboardTradingTotalContainer: React.FC = () => {
  const [t] = useTranslation();
  const { data } = useContext(DataStorageContext);
  return (
    <DashboardBlock label={t("dashboard-page:trading.title")}>
      <DashboardTradingTotal
        loaderData={getTradingStatisticLoaderData()}
        data={data!}
      />
    </DashboardBlock>
  );
};

const DashboardTradingTotalContainer = React.memo(
  _DashboardTradingTotalContainer
);
export default DashboardTradingTotalContainer;
