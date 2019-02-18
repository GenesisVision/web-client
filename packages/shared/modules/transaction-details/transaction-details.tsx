import "./transaction-details.scss";

import { GVProgramAvatar } from "gv-react-components";
import * as React from "react";
import StatisticItem from "shared/components/statistic-item/statistic-item";

import ArrowIcon from "../../media/arrow-down.svg";
import filesService from "../../services/file-service";

export interface ITransactionDetailsProps {
  transactionId: string;
}

const TransactionAsset = props => {
  return (
    <div className="transaction-asset">
      <GVProgramAvatar alt={"mega programs"} />
      <div className="transaction-asset__description">
        <p className="transaction-asset__title">Hello Program</p>
        <p className="transaction-asset__trader">Mega Trader</p>
      </div>
    </div>
  );
};

export class TransactionDetails extends React.Component<
  ITransactionDetailsProps
> {
  render() {
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
            <TransactionAsset />
          </StatisticItem>
          <StatisticItem label={"Entry fee"}>5345</StatisticItem>
          <StatisticItem label={"GV Commission"}>345345</StatisticItem>
          <StatisticItem label={"Status"}>Done</StatisticItem>
          <StatisticItem label={"Investment amount"} big>
            34.234234 BTC
          </StatisticItem>
        </div>
      </React.Fragment>
    );
  }
}
