import { FundWithdrawInfo, WalletData } from "gv-api-web";
import {
  FundWithdraw,
  FundWithdrawalInfoResponse
} from "modules/fund-withdrawal/services/fund-withdrawal.services";
import React, { Component, Fragment } from "react";
import { convertFromCurrency } from "shared/utils/currency-converter";
import { ResponseError } from "shared/utils/types";

import FundWithdrawAmountForm from "./fund-withdraw-amount-form";
import FundWithdrawConfirmForm from "./fund-withdraw-confirm-form";
import FundWithdrawTop from "./fund-withdraw-top";
import FundWithdrawWallet from "./fund-withdraw-wallet";

enum FUND_WITHDRAW_FORM {
  ENTER_AMOUNT = "ENTER_AMOUNT",
  CONFIRM = "CONFIRM"
}

export interface IFundWithdrawPopupProps {
  accountCurrency: string;
  fetchInfo(): Promise<FundWithdrawalInfoResponse>;
  withdraw(value: FundWithdraw): Promise<void>;
}

interface IFundWithdrawPopupState {
  withdrawalInfo?: FundWithdrawInfo;
  wallets?: WalletData[];
  isPending: boolean;
  errorMessage?: string;
  step: FUND_WITHDRAW_FORM;

  wallet?: WalletData;
  percent?: number;
}

class FundWithdrawPopup extends Component<
  IFundWithdrawPopupProps,
  IFundWithdrawPopupState
> {
  constructor(props: IFundWithdrawPopupProps) {
    super(props);
    this.state = {
      withdrawalInfo: undefined,
      wallets: undefined,
      isPending: false,
      errorMessage: undefined,
      step: FUND_WITHDRAW_FORM.ENTER_AMOUNT,

      wallet: undefined,
      percent: undefined
    };
  }

  componentDidMount() {
    const { fetchInfo, accountCurrency } = this.props;
    this.setState({ isPending: true });
    fetchInfo()
      .then(data => {
        const { wallets, withdrawalInfo } = data;
        const wallet =
          wallets.find(x => x.currency === accountCurrency) || wallets[0];
        this.setState({ wallets, wallet, withdrawalInfo, isPending: false });
      })
      .catch((e: ResponseError) =>
        this.setState({ errorMessage: e.errorMessage, isPending: false })
      );
  }

  handleSubmit = () => {
    const { withdraw } = this.props;
    const { percent, wallet } = this.state;
    this.setState({ isPending: true });

    if (!percent || !wallet) return;
    return withdraw({
      percent: percent,
      currency: wallet.currency
    }).catch((e: ResponseError) => {
      this.setState({ isPending: false, errorMessage: e.errorMessage });
    });
  };

  handleEnterAmountSubmit = (percent?: number) => {
    this.setState({
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

  handleWalletChange = (walletCurrency: string) => {
    const { wallets } = this.state;
    const wallet = wallets!.find(x => x.currency === walletCurrency);
    this.setState({ wallet });
  };

  render() {
    const {
      withdrawalInfo,
      wallets,
      wallet,
      percent,
      errorMessage,
      isPending,
      step
    } = this.state;

    if (!withdrawalInfo || !wallets || !wallet) return null;

    return (
      <Fragment>
        <FundWithdrawTop
          title={withdrawalInfo.title}
          availableToWithdraw={convertFromCurrency(
            withdrawalInfo.availableToWithdraw,
            wallet.rateToGVT
          )}
          currency={wallet.currency}
        />
        <div className="dialog__bottom">
          {step === FUND_WITHDRAW_FORM.ENTER_AMOUNT && (
            <Fragment>
              <FundWithdrawWallet
                wallets={wallets}
                value={wallet.currency}
                onChange={this.handleWalletChange}
              />
              <FundWithdrawAmountForm
                wallets={wallets}
                wallet={wallet}
                availableToWithdraw={withdrawalInfo.availableToWithdraw}
                exitFee={withdrawalInfo.exitFee}
                percent={percent}
                onSubmit={this.handleEnterAmountSubmit}
              />
            </Fragment>
          )}
          {step === FUND_WITHDRAW_FORM.CONFIRM && percent && (
            <FundWithdrawConfirmForm
              errorMessage={errorMessage}
              isPending={isPending}
              availableToWithdraw={convertFromCurrency(
                withdrawalInfo.availableToWithdraw,
                wallet.rateToGVT
              )}
              percent={percent}
              currency={wallet.currency}
              exitFee={withdrawalInfo.exitFee}
              onSubmit={this.handleSubmit}
              onBackClick={this.goToEnterAmountStep}
            />
          )}
        </div>
      </Fragment>
    );
  }
}

export default FundWithdrawPopup;
