import "./transaction-details.scss";

import { ProgramTransactionDetails, TransactionDetails } from "gv-api-web";
import { GVProgramAvatar } from "gv-react-components";
import * as React from "react";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import walletApi from "shared/services/api-client/wallet-api";

import authService from "../../services/auth-service";
import filesService from "../../services/file-service";

export interface ITransactionDetailsProps {
  transactionId: string;
}

export interface ITransactionDetailsState {
  isPending: boolean;
  data?: TransactionDetails;
  errorMessage?: string;
}

const TransactionAsset = (props: { data: ProgramTransactionDetails }) => {
  return (
    <div className="transaction-asset">
      <GVProgramAvatar
        alt={props.data.title}
        url={filesService.getFileUrl(props.data.logo)}
        level={props.data.level}
      />
      <div className="transaction-asset__description">
        <p className="transaction-asset__title">{props.data.title}</p>
        <p className="transaction-asset__trader">{props.data.programType}</p>
      </div>
    </div>
  );
};

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
    console.info("cdm");
    this.fetch();
  }

  fetch = () => {
    console.info(this.state, "fetch");
    this.setState({ isPending: true });
    walletApi
      .v10WalletTransactionByIdGet(
        "00000000-0000-0000-0000-000000000001",
        authService.getAuthArg()
      )
      .then(
        (data: TransactionDetails) =>
          console.info(data) || this.setState({ data, isPending: false })
      )
      .catch((errorMessage: string) =>
        this.setState({ errorMessage, isPending: false })
      );
  };

  render() {
    if (this.state.isPending) return null;
    if (!this.state.data) return null;
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
            <TransactionAsset data={this.state.data.programDetails} />
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
