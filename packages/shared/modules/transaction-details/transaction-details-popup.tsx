import { WalletTransaction } from "gv-api-web";
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
  handleClose = () => {
    this.props.onClose();
  };
  render() {
    return (
      <Dialog open={this.props.open} onClose={this.handleClose}>
        <TransactionDetails transactionId={"hello world"} />
      </Dialog>
    );
  }
}

export default TransactionDetailsPopup;
