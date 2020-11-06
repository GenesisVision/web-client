import { DataStorageContextProvider } from "components/data-storage/data-storage";
import { useAccountCurrency } from "hooks/account-currency.hook";
import { DEFAULT_INTERVAL } from "hooks/api-request.hook";
import { fetchTradingTotalStatistic } from "pages/dashboard/services/dashboard.service";
import React from "react";

export const DashboardTradingContext: React.FC = ({ children }) => {
  const currency = useAccountCurrency();
  return (
    <DataStorageContextProvider
      interval={DEFAULT_INTERVAL}
      name={"DashboardTradingContext"}
      request={fetchTradingTotalStatistic}
      fetchOnMountData={{ currency }}
    >
      {children}
    </DataStorageContextProvider>
  );
};
