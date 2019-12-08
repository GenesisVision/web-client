import { FundInvestingDetailsList } from "gv-api-web";
import DashboardFundCard from "pages/dashboard/components/dashboard-investing/dashboard-fund-card";
import DashboardInvestingTable from "pages/dashboard/components/dashboard-investing/dashboard-investing-table";
import { TitleContext } from "pages/dashboard/dashboard.constants";
import { getInvestingFunds } from "pages/dashboard/services/dashboard.service";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { currencySelector } from "reducers/account-settings-reducer";

const _DashboardInvestingFunds: React.FC = () => {
  const [t] = useTranslation();
  const title = useContext(TitleContext);
  const currency = useSelector(currencySelector);
  return (
    <DashboardInvestingTable
      getItems={getInvestingFunds(currency)}
      title={t("dashboard-page.investing.funds")}
      renderBodyCard={(
        fund: FundInvestingDetailsList,
        updateRow,
        updateItems
      ) => (
        <DashboardFundCard
          updateRow={updateRow}
          updateItems={updateItems!}
          title={title}
          fund={fund}
        />
      )}
    />
  );
};

const DashboardInvestingFunds = React.memo(_DashboardInvestingFunds);
export default DashboardInvestingFunds;
