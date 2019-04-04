import { ProgramWithdrawInfo } from "gv-api-web";
import * as React from "react";
import { DialogLoader } from "shared/components/dialog/dialog-loader/dialog-loader";

import { convertFromCurrency } from "../../utils/currency-converter";
import { ResponseError } from "../../utils/types";
import ProgramWithdrawForm from "./program-withdraw-form";
import ProgramWithdrawTop from "./program-withdraw-top";
import ProgramWithdrawAmountForm from "./program-withdraw-amount-form";

// class ProgramWithdrawPopup extends Component {
//   state = {
//     data: undefined,
//     isPending: false
//   };
//
//   componentDidMount() {
//     this.setState({ isPending: true });
//     this.props
//       .fetchInfo()
//       .then(data => this.setState({ data, isPending: false }))
//       .catch(() => this.setState({ isPending: false }));
//   }
//
//   handleSubmit = amount => {
//     this.setState({ isPending: true });
//     return this.props
//       .withdraw(amount)
//       .catch(() => this.setState({ isPending: false }));
//   };
//
//   render() {
//     if (!this.state.data) return <DialogLoader />;
//     const { assetCurrency, accountCurrency, errorMessage } = this.props;
//     const { title, availableToWithdraw, periodEnds, rate } = this.state.data;
//     return (
//       <Fragment>
//         <ProgramWithdrawTop
//           title={title}
//           availableToWithdraw={availableToWithdraw}
//           programCurrency={assetCurrency}
//         />
//         <ProgramWithdrawForm
//           programCurrency={assetCurrency}
//           accountCurrency={accountCurrency}
//           availableToWithdraw={availableToWithdraw}
//           periodEnds={periodEnds}
//           rate={rate}
//           onSubmit={this.handleSubmit}
//           errorMessage={errorMessage}
//           disabled={this.state.isPending}
//         />
//       </Fragment>
//     );
//   }
// }
//
// ProgramWithdrawPopup.propTypes = {
//   fetchInfo: PropTypes.func,
//   withdraw: PropTypes.func,
//   accountCurrency: PropTypes.string.isRequired,
//   assetCurrency: PropTypes.string.isRequired
// };
//
// export default ProgramWithdrawPopup;

// import { FundWithdrawInfo, WalletBaseData } from "gv-api-web";
// import React, { Component, Fragment } from "react";
// import { rateApi } from "shared/services/api-client/rate-api";
// import { convertFromCurrency } from "shared/utils/currency-converter";
// import { ResponseError } from "shared/utils/types";
//
// import { DialogLoader } from "../dialog/dialog-loader/dialog-loader";
// import FundWithdrawAmountForm from "./fund-withdraw-amount-form";
// import FundWithdrawConfirmForm from "./fund-withdraw-confirm-form";
// import FundWithdrawTop from "./fund-withdraw-top";
// import FundWithdrawWallet from "./fund-withdraw-wallet";
// import {
//   FundWithdraw,
//   FundWithdrawalInfoResponse
// } from "./fund-withdraw.types";

enum PROGRAM_WITHDRAW_FORM {
  ENTER_AMOUNT = "ENTER_AMOUNT",
  CONFIRM = "CONFIRM"
}

class ProgramWithdrawPopup extends React.Component<
  IProgramWithdrawPopupProps,
  State
> {
  state: State = {
    step: PROGRAM_WITHDRAW_FORM.ENTER_AMOUNT,
    isPending: false,
    rate: 1,
    errorMessage: undefined,
    periodEnds: undefined,
    title: undefined,
    amount: undefined,
    availableToWithdraw: undefined
  };

  componentDidMount() {
    const { fetchInfo } = this.props;
    this.setState({ isPending: true });
    fetchInfo()
      .then(data => {
        const { periodEnds, title, availableToWithdraw, rate } = data;
        this.setState({
          periodEnds,
          title,
          availableToWithdraw,
          rate,
          isPending: false
        });
      })
      .catch((error: ResponseError) =>
        this.setState({ errorMessage: error.errorMessage, isPending: false })
      );
  }

  handleSubmit = () => {
    const { withdraw } = this.props;
    const { amount } = this.state;
    this.setState({ isPending: true });

    if (!amount) return;
    return withdraw({
      amount
    }).catch((error: ResponseError) => {
      this.setState({ isPending: false, errorMessage: error.errorMessage });
    });
  };

  handleEnterAmountSubmit = (amount?: number) => {
    this.setState({
      step: PROGRAM_WITHDRAW_FORM.CONFIRM,
      amount: amount || 0
    });
  };

  goToEnterAmountStep = () => {
    this.setState({
      step: PROGRAM_WITHDRAW_FORM.ENTER_AMOUNT,
      errorMessage: undefined
    });
  };

  render() {
    const {
      title,
      availableToWithdraw,
      periodEnds,
      rate,
      errorMessage,
      isPending,
      step,
      amount
    } = this.state;
    const { assetCurrency, accountCurrency } = this.props;

    if (!availableToWithdraw || !title || !periodEnds) return <DialogLoader />;
    // const availableToWithdraw = convertFromCurrency(
    //   availableToWithdraw,
    //   rate
    // );
    // return (
    //   <>
    //     <FundWithdrawTop
    //       title={withdrawalInfo.title}
    //       availableToWithdraw={availableToWithdraw}
    //       currency={wallet.currency}
    //     />
    //     <div className="dialog__bottom">
    //       {step === PROGRAM_WITHDRAW_FORM.ENTER_AMOUNT && (
    //         <>
    //           <FundWithdrawWallet
    //             wallets={wallets}
    //             value={wallet.currency}
    //             onChange={this.handleWalletChange}
    //           />
    //           <FundWithdrawAmountForm
    //             wallets={wallets}
    //             wallet={wallet}
    //             availableToWithdraw={availableToWithdraw}
    //             exitFee={withdrawalInfo.exitFee}
    //             percent={percent}
    //             onSubmit={this.handleEnterAmountSubmit}
    //           />
    //         </>
    //       )}
    //       {step === PROGRAM_WITHDRAW_FORM.CONFIRM && percent && (
    //         <FundWithdrawConfirmForm
    //           errorMessage={errorMessage}
    //           isPending={isPending}
    //           availableToWithdraw={availableToWithdraw}
    //           percent={percent}
    //           currency={wallet.currency}
    //           exitFee={withdrawalInfo.exitFee}
    //           onSubmit={this.handleSubmit}
    //           onBackClick={this.goToEnterAmountStep}
    //         />
    //       )}
    //     </div>
    //   </>
    // );
    return (
      <>
        <ProgramWithdrawTop
          title={title}
          availableToWithdraw={availableToWithdraw}
          programCurrency={assetCurrency}
        />
        {/*<ProgramWithdrawForm*/}
        {/*programCurrency={assetCurrency}*/}
        {/*accountCurrency={accountCurrency}*/}
        {/*availableToWithdraw={availableToWithdraw}*/}
        {/*periodEnds={periodEnds}*/}
        {/*rate={rate}*/}
        {/*onSubmit={this.handleSubmit}*/}
        {/*errorMessage={errorMessage}*/}
        {/*disabled={isPending}*/}
        {/*/>*/}
        <div className="dialog__bottom">
          {step === PROGRAM_WITHDRAW_FORM.ENTER_AMOUNT && (
            <ProgramWithdrawAmountForm
              amount={amount}
              rate={rate}
              programCurrency={assetCurrency}
              accountCurrency={accountCurrency}
              availableToWithdraw={availableToWithdraw}
              onSubmit={this.handleEnterAmountSubmit}
            />
          )}
          {/*{step === PROGRAM_WITHDRAW_FORM.CONFIRM && amount && (*/}
          {/*<FundWithdrawConfirmForm*/}
          {/*errorMessage={errorMessage}*/}
          {/*isPending={isPending}*/}
          {/*availableToWithdraw={availableToWithdraw}*/}
          {/*percent={percent}*/}
          {/*currency={wallet.currency}*/}
          {/*exitFee={withdrawalInfo.exitFee}*/}
          {/*onSubmit={this.handleSubmit}*/}
          {/*onBackClick={this.goToEnterAmountStep}*/}
          {/*/>*/}
          {/*)}*/}
        </div>
      </>
    );
  }
}

export default ProgramWithdrawPopup;

export interface IProgramWithdrawPopupProps {
  assetCurrency: string;
  accountCurrency: string;
  fetchInfo(): Promise<ProgramWithdrawInfo>;
  withdraw(value: ProgramWithdrawType): Promise<void>;
}

export type ProgramWithdrawType = {
  amount: number;
};

interface State {
  isPending: boolean;
  errorMessage?: string;
  step: PROGRAM_WITHDRAW_FORM;
  rate: number;
  amount?: number;
  availableToWithdraw?: number;
  periodEnds?: Date;
  title?: string;
}
