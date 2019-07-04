import { MultiWalletTransaction } from "gv-api-web";
import moment from "moment";
import * as React from "react";
import { Fragment } from "react";
import NumberFormat from "react-number-format";
import WalletImage from "shared/components/avatar/wallet-image/wallet-image";
import Profitability from "shared/components/profitability/profitability";
import Status from "shared/components/status/status";
import TableCell from "shared/components/table/components/table-cell";
import TableRow from "shared/components/table/components/table-row";
import { DEFAULT_DECIMAL_SCALE } from "shared/constants/constants";
import TransactionDetailsPopup from "shared/modules/transaction-details/transaction-details-popup";
import { formatValue } from "shared/utils/formatter";

export interface ITransactionRowProps {
  transaction: MultiWalletTransaction;
  walletCurrency?: string;
  update?(): void;
}

export interface ITransactionRowState {
  isOpen: boolean;
}

const ConvertTransaction: React.FC<ITransactionRowProps> = React.memo(
  ({ transaction }) => (
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
  )
);

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

class TransactionsRow extends React.PureComponent<
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
      </React.Fragment>
    );
  }
}

export default TransactionsRow;
