import classNames from "classnames";
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
import styles from "./wallet-deposits-withdrawals.module.scss";

const _AllDepositsWithdrawalsRow: React.FC<Props> = ({
  transaction,
  update
}) => {
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
        <TableCell>{formatDate(transaction.date)}</TableCell>
        <TableCell>
          <Status withText status={transaction.status} />
        </TableCell>
        <TableCell
          className={classNames(
            styles["wallet-deposits-withdrawals__cell"],
            styles["wallet-deposits-withdrawals__cell--amount"]
          )}
        >
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

const AllDepositsWithdrawalsRow = React.memo(_AllDepositsWithdrawalsRow);
export default AllDepositsWithdrawalsRow;
