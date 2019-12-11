import { DashboardTradingAsset } from "gv-api-web";
import DashboardInvestingTable from "pages/dashboard/components/dashboard-investing/dashboard-investing-table";
import DashboardPublicCard from "pages/dashboard/components/dashboard-trading/dashboard-public-card";
import { getInvestingMostProfitable } from "pages/dashboard/services/dashboard.service";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { currencySelector } from "reducers/account-settings-reducer";

const _DashboardInvestingMostProfitable: React.FC = () => {
  const currency = useSelector(currencySelector);
  const [t] = useTranslation();
  return (
    <DashboardInvestingTable
      getItems={getInvestingMostProfitable(currency)}
      title={t("dashboard-page.investing.most-profitable")}
      renderBodyCard={(
        asset: DashboardTradingAsset,
        updateRow,
        updateItems
      ) => (
        <DashboardPublicCard
          showActions={false}
          updateItems={updateItems!}
          asset={asset}
        />
      )}
    />
  );
};

const DashboardInvestingMostProfitable = React.memo(
  _DashboardInvestingMostProfitable
);
export default DashboardInvestingMostProfitable;
