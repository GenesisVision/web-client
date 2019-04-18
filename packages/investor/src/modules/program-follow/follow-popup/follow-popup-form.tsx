import "./follow-popup.scss";

import { CopyTradingAccountInfo, WalletData } from "gv-api-web";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { ResponseError, SetSubmittingType } from "shared/utils/types";

import FollowCreateAccount from "./follow-popup-create-account";
import FollowParams from "./follow-popup-params";
import FollowTop from "./follow-popup-top";

class FollowForm extends React.PureComponent<
  Props & InjectedTranslateProps,
  State
> {
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
    if (this.props.hasSignalAccount) this.setState({ step: TABS.PARAMS });
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
    const {
      wallets,
      currency,
      programName,
      hasSignalAccount,
      minDeposit
    } = this.props;
    const { errors, step } = this.state;
    const adaptStep =
      step === TABS.CREATE_ACCOUNT ? "create-account" : "params";
    return (
      <>
        <FollowTop programName={programName} step={adaptStep} />
        {!hasSignalAccount && step === TABS.CREATE_ACCOUNT && (
          <FollowCreateAccount
            minDeposit={minDeposit}
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
      </>
    );
  }
}

enum TABS {
  CREATE_ACCOUNT = "CREATE_ACCOUNT",
  PARAMS = "PARAMS"
}
export interface Props {
  minDeposit: number;
  hasSignalAccount: boolean;
  alertSuccess: (msg: string) => void;
  alertError: (msg: string) => void;
  handleSubmit: () => void;
  submitMethod: (
    programId: string,
    requestParams: IRequestParams
  ) => Promise<any>;
  id: string;
  accounts: CopyTradingAccountInfo[];
  wallets: WalletData[];
  currency: string;
  programName: string;
}

interface State {
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

export default translate()(FollowForm);
