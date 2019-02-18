import "./transaction-details.scss";

import { TransactionDetails } from "gv-api-web";
import * as React from "react";
import { translate } from "react-i18next";
import walletApi from "shared/services/api-client/wallet-api";

import authService from "../../services/auth-service";
import ConvertingDetails from "./converting-details";
import ExternalDeposit from "./external-deposit-details";
import ExternalWithdrawal from "./external-withdrawal-details";
import InvestingTransaction from "./investment-details";
import OpenCloseTransaction from "./open-close-details";
import ProfitDetails from "./profit-details";
import WithdrawalTransaction from "./withdrawal-details";

const Types = {
  Investing: InvestingTransaction,
  Withdrawal: WithdrawalTransaction,
  Open: OpenCloseTransaction,
  Close: OpenCloseTransaction,
  ExternalDeposit: ExternalDeposit,
  ExternalWithdrawal: ExternalWithdrawal,
  Converting: ConvertingDetails,
  Profit: ProfitDetails
};

export interface ITransactionDetailsDialogProps {
  transactionId: string;
  t(string: string): string;
}

export interface ITransactionDetailsState {
  isPending: boolean;
  data?: TransactionDetails;
  errorMessage?: string;
}

export interface ITransactionDetailsProps {
  data: TransactionDetails;
  t(string: string): string;
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
        "00000000-0000-0000-0000-000000000011",
        authService.getAuthArg()
      )
      .then((data: TransactionDetails) =>
        this.setState({ data, isPending: false })
      )
      .catch((errorMessage: string) =>
        this.setState({ errorMessage, isPending: false })
      );
  };

  render() {
    if (this.state.isPending) return null;
    if (!this.state.data) return null;
    const Component =
      Types[this.state.data.type] ||
      function() {
        return <p>type isn't define</p>;
      };
    return <Component t={this.props.t} data={this.state.data} />;
  }
}

export default translate()(TransactionDetailsDialog);
