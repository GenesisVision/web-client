import React from "react";

export const getTransactionTypeText = type => {
  var regex = /([A-Z])([A-Z])([a-z])|([a-z])([A-Z])/g;
  return type.replace(regex, "$1$4 $2$3$5");
};

export const getProgramName = transaction => {
  if (transaction.investmentProgram) {
    return (
      <div className="wp-transaction__program">
        {transaction.investmentProgram.title}
      </div>
    );
  }
  return null;
};
