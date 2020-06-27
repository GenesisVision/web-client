import { useAccountCurrency } from "hooks/account-currency.hook";
import { DataStorageContextProvider } from "hooks/data-storage";
import { fetchTradingTotalStatistic } from "pages/dashboard/services/dashboard.service";
import React from "react";

export const DashboardTradingContext: React.FC = ({ children }) => {
  const currency = useAccountCurrency();
  return (
    <DataStorageContextProvider
      request={fetchTradingTotalStatistic}
      fetchOnMountData={{ currency }}
    >
      {children}
    </DataStorageContextProvider>
  );
};
