import { MultiWalletExternalTransaction } from "gv-api-web";
import moment from "moment";
import * as React from "react";
import NumberFormat from "react-number-format";

import TransactionDetailsPopup from "shared/modules/transaction-details/transaction-details-popup";
import { formatCurrencyValue } from "shared/utils/formatter";
import Profitability from "shared/components/profitability/profitability";
import TableCell from "shared/components/table/components/table-cell";
import TableRow from "shared/components/table/components/table-row";
import WalletCopytradingActions from "./wallet-copytrading-action-cell";
import GVTIcon from "shared/media/currency/GVT.svg";

export interface ITransactionRowProps {
  transaction: MultiWalletExternalTransaction;
}

export interface ITransactionRowState {
  isOpen: boolean;
}

class WalletCopytradingRow extends React.Component<
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
          className="wallet-copytrading__row"
          // onClick={this.openPopup}
        >
          <TableCell className="wallet-copytrading__cell wallet-copytrading__cell--currency">
            <img
              src={GVTIcon}
              className="wallet-copytrading__icon"
              alt="Icon"
            />
            Genesis Vision
          </TableCell>
          <TableCell className="wallet-copytrading__cell wallet-copytrading__cell--balance">
            <Profitability
              value={formatCurrencyValue(
                100, //transaction.balance,
                transaction.currency
              )}
            >
              <NumberFormat
                value={formatCurrencyValue(
                  100, //transaction.balance,
                  transaction.currency
                )}
                thousandSeparator=" "
                displayType="text"
                suffix={` ${transaction.currency}`}
              />
            </Profitability>
          </TableCell>
          <TableCell className="wallet-copytrading__cell wallet-copytrading__cell--equity">
            <Profitability
              value={formatCurrencyValue(
                100, //transaction.equity,
                transaction.currency
              )}
            >
              <NumberFormat
                value={formatCurrencyValue(
                  100, //100, //transaction.equity,
                  transaction.currency
                )}
                thousandSeparator=" "
                displayType="text"
                suffix={` ${transaction.currency}`}
              />
            </Profitability>
          </TableCell>
          <TableCell className="wallet-copytrading__cell wallet-copytrading__cell--freeMargin">
            <Profitability
              value={formatCurrencyValue(
                100, //transaction.freeMargin,
                transaction.currency
              )}
            >
              <NumberFormat
                value={formatCurrencyValue(
                  100, //transaction.freeMargin,
                  transaction.currency
                )}
                thousandSeparator=" "
                displayType="text"
                suffix={` ${transaction.currency}`}
              />
            </Profitability>
          </TableCell>
          <TableCell className="wallet-copytrading__cell wallet-copytrading__cell--actions">
            <WalletCopytradingActions />
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
}

export default WalletCopytradingRow;
