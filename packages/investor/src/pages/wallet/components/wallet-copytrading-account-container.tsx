import { CopyTradingAccountInfo } from "gv-api-web";
import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import NotFoundPage from "shared/components/not-found/not-found";
import WalletLoader from "shared/components/wallet/components/wallet-loader";
import useIsOpen from "shared/hooks/is-open.hook";

import { fetchWalletCopytradingAccount } from "../services/wallet-copytrading.service";
import WalletCopytradingAccount from "./wallet-copytrading-account";

const _WalletCopytradingAccountContainer: React.FC<Props> = ({ match }) => {
  const [account, setAccount] = useState<CopyTradingAccountInfo | undefined>(
    undefined
  );
  const [hasError, setHasError] = useIsOpen();
  useEffect(
    () => {
      fetchWalletCopytradingAccount(match.params.currency)
        .then(data => {
          if (!data) throw "";
          return data;
        })
        .then(setAccount)
        .catch(setHasError);
    },
    [match.params.currency, setHasError]
  );
  if (hasError) return <NotFoundPage />;
  return (
    <WalletCopytradingAccount
      account={account!}
      condition={!!account}
      loader={<WalletLoader />}
    />
  );
};

interface OwnProps extends RouteComponentProps<{ currency: string }> {}

interface Props extends OwnProps {}

const WalletCopytradingAccountContainer = React.memo(
  _WalletCopytradingAccountContainer
);
export default WalletCopytradingAccountContainer;
