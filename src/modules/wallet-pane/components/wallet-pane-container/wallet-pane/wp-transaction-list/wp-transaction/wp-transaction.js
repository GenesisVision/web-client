import React from "react";
import "./wp-transaction.css";

const getTransactionTypeText = type => {
  var regex = /([A-Z])([A-Z])([a-z])|([a-z])([A-Z])/g;
  return type.replace(regex, "$1$4 $2$3$5");
};

const getProgramName = transaction => {
  if (transaction.investmentProgram) {
    return (
      <div className="wp-transaction__program">
        {transaction.investmentProgram.title}
      </div>
    );
  }
  return null;
};

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
          {transaction.amount} {transaction.currency}
        </div>
        <div className="wp-transaction__date">
          {new Date(transaction.date).toDateString()}
        </div>
      </div>
    </div>
  );
};

export default WPTransaction;
