import "./transaction-details.scss";

import { TransactionDetails } from "gv-api-web";
import * as React from "react";
import NumberFormat from "react-number-format";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import walletApi from "shared/services/api-client/wallet-api";

import Profitability from "../../components/profitability/profitability";
import TableCell from "../../components/table/components/table-cell";
import authService from "../../services/auth-service";
import { formatCurrencyValue, formatValue } from "../../utils/formatter";
import TransactionAsset from "./details-asset";

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
    return (
      <React.Fragment>
        <div className="dialog__top">
          <div className="dialog__header">
            <h2>Transaction Details</h2>
            <p>{`${this.state.data.programDetails.programType}`} investment</p>
          </div>
        </div>
        <div className="dialog__bottom">
          <StatisticItem
            label={`To the ${this.state.data.programDetails.programType.toLowerCase()}`}
          >
            <TransactionAsset data={this.state.data.programDetails} />
          </StatisticItem>
          <StatisticItem label={"Entry fee"}>
            {this.state.data.programDetails.entryFeePercent} %
            <NumberFormat
              value={formatCurrencyValue(
                this.state.data.programDetails.entryFee,
                "BTC"
              )}
              prefix={" ("}
              suffix={" BTC)"}
              displayType="text"
            />
          </StatisticItem>
          <StatisticItem label={"GV Commission"}>
            {this.state.data.gvCommissionPercent} %
            <NumberFormat
              value={formatCurrencyValue(this.state.data.gvCommission, "BTC")}
              prefix={" ("}
              suffix={" BTC)"}
              displayType="text"
            />
          </StatisticItem>
          <StatisticItem label={"Status"}>
            {this.state.data.status}
          </StatisticItem>
          <StatisticItem label={"Investment amount"} big>
            <Profitability value={this.state.data.amount} prefix="sign">
              <NumberFormat
                value={formatCurrencyValue(this.state.data.amount, "BTC")}
                suffix=" BTC"
                allowNegative={false}
                displayType="text"
              />
            </Profitability>
          </StatisticItem>
        </div>
      </React.Fragment>
    );
  }
}
