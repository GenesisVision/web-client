import { DataStorageContextProvider } from "components/data-storage/data-storage";
import { useAccountCurrency } from "hooks/account-currency.hook";
import { getTotalInvestingStatistic } from "pages/dashboard/services/dashboard.service";
import React from "react";

export const DashboardInvestingContext: React.FC = ({ children }) => {
  const currency = useAccountCurrency();
  return (
    <DataStorageContextProvider
      name={"DashboardInvestingContext"}
      request={getTotalInvestingStatistic}
      fetchOnMountData={{ currency }}
    >
      {children}
    </DataStorageContextProvider>
  );
};
