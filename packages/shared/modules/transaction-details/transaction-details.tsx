import "./transaction-details.scss";

import { TransactionDetails } from "gv-api-web";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { connect } from "react-redux";
import { compose } from "redux";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import ConvertingDetails from "shared/modules/transaction-details/converting-details";
import ExternalDeposit from "shared/modules/transaction-details/external-deposit-details";
import ExternalWithdrawal from "shared/modules/transaction-details/external-withdrawal-details";
import FeeDetails from "shared/modules/transaction-details/fee-details";
import InvestingTransaction from "shared/modules/transaction-details/investment-details";
import OpenCloseTransaction from "shared/modules/transaction-details/open-close-details";
import ProfitDetails from "shared/modules/transaction-details/profit-details";
import WithdrawalTransaction from "shared/modules/transaction-details/withdrawal-details";
import walletApi from "shared/services/api-client/wallet-api";
import authService from "shared/services/auth-service";
import { IError } from "shared/constants/constants";

const Types = {
  Investing: InvestingTransaction,
  Withdrawal: WithdrawalTransaction,
  Open: OpenCloseTransaction,
  Close: OpenCloseTransaction,
  ExternalDeposit: ExternalDeposit,
  ExternalWithdrawal: ExternalWithdrawal,
  Converting: ConvertingDetails,
  Profit: ProfitDetails,
  PlatformFee: FeeDetails
};

export interface ITransactionDetailsDialogProps extends InjectedTranslateProps {
  transactionId: string;
  error(message: string): void;
  close(): void;
  onAction(): void;
}

export interface ITransactionDetailsState {
  isPending: boolean;
  data?: TransactionDetails;
  errorMessage?: string;
}

export interface ITransactionDetailsProps extends InjectedTranslateProps {
  data: TransactionDetails;
  handleCancel?(): void;
  handleResend?(): void;
}

class TransactionDetailsDialog extends React.Component<
  ITransactionDetailsDialogProps,
  ITransactionDetailsState
> {
  constructor(props: ITransactionDetailsDialogProps) {
    super(props);
    this.state = {
      isPending: false
    };
  }

  componentDidMount() {
    this.fetch();
  }

  fetch = () => {
    this.setState({ isPending: true });
    walletApi
      .v10WalletTransactionByIdGet(
        this.props.transactionId,
        authService.getAuthArg()
      )
      .then((data: TransactionDetails) =>
        this.setState({ data, isPending: false })
      )
      .catch((errorMessage: IError) => {
        this.props.error(errorMessage.errorMessage);
        this.props.close();
      });
  };

  cancel = () => {
    walletApi
      .v10WalletWithdrawRequestCancelByTxIdPost(
        this.props.transactionId,
        authService.getAuthArg()
      )
      .then((res: any) => {
        this.props.onAction();
      })
      .catch((errorMessage: IError) => {
        this.props.error(errorMessage.errorMessage);
      });
  };
  resendEmail = () => {
    walletApi
      .v10WalletWithdrawRequestResendByTxIdPost(
        this.props.transactionId,
        authService.getAuthArg()
      )
      .then((res: any) => {
        this.props.close();
      })
      .catch((errorMessage: IError) => {
        this.props.error(errorMessage.errorMessage);
      });
  };

  render() {
    if (this.state.isPending) return null;
    if (!this.state.data) return null;
    const Component =
      Types[this.state.data.type] ||
      function() {
        return <p>type isn't define</p>;
      };
    return (
      <Component
        t={this.props.t}
        data={this.state.data}
        handleCancel={this.cancel}
        handleResend={this.resendEmail}
      />
    );
  }
}

const mapDispatchToProps = {
  error: alertMessageActions.error
};

export default compose(
  translate(),
  connect(
    null,
    mapDispatchToProps
  )
)(TransactionDetailsDialog);
