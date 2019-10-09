import { MultiWalletTransaction } from "gv-api-web";
import React, { useCallback } from "react";
import NumberFormat from "react-number-format";
import WalletImage from "shared/components/avatar/wallet-image/wallet-image";
import Profitability from "shared/components/profitability/profitability";
import Status from "shared/components/status/status";
import TableCell from "shared/components/table/components/table-cell";
import TableRow from "shared/components/table/components/table-row";
import { DEFAULT_DECIMAL_SCALE } from "shared/constants/constants";
import useIsOpen from "shared/hooks/is-open.hook";
import TransactionDetailsPopup from "shared/modules/transaction-details/transaction-details-popup";
import { formatDate } from "shared/utils/dates";
import { formatValue } from "shared/utils/formatter";

const ConvertTransaction: React.FC<Props> = React.memo(({ transaction }) => (
  <>
    <div className="wallet-transactions__col">
      <WalletImage
        url={transaction.logoFrom}
        imageClassName="wallet-transactions__icon"
        alt={transaction.currencyFrom}
        className="wallet-transactions__icon-container"
      />
      {transaction.currencyFrom}
    </div>
    <div className="wallet-transactions__back-arrow">&rarr;</div>
    <div className="wallet-transactions__col">
      <WalletImage
        url={transaction.logoTo}
        imageClassName="wallet-transactions__icon"
        alt={transaction.currencyTo}
        className="wallet-transactions__icon-container"
      />
      {transaction.currencyTo}
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
  const handleAction = useCallback(() => {
    if (update) update();
    setClosePopup();
  }, [update]);
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
                <>
                  <WalletImage
                    url={transaction.logoFrom}
                    imageClassName="wallet-transactions__icon"
                    alt={transaction.currencyFrom}
                  />
                  {transaction.currencyFrom}
                </>
              )}
            </div>
          </TableCell>
        )}
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
