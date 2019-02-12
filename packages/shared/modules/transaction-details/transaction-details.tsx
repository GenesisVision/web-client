import "./transaction-details.scss";

import { TransactionDetails } from "gv-api-web";
import * as React from "react";
import walletApi from "shared/services/api-client/wallet-api";

import authService from "../../services/auth-service";
import InvestingTransaction from "./investment-details";
import WithdrawalTransaction from "./withdrawal-details";

const Types = {
  Investing: InvestingTransaction,
  Withdrawal: WithdrawalTransaction
};

export interface ITransactionDetailsProps {
  transactionId: string;
}

export interface ITransactionDetailsState {
  isPending: boolean;
  data?: TransactionDetails;
  errorMessage?: string;
}

export class TransactionDetailsDialog extends React.Component<
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
        "00000000-0000-0000-0000-000000000003",
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
    const Component = Types[this.state.data.type] || <h1>дло</h1>;
    return <Component data={this.state.data} />;
  }
}
