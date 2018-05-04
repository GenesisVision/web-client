import React from "react";
import { Link } from "react-router-dom";
import { PROGRAMS_ROUTE } from '../../programs/programs.constants';

export const getTransactionTypeText = type => {
  var regex = /([A-Z])([A-Z])([a-z])|([a-z])([A-Z])/g;
  return type.replace(regex, "$1$4 $2$3$5");
};

export const getProgramName = transaction => {
  if (transaction.investmentProgram) {
    return (
      <div className="wp-transaction__program">
        <Link to={`${PROGRAMS_ROUTE}/${transaction.investmentProgram.id}`}>{transaction.investmentProgram.title}</Link>
      </div>
    );
  }
  return null;
};
