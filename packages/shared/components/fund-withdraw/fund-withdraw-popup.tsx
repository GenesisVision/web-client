import { FundWithdrawInfo, WalletData } from "gv-api-web";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import RootState from "shared/reducers/root-reducer";
import { ResponseError } from "shared/utils/types";

import { convertFromCurrency } from "../../utils/currency-converter";
import FundWithdrawAmountForm, {
  FundWithdrawAmountFormValues
} from "./fund-withdraw-amount-form";
import FundWithdrawConfirmForm from "./fund-withdraw-confirm-form";
import FundWithdrawTop from "./fund-withdraw-top";

export type FundWithdraw = {
  percent: number;
  currency: string;
};

enum FUND_WITHDRAW_FORM {
  ENTER_AMOUNT = "ENTER_AMOUNT",
  CONFIRM = "CONFIRM"
}

interface IFundWithdrawPopupOwnProps {
  fetchInfo(): Promise<FundWithdrawInfo>;
  withdraw(value: FundWithdraw): Promise<void>;
}

interface IFundWithdrawPopupProps extends IFundWithdrawPopupOwnProps {
  wallets?: WalletData[];
  accountCurrency: string;
}

interface IFundWithdrawPopupState {
  withdrawalInfo?: FundWithdrawInfo;
  isPending: boolean;
  errorMessage?: string;
  enteredValue?: FundWithdraw;
  step: FUND_WITHDRAW_FORM;
}

class FundWithdrawPopup extends Component<
  IFundWithdrawPopupProps,
  IFundWithdrawPopupState
> {
  constructor(props: IFundWithdrawPopupProps) {
    super(props);
    this.state = {
      withdrawalInfo: undefined,
      isPending: false,
      errorMessage: undefined,
      enteredValue: undefined,
      step: FUND_WITHDRAW_FORM.ENTER_AMOUNT
    };
  }

  componentDidMount() {
    const { fetchInfo } = this.props;
    this.setState({ isPending: true });
    fetchInfo()
      .then(data => {
        this.setState({ withdrawalInfo: data, isPending: false });
      })
      .catch((e: ResponseError) =>
        this.setState({ errorMessage: e.errorMessage, isPending: false })
      );
  }

  handleSubmit = () => {
    const { withdraw } = this.props;
    const { enteredValue } = this.state;
    this.setState({ isPending: true });

    if (!enteredValue) return;
    return withdraw(enteredValue).catch((e: ResponseError) => {
      this.setState({ isPending: false, errorMessage: e.errorMessage });
    });
  };

  handleEnterAmountSubmit = (values: FundWithdrawAmountFormValues) => {
    this.setState({
      step: FUND_WITHDRAW_FORM.CONFIRM,
      enteredValue: {
        currency: values.walletCurrency,
        percent: values.percent || 0
      }
    });
  };

  goToEnterAmountStep = () => {
    this.setState({
      step: FUND_WITHDRAW_FORM.ENTER_AMOUNT,
      errorMessage: undefined
    });
  };

  getRate = (currency: string) => {
    const { wallets } = this.props;

    if (!wallets) return 1;

    return wallets.find(x => x.currency === currency)!.rateToGVT;
  };

  render() {
    const { wallets, accountCurrency } = this.props;
    const {
      withdrawalInfo,
      enteredValue,
      errorMessage,
      isPending,
      step
    } = this.state;

    if (!withdrawalInfo || !wallets) return null;

    const wallet =
      wallets.find(x => x.currency === accountCurrency) || wallets[0];

    return (
      <Fragment>
        <FundWithdrawTop
          title={withdrawalInfo.title}
          availableToWithdraw={convertFromCurrency(
            withdrawalInfo.availableToWithdraw,
            withdrawalInfo.rate
          )}
          currency={accountCurrency}
        />
        <div className="dialog__bottom">
          {step === FUND_WITHDRAW_FORM.ENTER_AMOUNT && (
            <FundWithdrawAmountForm
              wallets={wallets}
              wallet={wallet}
              availableToWithdraw={withdrawalInfo.availableToWithdraw}
              exitFee={withdrawalInfo.exitFee}
              enteredValue={enteredValue}
              onSubmit={this.handleEnterAmountSubmit}
            />
          )}
          {step === FUND_WITHDRAW_FORM.CONFIRM && enteredValue && (
            <FundWithdrawConfirmForm
              errorMessage={errorMessage}
              isPending={isPending}
              availableToWithdraw={convertFromCurrency(
                withdrawalInfo.availableToWithdraw,
                this.getRate(enteredValue.currency)
              )}
              enteredValue={enteredValue}
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

const mapStateToProps = (state: RootState) => ({
  accountCurrency: state.accountSettings.currency,
  wallets: state.wallet.info.data ? state.wallet.info.data.wallets : undefined
});

export default connect(mapStateToProps)(FundWithdrawPopup);
