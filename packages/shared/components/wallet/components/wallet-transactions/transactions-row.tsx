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
import filesService from "shared/services/file-service";
import { formatCurrencyValue } from "shared/utils/formatter";

export interface ITransactionRowProps {
  transaction: MultiWalletTransaction;
  walletCurrency?: string;
  update?(): void;
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
  handleAction = () => {
    if (this.props.update) this.props.update();
    this.closePopup();
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
          onAction={this.handleAction}
        />
        <TableRow className="wallet-transactions__row" onClick={this.openPopup}>
          {!walletCurrency && (
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
          )}
          <TableCell className="wallet-transactions__cell wallet-transactions__cell--date">
            {moment(transaction.date).format("lll")}
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
