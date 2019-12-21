import Profitability from "components/profitability/profitability";
import Status from "components/status/status";
import TableCell from "components/table/components/table-cell";
import TableRow from "components/table/components/table-row";
import { UpdateItemsFuncType } from "components/table/components/table.types";
import useIsOpen from "hooks/is-open.hook";
import TransactionDetailsPopup from "modules/transaction-details/transaction-details-popup";
import AmountItem from "modules/transaction-details/transactions/amount-item";
import React, { useCallback } from "react";
import { DEFAULT_DECIMAL_SCALE } from "shared/constants/constants";
import { formatDate } from "shared/utils/dates";
import { formatValue } from "utils/formatter";

import { MultiWalletTransaction } from "../../../wallet.types";

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
        <TableCell className="wallet-deposits-withdrawals__cell wallet-deposits-withdrawals__cell--date">
          {formatDate(transaction.date)}
        </TableCell>
        <TableCell className="wallet-deposits-withdrawals__cell wallet-deposits-withdrawals__cell--status">
          <Status
            withText
            status={transaction.status}
            className="wallet-transactions__icon"
          />
        </TableCell>
        <TableCell className="wallet-deposits-withdrawals__cell wallet-deposits-withdrawals__cell--amount">
          <Profitability
            value={formatValue(
              transaction.amount.first.amount,
              DEFAULT_DECIMAL_SCALE
            )}
          >
            <AmountItem amount={transaction.amount.first} />
          </Profitability>
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
