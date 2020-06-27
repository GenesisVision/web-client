import { useAccountCurrency } from "hooks/account-currency.hook";
import { DataStorageContextProvider } from "hooks/data-storage";
import { getTotalInvestingStatistic } from "pages/dashboard/services/dashboard.service";
import React from "react";

export const DashboardInvestingContext: React.FC = ({ children }) => {
  const currency = useAccountCurrency();
  return (
    <DataStorageContextProvider
      request={getTotalInvestingStatistic}
      fetchOnMountData={{ currency }}
    >
      {children}
    </DataStorageContextProvider>
  );
};
