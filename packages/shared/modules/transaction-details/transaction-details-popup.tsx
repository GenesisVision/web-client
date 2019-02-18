import * as React from "react";
import Dialog from "shared/components/dialog/dialog";

import { TransactionDetails } from "./transaction-details";

interface ITransactionDetailsProps {
  transactionId: string;
  open: boolean;
  onClose(): void;
}

class TransactionDetailsPopup extends React.Component<
  ITransactionDetailsProps
> {
  render() {
    return (
      <Dialog open={this.props.open} onClose={this.props.onClose}>
        <TransactionDetails transactionId={"hello world"} />
      </Dialog>
    );
  }
}

export default TransactionDetailsPopup;
