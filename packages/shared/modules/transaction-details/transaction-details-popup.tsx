import * as React from "react";
import Dialog from "shared/components/dialog/dialog";

import TransactionDetailsDialog from "./transaction-details";

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
      <Dialog
        open={this.props.open}
        onClose={this.props.onClose}
        className="transaction-details"
      >
        <TransactionDetailsDialog
          transactionId={this.props.transactionId}
          close={this.props.onClose}
        />
      </Dialog>
    );
  }
}

export default TransactionDetailsPopup;
