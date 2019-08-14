import { FundWithdrawInfo, WalletBaseData } from "gv-api-web";
import * as React from "react";
import { DialogLoader } from "shared/components/dialog/dialog-loader/dialog-loader";
import { ISelectChangeEvent } from "shared/components/select/select";
import { rateApi } from "shared/services/api-client/rate-api";
import { convertFromCurrency } from "shared/utils/currency-converter";
import {
  CurrencyEnum,
  ResponseError,
  SetSubmittingType
} from "shared/utils/types";

import FundWithdrawAmountForm, {
  FUND_WITHDRAW_FIELDS,
  FundWithDrawFormValues
} from "./fund-withdraw-amount-form";
import FundWithdrawConfirmForm from "./fund-withdraw-confirm-form";
import FundWithdrawTop from "./fund-withdraw-top";
import {
  FundWithdraw,
  FundWithdrawalInfoResponse
} from "./fund-withdraw.types";

enum FUND_WITHDRAW_FORM {
  ENTER_AMOUNT = "ENTER_AMOUNT",
  CONFIRM = "CONFIRM"
}

class FundWithdrawPopup extends React.PureComponent<
  IFundWithdrawPopupProps,
  State
> {
  state: State = {
    step: FUND_WITHDRAW_FORM.ENTER_AMOUNT,
    rate: 1,
    withdrawalInfo: undefined,
    wallets: undefined,
    errorMessage: undefined,
    wallet: undefined,
    percent: undefined
  };

  componentDidMount() {
    const { fetchInfo, accountCurrency } = this.props;
    fetchInfo()
      .then(data => {
        const { wallets, withdrawalInfo } = data;
        const wallet =
          wallets.find(x => x.currency === accountCurrency) || wallets[0];
        this.setState({
          wallets,
          wallet,
          withdrawalInfo
        });
        this.fetchRate(wallet.currency);
      })
      .catch((e: ResponseError) =>
        this.setState({ errorMessage: e.errorMessage })
      );
  }

  fetchRate = (currencyFrom: string): void => {
    rateApi.v10RateByFromByToGet("GVT", currencyFrom).then(rate => {
      this.setState({ rate });
    });
  };

  handleSubmit = (setSubmitting: SetSubmittingType) => {
    const { withdraw } = this.props;
    const { percent, wallet } = this.state;

    if (!percent || !wallet) return;
    return withdraw({
      percent: percent,
      currency: wallet.currency
    }).catch((e: ResponseError) => {
      this.setState({ errorMessage: e.errorMessage });
      setSubmitting(false);
    });
  };

  handleEnterAmountSubmit = ({ percent, walletId }: FundWithDrawFormValues) => {
    this.setState({
      wallet: this.state.wallets!.find(wallet => wallet.id === walletId),
      step: FUND_WITHDRAW_FORM.CONFIRM,
      percent: percent || 0
    });
  };

  goToEnterAmountStep = () => {
    this.setState({
      step: FUND_WITHDRAW_FORM.ENTER_AMOUNT,
      errorMessage: undefined
    });
  };

  handleWalletChange = (setFieldValue: Function) => (
    _: ISelectChangeEvent,
    target: JSX.Element
  ) => {
    const { wallets } = this.state;
    setFieldValue(FUND_WITHDRAW_FIELDS.walletId, target.props.value);
    const wallet = wallets!.find(x => x.id === target.props.value)!;
    this.fetchRate(wallet.currency);
    this.setState({ wallet });
  };

  render() {
    const {
      withdrawalInfo,
      wallets,
      wallet,
      rate,
      percent,
      errorMessage,
      step
    } = this.state;

    if (!withdrawalInfo || !wallets || !wallet) return <DialogLoader />;
    const availableToWithdraw = convertFromCurrency(
      withdrawalInfo.availableToWithdraw,
      rate
    );
    return (
      <>
        <FundWithdrawTop
          title={withdrawalInfo.title}
          availableToWithdraw={availableToWithdraw}
          currency={wallet.currency}
        />
        <div className="dialog__bottom">
          {step === FUND_WITHDRAW_FORM.ENTER_AMOUNT && (
            <FundWithdrawAmountForm
              changeWalletHandle={this.handleWalletChange}
              wallets={wallets}
              wallet={wallet}
              availableToWithdraw={availableToWithdraw}
              exitFee={withdrawalInfo.exitFee}
              percent={percent}
              onSubmit={this.handleEnterAmountSubmit}
            />
          )}
          {step === FUND_WITHDRAW_FORM.CONFIRM && percent && (
            <FundWithdrawConfirmForm
              errorMessage={errorMessage}
              availableToWithdraw={availableToWithdraw}
              percent={percent}
              currency={wallet.currency}
              exitFee={withdrawalInfo.exitFee}
              onSubmit={this.handleSubmit}
              onBackClick={this.goToEnterAmountStep}
            />
          )}
        </div>
      </>
    );
  }
}

export default FundWithdrawPopup;

export interface IFundWithdrawPopupProps {
  accountCurrency: CurrencyEnum;
  fetchInfo(): Promise<FundWithdrawalInfoResponse>;
  withdraw(value: FundWithdraw): Promise<void>;
}

interface State {
  withdrawalInfo?: FundWithdrawInfo;
  wallets?: WalletBaseData[];
  errorMessage?: string;
  step: FUND_WITHDRAW_FORM;
  rate: number;
  wallet?: WalletBaseData;
  percent?: number;
}
