import Status from "components/status/status";
import TableCell from "components/table/components/table-cell";
import TableRow from "components/table/components/table-row";
import { UpdateItemsFuncType } from "components/table/components/table.types";
import useIsOpen from "hooks/is-open.hook";
import React, { useCallback } from "react";
import { formatDate } from "utils/dates";

import { MultiWalletTransaction } from "../../../wallet.types";
import TransactionDetailsPopup from "../../transaction-details/transaction-details-popup";
import AmountItem from "../../transaction-details/transactions/amount-item";

const _DepositsWithdrawalsRow: React.FC<Props> = ({ transaction, update }) => {
  const [isOpenPopup, setOpenPopup, setClosePopup] = useIsOpen();
  const handleAction = useCallback(() => {
    if (update) update();
    setClosePopup();
  }, [update]);
  return (
    <>
      <TransactionDetailsPopup
        transaction={transaction}
        open={isOpenPopup}
        onClose={setClosePopup}
        onAction={handleAction}
      />
      <TableRow stripy onClick={setOpenPopup}>
        <TableCell className="wallet-deposits-withdrawals__cell">
          {formatDate(transaction.date)}
        </TableCell>
        <TableCell className="wallet-deposits-withdrawals__cell">
          <Status withText status={transaction.status} />
        </TableCell>
        <TableCell className="wallet-deposits-withdrawals__cell wallet-deposits-withdrawals__cell--amount">
          <AmountItem amount={transaction.amount.first} />
        </TableCell>
      </TableRow>
    </>
  );
};
interface Props {
  transaction: MultiWalletTransaction;
  update?: UpdateItemsFuncType;
}

const DepositsWithdrawalsRow = React.memo(_DepositsWithdrawalsRow);
export default DepositsWithdrawalsRow;
