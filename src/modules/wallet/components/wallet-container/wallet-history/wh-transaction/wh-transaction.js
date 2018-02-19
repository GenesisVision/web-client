import React from "react";

const WHTransaction = ({ transaction }) => {
  return (
    <div className="list-group-item">
      <div className="row">
        <div className="col-2">{transaction.direction}</div>
        <div className="col-7">
          {transaction.programName} ({transaction.amount})
        </div>
        <div className="col-3">{transaction.date}</div>
      </div>
    </div>
  );
};

export default WHTransaction;
