import { ExchangeAssetItemsViewModel } from "gv-api-web";
import useApiRequest from "hooks/api-request.hook";
import { AccountSelector } from "pages/trade/binance-trade-page/trading/components/account-selector/account-selector";
import React from "react";
import { useSelector } from "react-redux";
import { isAuthenticatedSelector } from "reducers/auth-reducer";
import { api } from "services/api-client/swagger-custom-client";

export interface IAccountSelectorProps {
  currentAccount?: string;
}

const _AccountSelectorContainer: React.FC<IAccountSelectorProps> = ({
  currentAccount
}) => {
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const { data } = useApiRequest<ExchangeAssetItemsViewModel>({
    request: () => api.dashboard().getExchangeAccountsCredentials(),
    fetchOnMount: isAuthenticated
  });

  if (!isAuthenticated || !data || data.total < 2) return null;
  return <AccountSelector items={data.items} currentAccount={currentAccount} />;
};

export const AccountSelectorContainer = React.memo(_AccountSelectorContainer);
