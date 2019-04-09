import "./follow-popup.scss";

import { CopyTradingAccountInfo, WalletData, WalletInfo } from "gv-api-web";
import * as React from "react";
import { Fragment } from "react";
import { TranslationFunction, translate } from "react-i18next";
import { ResponseError, SetSubmittingType } from "shared/utils/types";

import FollowCreateAccount from "./follow-popup-create-account";
import FollowParams from "./follow-popup-params";
import FollowTop from "./follow-popup-top";

enum TABS {
  CREATE_ACCOUNT = "CREATE_ACCOUNT",
  PARAMS = "PARAMS"
}
export interface IFollowFormProps {
  alertSuccess: (msg: string) => void;
  alertError: (msg: string) => void;
  handleSubmit: () => void;
  submitMethod: (
    programId: string,
    requestParams: IRequestParams
  ) => Promise<any>;
  id: string;
  signalAccounts: CopyTradingAccountInfo[];
  wallets: WalletData[];
  currency: string;
  programName: string;
  t: TranslationFunction;
}
interface IFollowFormState {
  step: TABS;
  requestParams: IRequestParams;
  errors: { code: string; errorMessage: string };
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
    step: TABS.CREATE_ACCOUNT,
    errors: { code: "", errorMessage: "" }
  };
  createdCopytradingAccount = (values: IRequestParams) => {
    this.setState({
      step: TABS.PARAMS,
      requestParams: { ...this.state.requestParams, ...values }
    });
  };
  returnToCreateCopytradingAccount = () => {
    this.setState({ step: TABS.CREATE_ACCOUNT });
  };
  componentDidMount() {
    const { signalAccounts, currency } = this.props;
    const signalAccount =
      signalAccounts &&
      signalAccounts.find((account: any) => account.currency === currency);
    if (signalAccount) this.setState({ step: TABS.PARAMS });
  }
  submit = (values: IRequestParams, setSubmitting: SetSubmittingType) => {
    const { t, handleSubmit, id, alertError, alertSuccess } = this.props;
    let requestParams = { ...this.state.requestParams, ...values };
    this.setState({
      requestParams
    });
    this.props
      .submitMethod(id, this.state.requestParams)
      .then(() => {
        alertSuccess(t("follow-program.success-alert-message"));
        handleSubmit();
      })
      .catch((errors: ResponseError) => {
        alertError(errors.errorMessage);
        setSubmitting(false);
      });
  };
  render() {
    const { signalAccounts, wallets, currency, programName } = this.props;
    const { errors, step } = this.state;
    const adaptStep =
      step === TABS.CREATE_ACCOUNT ? "create-account" : "params";
    return (
      <Fragment>
        <FollowTop programName={programName} step={adaptStep} />
        {!signalAccounts && step === TABS.CREATE_ACCOUNT && (
          <FollowCreateAccount
            wallets={wallets}
            currency={currency}
            onClick={this.createdCopytradingAccount}
          />
        )}
        {step === TABS.PARAMS && (
          <FollowParams
            onSubmit={this.submit}
            onPrevStep={this.returnToCreateCopytradingAccount}
          />
        )}
        {errors.errorMessage && (
          <div className="follow-popup__errors">{errors.errorMessage}</div>
        )}
      </Fragment>
    );
  }
}

export default translate()(FollowForm);
