import React from "react";

import "./wp-transaction.css";

import {
  getProgramName,
  getTransactionTypeText
} from "../../../../../../../wallet/helpers/transaction-helper";

const WPTransaction = ({ transaction }) => {
  const renderTransactionInfo = transaction => {
    return (
      <div className="wp-transaction__type">
        <div className="wp-transaction__name">
          {getTransactionTypeText(transaction.type)}
        </div>
        {getProgramName(transaction)}
      </div>
    );
  };
  return (
    <div className="wp-transaction">
      {renderTransactionInfo(transaction)}
      <div className="wp-transaction__info">
        <div className="wp-transaction__amount">
          {+transaction.amount.toFixed(2)} {transaction.currency}
        </div>
        <div className="wp-transaction__date">
          {new Date(transaction.date).toDateString()}
        </div>
      </div>
    </div>
  );
};

export default WPTransaction;
