import "./transaction-details.scss";

import { TransactionDetatils } from "gv-api-web";
import { GVProgramAvatar } from "gv-react-components";
import * as React from "react";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import walletApi from "shared/services/api-client/wallet-api";

import authService from "../../services/auth-service";

export interface ITransactionDetailsProps {
  transactionId: string;
}

export interface ITransactionDetailsState {
  isPending: boolean;
  data: TransactionDetatils;
  errorMessage?: string;
}

const TransactionAsset = (props: {
  program: string;
  trader: string;
  logo: string;
  level: number;
}) => {
  return (
    <div className="transaction-asset">
      <GVProgramAvatar
        alt={"mega programs"}
        url={props.logo}
        level={props.level}
      />
      <div className="transaction-asset__description">
        <p className="transaction-asset__title">{props.program}</p>
        <p className="transaction-asset__trader">{props.trader}</p>
      </div>
    </div>
  );
};

export class TransactionDetails extends React.Component<
  ITransactionDetailsProps,
  ITransactionDetailsState
> {
  state = {
    isPending: false,
    data: {} as TransactionDetatils
  };

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
      .then((data: TransactionDetatils) =>
        this.setState({ data, isPending: false })
      )
      .catch((error: string) => this.setState({ error, isPending: false }));
  };

  render() {
    if (this.state.isPending) return null;
    return (
      <React.Fragment>
        <div className="dialog__top">
          <div className="dialog__header">
            <h2>Transaction Details</h2>
            <p>Program investment</p>
          </div>
        </div>
        <div className="dialog__bottom">
          <StatisticItem label={"To"}>
            <TransactionAsset
              level={this.state.data.rateValue}
              logo={this.state.data.logo}
              program={this.state.data.name}
              trader={this.state.data.name}
            />
          </StatisticItem>
          <StatisticItem label={"Entry fee"}>
            {this.state.data.entryFee}
          </StatisticItem>
          <StatisticItem label={"GV Commission"}>
            {this.state.data.gvCommission}
          </StatisticItem>
          <StatisticItem label={"Status"}>
            {this.state.data.description}
          </StatisticItem>
          <StatisticItem label={"Investment amount"} big>
            {`${this.state.data.amountFrom} ${this.state.data.currencyFrom}`}
          </StatisticItem>
        </div>
      </React.Fragment>
    );
  }
}
