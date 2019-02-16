import * as React from "react";
import { Fragment } from "react";

import FollowCreateAccount from "./follow-popup-create-account";
import FollowParams from "./follow-popup-params";
import { WalletData, WalletInfo } from "gv-api-web";
import { attachToSignal } from "../services/program-follow-service";

enum TABS {
  CREATE_ACCOUNT = "CREATE_ACCOUNT",
  PARAMS = "PARAMS"
}
export interface IFollowFormProps {
  id: string;
  signalAccounts: any;
  wallets: WalletData[];
  walletsAddresses: WalletInfo[];
  currency: string;
}
interface IFollowFormState {
  step: TABS;
  requestParams: IRequestParams;
}
export interface IRequestParams {
  mode?: string;
  percent?: number;
  openTolerancePercent?: number;
  fixedVolume?: number;
  fixedCurrency?: string;
  initialDepositCurrency?: string;
  initialDepositAmount?: number;
}
class FollowForm extends React.Component<IFollowFormProps, IFollowFormState> {
  state = {
    requestParams: {},
    step: TABS.CREATE_ACCOUNT
  };
  createdCopytradingAccount = (values: IRequestParams) => {
    this.setState({
      step: TABS.PARAMS,
      requestParams: { ...this.state.requestParams, ...values }
    });
  };
  componentDidMount() {
    const { signalAccounts, currency } = this.props;
    const signalAccount =
      signalAccounts &&
      signalAccounts.data.find((account: any) => account.currency === currency);
    if (signalAccount) this.setState({ step: TABS.PARAMS });
  }
  submit = (values: IRequestParams) => {
    this.setState(
      {
        requestParams: { ...this.state.requestParams, ...values }
      },
      () =>
        attachToSignal(this.props.id, this.state.requestParams).then(
          (res: any) => {
            console.log(res);
          }
        )
    );
  };
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
