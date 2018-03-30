import React, { Component } from "react";

import "./wallet-transaction.css";

import {
  getProgramName,
  getTransactionTypeText
} from "../../../../../helpers/transaction-helper";

// const WalletTransactionDetail = ({ isOpen, equivalent, transactionId }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="wallet-pane-transaction">
//       <div className="wh-transaction-description__header">Equivalent</div>
//       <div className="wh-transaction-description__value">${equivalent}</div>
//       <div className="wh-transaction-description__header">Transaction Id</div>
//       <div className="wh-transaction-description__value">{transactionId}</div>
//     </div>
//   );
// };

class WalletTransaction extends Component {
  state = {
    isDescriptionOpen: false
  };

  toggleDescription = () => {
    this.setState(function(prevState) {
      return {
        isDescriptionOpen: !prevState.isDescriptionOpen
      };
    });
  };

  render() {
    const { transaction } = this.props;
    const renderTransactionInfo = transaction => {
      return (
        <div className="wallet-transaction__type">
          <div className="wallet-transaction__name">
            {getTransactionTypeText(transaction.type)}
          </div>
          {getProgramName(transaction)}
        </div>
      );
    };
    return (
      <div className="wallet-transaction">
        {renderTransactionInfo(transaction)}
        <div className="wallet-transaction__info">
          <div className="wallet-transaction__amount">
            <div className="metric">
              <div className="metric__value">
                {transaction.amount}
                <div className="metric__bubble">{transaction.currency}</div>
              </div>
            </div>
          </div>
          <div className="wallet-transaction__date">
            {new Date(transaction.date).toDateString()}
          </div>
        </div>
      </div>
    );
  }
}

export default WalletTransaction;
