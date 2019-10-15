import { MultiWalletExternalTransaction } from "gv-api-web";
import moment from "moment";
import React, { useCallback } from "react";
import NumberFormat from "react-number-format";
import Profitability from "shared/components/profitability/profitability";
import TableCell from "shared/components/table/components/table-cell";
import TableRow from "shared/components/table/components/table-row";
import { UpdateItemsFuncType } from "shared/components/table/components/table.types";
import { DEFAULT_DECIMAL_SCALE } from "shared/constants/constants";
import useIsOpen from "shared/hooks/is-open.hook";
import TransactionDetailsPopup from "shared/modules/transaction-details/transaction-details-popup";
import { formatValue } from "shared/utils/formatter";
import { WalletItem } from "../../wallet-item/wallet-item";

const _AllDepositsWithdrawalsRow: React.FC<Props> = ({
  transaction,
  update
}) => {
  const [isOpenPopup, setOpenPopup, setClosePopup] = useIsOpen();
  const handleAction = useCallback(
    () => {
      if (update) update();
      setClosePopup();
    },
    [update]
  );
  return (
    <>
      <TransactionDetailsPopup
        transactionId={transaction.id}
        open={isOpenPopup}
        onClose={setClosePopup}
        onAction={handleAction}
      />
      <TableRow stripy onClick={setOpenPopup}>
        <TableCell className="wallet-deposits-withdrawals__cell wallet-deposits-withdrawals__cell--wallet">
          <WalletItem
            logo={transaction.logo}
            name={transaction.currency}
            small
          />
        </TableCell>
        <TableCell className="wallet-deposits-withdrawals__cell wallet-deposits-withdrawals__cell--date">
          {moment(transaction.date).format()}
        </TableCell>
        <TableCell className="wallet-deposits-withdrawals__cell wallet-deposits-withdrawals__cell--status">
          {(transaction.statusUrl && (
            <a href={transaction.statusUrl} target="_blank">
              {transaction.status}
            </a>
          )) || <>{transaction.status}</>}
        </TableCell>
        <TableCell className="wallet-deposits-withdrawals__cell wallet-deposits-withdrawals__cell--amount">
          <Profitability
            value={formatValue(transaction.amount, DEFAULT_DECIMAL_SCALE)}
          >
            <NumberFormat
              value={formatValue(transaction.amount, DEFAULT_DECIMAL_SCALE)}
              thousandSeparator=" "
              displayType="text"
              suffix={` ${transaction.currency}`}
            />
          </Profitability>
        </TableCell>
      </TableRow>
    </>
  );
};

interface Props {
  transaction: MultiWalletExternalTransaction;
  update?: UpdateItemsFuncType;
}

const AllDepositsWithdrawalsRow = React.memo(_AllDepositsWithdrawalsRow);
export default AllDepositsWithdrawalsRow;
