import { MultiWalletTransaction } from "gv-api-web";
import moment from "moment";
import * as React from "react";
import { Fragment } from "react";
import NumberFormat from "react-number-format";
import filesService from "shared/services/file-service";

import SuccessTransactionsIcon from "../../../../media/transactions/success.svg";
import TransactionDetailsPopup from "../../../../modules/transaction-details/transaction-details-popup";
import { formatValue } from "../../../../utils/formatter";
import Profitability from "../../../profitability/profitability";
import TableCell from "../../../table/components/table-cell";
import TableRow from "../../../table/components/table-row";

export interface ITransactionRowProps {
  transaction: MultiWalletTransaction;
}

export interface ITransactionRowState {
  isOpen: boolean;
}

const ConvertTransaction: React.FunctionComponent<
  ITransactionRowProps
> = props => {
  return (
    <Fragment>
      <span className="wallet-transactions__col">
        <img
          src={filesService.getFileUrl(props.transaction.logoFrom)}
          className="wallet-transactions__icon"
          alt="Icon"
        />
        {props.transaction.currencyFrom}
      </span>
      <span className="wallet-transactions__back-arrow">&rarr;</span>
      <span className="wallet-transactions__col">
        <img
          src={filesService.getFileUrl(props.transaction.logoTo)}
          className="wallet-transactions__icon"
          alt="Icon"
        />
        {props.transaction.currencyTo}
      </span>
    </Fragment>
  );
};

const AmountConvertTransaction: React.FunctionComponent<{
  transaction: MultiWalletTransaction;
}> = props => (
  <span className="wallet-transactions__col">
    <NumberFormat
      value={formatValue(props.transaction.amount)}
      thousandSeparator=" "
      displayType="text"
      suffix=" GVT"
    />
  </span>
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
      <React.Fragment>
        <TransactionDetailsPopup
          transactionId={transaction.id}
          open={this.state.isOpen}
          onClose={this.closePopup}
        />
        <TableRow className="wallet-transactions__row" onClick={this.openPopup}>
          <TableCell className="wallet-transactions__cell wallet-transactions__cell--wallet">
            {isConvertAction ? (
              <ConvertTransaction transaction={transaction} />
            ) : (
              <Fragment>
                <img
                  src={filesService.getFileUrl(transaction.logoFrom)}
                  className="wallet-transactions__icon"
                  alt="Icon"
                />
                {transaction.currencyFrom}
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
      </React.Fragment>
    );
  }
}

export default AllTransactionsRow;
