import "./follow-popup.scss";

import {
  AttachToSignalProvider,
  AttachToSignalProviderFixedCurrencyEnum,
  AttachToSignalProviderInitialDepositCurrencyEnum,
  AttachToSignalProviderModeEnum,
  SignalSubscription,
  WalletData
} from "gv-api-web";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import withLoader from "shared/decorators/with-loader";
import { CurrencyEnum, SetSubmittingType } from "shared/utils/types";

import FollowCreateAccount, {
  CreateAccountFormValues
} from "./follow-popup-create-account";
import FollowParams, { FollowParamsFormValues } from "./follow-popup-params";
import FollowTop from "./follow-popup-top";

class FollowForm extends React.PureComponent<
  Props & InjectedTranslateProps,
  State
> {
  state = {
    requestParams: {
      mode: "ByBalance" as AttachToSignalProviderModeEnum,
      percent: 10,
      openTolerancePercent: 0.5,
      fixedVolume: 100,
      fixedCurrency: "USD" as AttachToSignalProviderFixedCurrencyEnum,
      initialDepositCurrency: "GVT" as AttachToSignalProviderInitialDepositCurrencyEnum,
      initialDepositAmount: 0
    },
    step: TABS.CREATE_ACCOUNT,
    errors: { code: "", errorMessage: "" }
  };
  createdCopytradingAccount = ({
    initialDepositCurrency,
    initialDepositAmount
  }: CreateAccountFormValues) => {
    this.setState({
      step: TABS.PARAMS,
      requestParams: {
        ...this.state.requestParams,
        initialDepositCurrency,
        initialDepositAmount
      }
    });
  };
  returnToCreateCopytradingAccount = () => {
    this.setState({ step: TABS.CREATE_ACCOUNT });
  };
  componentDidMount() {
    if (this.props.signalSubscription.hasSignalAccount)
      this.setState({ step: TABS.PARAMS });
  }
  submit = (
    {
      mode,
      openTolerancePercent,
      percent,
      fixedVolume
    }: FollowParamsFormValues,
    setSubmitting: SetSubmittingType
  ) => {
    const { id } = this.props;
    let requestParams = {
      ...this.state.requestParams,
      mode,
      openTolerancePercent,
      percent,
      fixedVolume
    };
    this.setState({
      requestParams
    });
    this.props.submitMethod(id, this.state.requestParams, setSubmitting);
  };
  render() {
    const {
      wallets,
      currency,
      signalSubscription,
      minDeposit,
      rate
    } = this.props;
    const { errors, step } = this.state;
    const adaptStep =
      step === TABS.CREATE_ACCOUNT ? "create-account" : "params";
    const paramsSubscription = signalSubscription.hasActiveSubscription
      ? signalSubscription
      : undefined;
    return (
      <>
        <FollowTop step={adaptStep} />
        {!signalSubscription.hasSignalAccount &&
          step === TABS.CREATE_ACCOUNT && (
            <FollowCreateAccount
              minDeposit={minDeposit}
              wallets={wallets}
              currency={currency}
              onClick={this.createdCopytradingAccount}
            />
          )}
        {step === TABS.PARAMS && (
          <FollowParams
            rate={rate}
            currency={currency}
            isShowBack={!signalSubscription.hasSignalAccount}
            paramsSubscription={paramsSubscription}
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
  rate: number;
  minDeposit: number;
  signalSubscription: SignalSubscription;
  submitMethod: (
    programId: string,
    requestParams: AttachToSignalProvider,
    setSubmitting: SetSubmittingType
  ) => void;
  id: string;
  wallets: WalletData[];
  currency: CurrencyEnum;
}

interface State {
  step: TABS;
  requestParams: AttachToSignalProvider;
  errors: { code: string; errorMessage: string };
}

export default withLoader(translate()(FollowForm));
