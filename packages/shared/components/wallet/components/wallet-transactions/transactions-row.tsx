import { MultiWalletTransaction } from "gv-api-web";
import * as moment from "moment";
import * as React from "react";
import { Fragment } from "react";
import NumberFormat from "react-number-format";
import Profitability from "shared/components/profitability/profitability";
import Status from "shared/components/status/status";
import TableCell from "shared/components/table/components/table-cell";
import TableRow from "shared/components/table/components/table-row";
import TransactionDetailsPopup from "shared/modules/transaction-details/transaction-details-popup";
import { formatCurrencyValue } from "shared/utils/formatter";
import WalletImage from "shared/components/avatar/wallet-image/wallet-image";

export interface ITransactionRowProps {
  transaction: MultiWalletTransaction;
  walletCurrency?: string;
}

export interface ITransactionRowState {
  isOpen: boolean;
}

const ConvertTransaction: React.FunctionComponent<ITransactionRowProps> = ({
  transaction
}) => {
  return (
    <Fragment>
      <span className="wallet-transactions__col">
        <WalletImage
          url={transaction.logoFrom}
          imageClassName="wallet-transactions__icon"
          alt={transaction.currencyFrom}
        />
        {transaction.currencyFrom}
      </span>
      <span className="wallet-transactions__back-arrow">&rarr;</span>
      <span className="wallet-transactions__col">
        <WalletImage
          url={transaction.logoTo}
          imageClassName="wallet-transactions__icon"
          alt={transaction.currencyTo}
        />
        {transaction.currencyTo}
      </span>
    </Fragment>
  );
};

const AmountConvertTransaction: React.FunctionComponent<{
  transaction: MultiWalletTransaction;
}> = props => (
  <Fragment>
    <span className="wallet-transactions__col">
      <NumberFormat
        value={formatCurrencyValue(
          props.transaction.amount,
          props.transaction.currencyFrom
        )}
        thousandSeparator=" "
        displayType="text"
        suffix={` ${props.transaction.currencyFrom}`}
      />
    </span>
    <span className="wallet-transactions__back-arrow">&rarr;</span>
    <span className="wallet-transactions__col">
      <NumberFormat
        value={formatCurrencyValue(
          props.transaction.amountTo,
          props.transaction.currencyTo
        )}
        thousandSeparator=" "
        displayType="text"
        suffix={` ${props.transaction.currencyTo}`}
      />
    </span>
  </Fragment>
);

class TransactionsRow extends React.Component<
  ITransactionRowProps,
  ITransactionRowState
> {
  state = {
    isOpen: false
  };
  openPopup = () => {
    this.setState({ isOpen: true });
  };
  closePopup = () => {
    this.setState({ isOpen: false });
  };
  render() {
    const { transaction, walletCurrency } = this.props;
    const isConvertAction = transaction.type === "Converting";
    return (
      <React.Fragment>
        <TransactionDetailsPopup
          transactionId={transaction.id}
          open={this.state.isOpen}
          onClose={this.closePopup}
        />
        <TableRow className="wallet-transactions__row" onClick={this.openPopup}>
          {!walletCurrency && (
            <TableCell className="wallet-transactions__cell wallet-transactions__cell--wallet">
              <div className="wallet-transactions__cell--wallet-wrapper">
                {isConvertAction ? (
                  <ConvertTransaction transaction={transaction} />
                ) : (
                  <Fragment>
                    <WalletImage
                      url={transaction.logoFrom}
                      imageClassName="wallet-transactions__icon"
                      alt={transaction.currencyFrom}
                    />
                    {transaction.currencyFrom}
                  </Fragment>
                )}
              </div>
            </TableCell>
          )}
          <TableCell className="wallet-transactions__cell wallet-transactions__cell--date">
            {moment(transaction.date).format("DD-MM-YYYY, hh:mm a")}
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
              <Profitability value={transaction.amount}>
                <NumberFormat
                  value={formatCurrencyValue(
                    transaction.amount,
                    transaction.currencyFrom
                  )}
                  thousandSeparator=" "
                  displayType="text"
                  allowNegative={false}
                  suffix={` ${transaction.currencyFrom}`}
                />
              </Profitability>
            )}
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
}

export default TransactionsRow;
