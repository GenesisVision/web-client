import { DataStorageContextProvider } from "components/data-storage/data-storage";
import { useAccountCurrency } from "hooks/account-currency.hook";
import { DEFAULT_INTERVAL } from "hooks/api-request.hook";
import { getTotalInvestingStatistic } from "pages/dashboard/services/dashboard.service";
import React from "react";

export const DashboardInvestingContext: React.FC = ({ children }) => {
  const currency = useAccountCurrency();
  return (
    <DataStorageContextProvider
      interval={DEFAULT_INTERVAL}
      name={"DashboardInvestingContext"}
      request={getTotalInvestingStatistic}
      fetchOnMountData={{ currency }}
    >
      {children}
    </DataStorageContextProvider>
  );
};
