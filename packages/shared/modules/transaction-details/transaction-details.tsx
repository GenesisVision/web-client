import "./transaction-details.scss";

import { TransactionDetails } from "gv-api-web";
import * as React from "react";
import walletApi from "shared/services/api-client/wallet-api";

import authService from "../../services/auth-service";
import ConvertingDetails from "./converting-details";
import ExternalDeposit from "./external-deposit-details";
import ExternalWithdrawal from "./external-withdrawal-details";
import InvestingTransaction from "./investment-details";
import OpenCloseTransaction from "./open-close-details";
import WithdrawalTransaction from "./withdrawal-details";
import ProfitDetails from "./profit-details";
import { translate } from "react-i18next";

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

export interface ITransactionDetailsProps {
  transactionId: string;
  t(string: string): string;
}

export interface ITransactionDetailsState {
  isPending: boolean;
  data?: TransactionDetails;
  errorMessage?: string;
}

export interface TransactionDetailsProps {
  data: TransactionDetails;
  t(string: string): string;
}

class TransactionDetailsDialog extends React.Component<
  ITransactionDetailsProps,
  ITransactionDetailsState
> {
  constructor(props: ITransactionDetailsProps) {
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
        "00000000-0000-0000-0000-000000000001",
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
        return <h1>дло</h1>;
      };
    return <Component t={this.props.t} data={this.state.data} />;
  }
}

export default translate()(TransactionDetailsDialog);
