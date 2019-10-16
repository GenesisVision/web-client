import { MultiWalletTransaction } from "gv-api-web";
import moment from "moment";
import React, { useCallback } from "react";
import NumberFormat from "react-number-format";
import { CurrencyItem } from "shared/components/currency-item/currency-item";
import Profitability from "shared/components/profitability/profitability";
import Status from "shared/components/status/status";
import TableCell from "shared/components/table/components/table-cell";
import TableRow from "shared/components/table/components/table-row";
import { DEFAULT_DECIMAL_SCALE } from "shared/constants/constants";
import useIsOpen from "shared/hooks/is-open.hook";
import TransactionDetailsPopup from "shared/modules/transaction-details/transaction-details-popup";
import { formatValue } from "shared/utils/formatter";

const ConvertTransaction: React.FC<Props> = React.memo(({ transaction }) => (
  <>
    <div className="wallet-transactions__col">
      <CurrencyItem
        logo={transaction.logoFrom}
        name={transaction.currencyFrom}
        small
      />
    </div>
    <div className="wallet-transactions__back-arrow">&rarr;</div>
    <div className="wallet-transactions__col">
      <CurrencyItem
        logo={transaction.logoTo}
        name={transaction.currencyTo}
        small
      />
    </div>
  </>
));

const AmountConvertTransaction: React.FC<{
  transaction: MultiWalletTransaction;
}> = React.memo(props => (
  <>
    <span className="wallet-transactions__col">
      <NumberFormat
        value={formatValue(props.transaction.amount, DEFAULT_DECIMAL_SCALE)}
        thousandSeparator=" "
        displayType="text"
        suffix={` ${props.transaction.currencyFrom}`}
      />
    </span>
    <span className="wallet-transactions__back-arrow">&rarr;</span>
    <span className="wallet-transactions__col">
      <NumberFormat
        value={formatValue(props.transaction.amountTo, DEFAULT_DECIMAL_SCALE)}
        thousandSeparator=" "
        displayType="text"
        suffix={` ${props.transaction.currencyTo}`}
      />
    </span>
  </>
));

const _TransactionsRow: React.FC<Props> = ({
  transaction,
  update,
  walletCurrency
}) => {
  const [isOpenPopup, setOpenPopup, setClosePopup] = useIsOpen();
  const handleAction = useCallback(
    () => {
      if (update) update();
      setClosePopup();
    },
    [update]
  );
  const isConvertAction = transaction.type === "Converting";
  return (
    <>
      <TransactionDetailsPopup
        transactionId={transaction.id}
        open={isOpenPopup}
        onClose={setClosePopup}
        onAction={handleAction}
      />
      <TableRow stripy onClick={setOpenPopup}>
        {!walletCurrency && (
          <TableCell className="wallet-transactions__cell wallet-transactions__cell--wallet">
            <div className="wallet-transactions__cell--wallet-wrapper">
              {isConvertAction ? (
                <ConvertTransaction transaction={transaction} />
              ) : (
                <CurrencyItem
                  logo={transaction.logoFrom}
                  name={transaction.currencyFrom}
                  small
                />
              )}
            </div>
          </TableCell>
        )}
        <TableCell className="wallet-transactions__cell wallet-transactions__cell--date">
          {moment(transaction.date).format()}
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
            <AmountConvertTransaction transaction={transaction} />
          ) : (
            <Profitability
              value={formatValue(transaction.amount, DEFAULT_DECIMAL_SCALE)}
            >
              <NumberFormat
                value={formatValue(transaction.amount, DEFAULT_DECIMAL_SCALE)}
                thousandSeparator=" "
                displayType="text"
                allowNegative={false}
                suffix={` ${transaction.currencyFrom}`}
              />
            </Profitability>
          )}
        </TableCell>
      </TableRow>
    </>
  );
};

export interface Props {
  transaction: MultiWalletTransaction;
  walletCurrency?: string;
  update?(): void;
}

const TransactionsRow = React.memo(_TransactionsRow);
export default TransactionsRow;
