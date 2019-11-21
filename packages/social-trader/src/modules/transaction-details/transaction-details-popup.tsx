import Dialog from "components/dialog/dialog";
import * as React from "react";

import TransactionDetailsDialog from "./transaction-details-dialog";

const TransactionDetailsPopup: React.FC<ITransactionDetailsProps> = React.memo(
  ({ open, onClose, transactionId, onAction }) => (
    <Dialog open={open} onClose={onClose} className="transaction-details">
      <TransactionDetailsDialog
        transactionId={transactionId}
        close={onClose}
        onAction={onAction}
      />
    </Dialog>
  )
);

interface ITransactionDetailsProps {
  transactionId: string;
  open: boolean;
  onClose(): void;
  onAction(): void;
}

export default TransactionDetailsPopup;
