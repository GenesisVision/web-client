import Profitability from "components/profitability/profitability";
import Status from "components/status/status";
import TableCell from "components/table/components/table-cell";
import TableRow from "components/table/components/table-row";
import useIsOpen from "hooks/is-open.hook";
import TransactionDetailsPopup from "modules/transaction-details/transaction-details-popup";
import AmountItem from "modules/transaction-details/transactions/amount-item";
import React, { useCallback } from "react";
import { DEFAULT_DECIMAL_SCALE } from "shared/constants/constants";
import { formatDate } from "shared/utils/dates";
import { formatValue } from "utils/formatter";

import { MultiWalletTransaction } from "../../../wallet.types";
import AmountConvert from "./amount-convert";

const _TransactionsRow: React.FC<Props> = ({ transaction, update }) => {
  const [isOpenPopup, setOpenPopup, setClosePopup] = useIsOpen();
  const handleAction = useCallback(() => {
    if (update) update();
    setClosePopup();
  }, [update]);
  const isConvertAction = !!transaction.amount.second;
  return (
    <>
      <TransactionDetailsPopup
        transaction={transaction}
        open={isOpenPopup}
        onClose={setClosePopup}
        onAction={handleAction}
      />
      <TableRow stripy onClick={setOpenPopup}>
        <TableCell className="wallet-transactions__cell wallet-transactions__cell--date">
          {formatDate(transaction.date)}
        </TableCell>
        <TableCell className="wallet-transactions__cell wallet-transactions__cell--type">
          <Status
            status={transaction.status}
            className="wallet-transactions__icon"
          />
        </TableCell>
        <TableCell className="wallet-transactions__cell wallet-transactions__cell--information">
          {transaction.description}
        </TableCell>
        <TableCell className="wallet-transactions__cell wallet-transactions__cell--amount">
          {isConvertAction ? (
            <AmountConvert amount={transaction.amount} />
          ) : (
            <Profitability
              value={formatValue(
                transaction.amount.first.amount,
                DEFAULT_DECIMAL_SCALE
              )}
            >
              <AmountItem amount={transaction.amount.first} />
            </Profitability>
          )}
        </TableCell>
      </TableRow>
    </>
  );
};

export interface Props {
  transaction: MultiWalletTransaction;
  update?: () => void;
}

const TransactionsRow = React.memo(_TransactionsRow);
export default TransactionsRow;
