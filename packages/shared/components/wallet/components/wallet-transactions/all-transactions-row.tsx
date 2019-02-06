import { MultiWalletTransaction } from "gv-api-web";
import moment from "moment";
import * as React from "react";
import { Fragment } from "react";
import NumberFormat from "react-number-format";

import SuccessTransactionsIcon from "../../../../media/transactions/success.svg";
import TransactionDetailsPopup from "../../../../modules/transaction-details/transaction-details-popup";
import { formatValue } from "../../../../utils/formatter";
import Profitability from "../../../profitability/profitability";
import TableCell from "../../../table/components/table-cell";
import TableRow from "../../../table/components/table-row";
import { getWalletIcon } from "../wallet-currency";

export interface ITransactionRowProps {
  transaction: MultiWalletTransaction;
}

export interface ITransactionRowState {
  isOpen: boolean;
}

const ConvertTransaction = () => {
  return (
    <Fragment>
      <span className="wallet-transactions__col">
        <img
          src={getWalletIcon("GVT")}
          className="wallet-transactions__icon"
          alt="Icon"
        />
        Genesis Vision
      </span>
      <span className="wallet-transactions__back-arrow">&rarr;</span>
      <span className="wallet-transactions__col">
        <img
          src={getWalletIcon("BTC")}
          className="wallet-transactions__icon"
          alt="Icon"
        />
        Bitcoin
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
        value={formatValue(props.transaction.amount)}
        thousandSeparator=" "
        displayType="text"
        suffix=" GVT"
      />
    </span>
    <span className="wallet-transactions__back-arrow">&rarr;</span>
    <span className="wallet-transactions__col">
      <NumberFormat
        value={formatValue(props.transaction.amount)}
        thousandSeparator=" "
        displayType="text"
        suffix=" BTC"
      />
    </span>
  </Fragment>
);

class AllTransactionsRow extends React.Component<
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
    const { transaction } = this.props;
    const isConvertAction = transaction.type === "Converting";
    return (
      <TableRow className="wallet-transactions__row">
        <TableCell className="wallet-transactions__cell wallet-transactions__cell--wallet">
          {isConvertAction ? (
            <ConvertTransaction />
          ) : (
            <Fragment>
              <img
                src={getWalletIcon("GVT")}
                className="wallet-transactions__icon"
                alt="Icon"
              />
              <button onClick={this.openPopup}>Genesis Vision</button>
              <TransactionDetailsPopup
                transactionId={transaction.id}
                open={this.state.isOpen}
                onClose={this.closePopup}
              />
            </Fragment>
          )}
        </TableCell>
        <TableCell className="wallet-transactions__cell wallet-transactions__cell--date">
          {moment(transaction.date).format("DD-MM-YYYY, hh:mm a")}
        </TableCell>
        <TableCell className="wallet-transactions__cell wallet-transactions__cell--type">
          <img
            src={SuccessTransactionsIcon}
            className="wallet-transactions__icon"
            alt="TransactionsIcon"
          />
        </TableCell>
        <TableCell className="wallet-transactions__cell wallet-transactions__cell--information">
          {transaction.description}
        </TableCell>
        <TableCell className="wallet-transactions__cell wallet-transactions__cell--amount">
          {isConvertAction ? (
            <AmountConvertTransaction transaction={transaction} />
          ) : (
            <Profitability value={formatValue(transaction.amount)}>
              <NumberFormat
                value={formatValue(transaction.amount)}
                thousandSeparator=" "
                displayType="text"
                suffix=" GVT"
              />
            </Profitability>
          )}
        </TableCell>
      </TableRow>
    );
  }
}

export default AllTransactionsRow;
