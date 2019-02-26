import { MultiWalletExternalTransaction } from "gv-api-web";
import moment from "moment";
import * as React from "react";
import { Fragment } from "react";
import NumberFormat from "react-number-format";
import Profitability from "shared/components/profitability/profitability";
import TableCell from "shared/components/table/components/table-cell";
import TableRow from "shared/components/table/components/table-row";
import TransactionDetailsPopup from "shared/modules/transaction-details/transaction-details-popup";
import { formatCurrencyValue } from "shared/utils/formatter";
import WalletImage from "shared/components/avatar/wallet-image/wallet-image";

export interface ITransactionRowProps {
  transaction: MultiWalletExternalTransaction;
}

export interface ITransactionRowState {
  isOpen: boolean;
}

class AllDepositsWithdrawalsRow extends React.Component<
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
    return (
      <React.Fragment>
        <TransactionDetailsPopup
          transactionId={transaction.id}
          open={this.state.isOpen}
          onClose={this.closePopup}
        />
        <TableRow
          className="wallet-deposits-withdrawals__row"
          onClick={this.openPopup}
        >
          <TableCell className="wallet-deposits-withdrawals__cell wallet-deposits-withdrawals__cell--wallet">
            <WalletImage
              url={transaction.logo}
              alt={transaction.currency}
              className="wallet-deposits-withdrawals__icon-container"
              imageClassName="wallet-deposits-withdrawals__icon"
            />
            {transaction.currency}
          </TableCell>
          <TableCell className="wallet-deposits-withdrawals__cell wallet-deposits-withdrawals__cell--date">
            {moment(transaction.date).format("DD-MM-YYYY, hh:mm a")}
          </TableCell>
          <TableCell className="wallet-deposits-withdrawals__cell wallet-deposits-withdrawals__cell--status">
            {(transaction.statusUrl && (
              <a href={transaction.statusUrl} target="_blank">
                {transaction.status}
              </a>
            )) || <Fragment>{transaction.status}</Fragment>}
          </TableCell>
          <TableCell className="wallet-deposits-withdrawals__cell wallet-deposits-withdrawals__cell--amount">
            <Profitability
              value={formatCurrencyValue(
                transaction.amount,
                transaction.currency
              )}
            >
              <NumberFormat
                value={formatCurrencyValue(
                  transaction.amount,
                  transaction.currency
                )}
                thousandSeparator=" "
                displayType="text"
                suffix={` ${transaction.currency}`}
              />
            </Profitability>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
}

export default AllDepositsWithdrawalsRow;
