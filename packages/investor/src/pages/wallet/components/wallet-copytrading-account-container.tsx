import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router";
import NotFoundPage from "shared/components/not-found/not-found";
import WalletLoader from "shared/components/wallet/components/wallet-loader";
import useApiRequest from "shared/hooks/api-request.hook";

import { fetchWalletCopytradingAccount } from "../services/wallet-copytrading.service";
import WalletCopytradingAccount from "./wallet-copytrading-account";

const _WalletCopytradingAccountContainer: React.FC<Props> = ({ match }) => {
  const { errorMessage, data: account, sendRequest } = useApiRequest({
    request: fetchWalletCopytradingAccount
  });
  useEffect(() => {
    sendRequest(match.params.currency);
  }, []);
  if (!!errorMessage) return <NotFoundPage />;
  return (
    <WalletCopytradingAccount
      account={account!}
      condition={!!account}
      loader={<WalletLoader />}
    />
  );
};

interface Props extends RouteComponentProps<{ currency: string }> {}

const WalletCopytradingAccountContainer = React.memo(
  _WalletCopytradingAccountContainer
);
export default WalletCopytradingAccountContainer;
