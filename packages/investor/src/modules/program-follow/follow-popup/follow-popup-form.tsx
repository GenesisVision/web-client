import * as React from "react";
import { Fragment } from "react";

import FollowCreateAccount from "./follow-popup-create-account";
import FollowParams from "./follow-popup-params";
import { WalletData, WalletInfo } from "gv-api-web";

enum TABS {
  CREATE_ACCOUNT = "CREATE_ACCOUNT",
  PARAMS = "PARAMS"
}
export interface IFollowFormProps {
  signalAccounts: any;
  wallets: WalletData[];
  walletsAddresses: WalletInfo[];
  currency: string;
}
interface IFollowFormState {
  step: TABS;
}
class FollowForm extends React.Component<IFollowFormProps, IFollowFormState> {
  state = {
    step: TABS.CREATE_ACCOUNT
  };
  createdCopytradingAccount = () => {
    this.setState({ step: TABS.PARAMS });
  };
  componentDidMount() {
    if (this.props.signalAccounts) this.setState({ step: TABS.PARAMS });
  }
  submit = () => {};
  render() {
    const { signalAccounts, wallets, walletsAddresses, currency } = this.props;
    return (
      <Fragment>
        {!signalAccounts && this.state.step === TABS.CREATE_ACCOUNT && (
          <FollowCreateAccount
            wallets={wallets}
            walletsAddresses={walletsAddresses}
            currency={currency}
            onClick={this.createdCopytradingAccount}
          />
        )}
        {this.state.step === TABS.PARAMS && (
          <FollowParams onClick={this.submit} />
        )}
      </Fragment>
    );
  }
}

export default FollowForm;
