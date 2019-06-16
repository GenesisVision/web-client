import { CopyTradingAccountInfo } from "gv-api-web";
import * as React from "react";
import { RouteComponentProps } from "react-router";
import NotFoundPage from "shared/components/not-found/not-found";
import WalletLoader from "shared/components/wallet/components/wallet-loader";

import { fetchWalletCopytradingAccount } from "../services/wallet-copytrading.service";
import WalletCopytradingAccount from "./wallet-copytrading-account";

class WalletCopytradingAccountContainer extends React.PureComponent<
  Props,
  State
> {
  state = {
    account: undefined,
    isPending: false,
    hasError: false
  };

  componentDidMount() {
    this.setState({ isPending: true });

    fetchWalletCopytradingAccount(this.props.match.params.currency)
      .then(data => {
        if (!data) {
          this.setState({ hasError: true, isPending: false });
        } else {
          this.setState({ account: data });
        }
      })
      .catch(() => this.setState({ isPending: false }));
  }

  render() {
    const { account, hasError } = this.state;
    if (hasError) return <NotFoundPage />;
    return (
      <WalletCopytradingAccount
        account={account!}
        condition={!!account}
        loader={<WalletLoader />}
      />
    );
  }
}

interface OwnProps extends RouteComponentProps<{ currency: string }> {}

interface Props extends OwnProps {}
interface State {
  account?: CopyTradingAccountInfo;
  isPending: boolean;
  hasError: boolean;
}
export default WalletCopytradingAccountContainer;
