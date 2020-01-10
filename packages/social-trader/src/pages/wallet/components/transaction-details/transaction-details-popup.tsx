import Dialog from "components/dialog/dialog";
import dynamic from "next/dist/next-server/lib/dynamic";
import { MultiWalletTransaction } from "pages/wallet/wallet.types";
import * as React from "react";

const TransactionDetailsDialog = dynamic(() =>
  import("./transaction-details-dialog")
);

const _TransactionDetailsPopup: React.FC<ITransactionDetailsProps> = ({
  open,
  onClose,
  transaction,
  onAction
}) => (
  <Dialog open={open} onClose={onClose} className="transaction-details">
    <TransactionDetailsDialog
      transaction={transaction}
      close={onClose}
      onAction={onAction}
    />
  </Dialog>
);

interface ITransactionDetailsProps {
  transaction: MultiWalletTransaction;
  open: boolean;
  onClose: () => void;
  onAction: () => void;
}

const TransactionDetailsPopup = React.memo(_TransactionDetailsPopup);
export default TransactionDetailsPopup;
