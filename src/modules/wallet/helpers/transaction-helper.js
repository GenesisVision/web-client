import React from "react";
import { Link } from "react-router-dom";
import replaceParams from "../../../utils/replace-params";
import { PROGRAM_ROUTE } from "../../program/program.constants";

export const getTransactionTypeText = type => {
  var regex = /([A-Z])([A-Z])([a-z])|([a-z])([A-Z])/g;
  return type.replace(regex, "$1$4 $2$3$5");
};

export const getProgramName = transaction => {
  if (transaction.investmentProgram) {
    return (
      <Link
        className="wp-transaction__program"
        to={replaceParams(PROGRAM_ROUTE, {
          ":programId": transaction.investmentProgram.id
        })}
      >
        {transaction.investmentProgram.title}
      </Link>
    );
  }
  return null;
};
