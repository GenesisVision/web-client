import { MultiWalletExternalTransaction } from "gv-api-web";
import moment from "moment";
import * as React from "react";
import NumberFormat from "react-number-format";

import TransactionDetailsPopup from "../../../../modules/transaction-details/transaction-details-popup";
import { formatCurrencyValue } from "../../../../utils/formatter";
import Profitability from "../../../profitability/profitability";
import TableCell from "../../../table/components/table-cell";
import TableRow from "../../../table/components/table-row";
import GVTIcon from "shared/media/currency/GVT.svg";

export interface ITransactionRowProps {
  transaction: MultiWalletExternalTransaction;
}

export interface ITransactionRowState {
  isOpen: boolean;
}

class DepositsWithdrawalsRow extends React.Component<
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
        <TableRow className="wallet-deposits-withdrawals__row" onClick={this.openPopup}>
          <TableCell className="wallet-deposits-withdrawals__cell wallet-deposits-withdrawals__cell--date">
            {moment(transaction.date).format("DD-MM-YYYY, hh:mm a")}
          </TableCell>
          <TableCell className="wallet-deposits-withdrawals__cell wallet-deposits-withdrawals__cell--status">
            <a href={transaction.statusUrl} target="_blank">
              {transaction.status}
            </a>
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

export default DepositsWithdrawalsRow;
