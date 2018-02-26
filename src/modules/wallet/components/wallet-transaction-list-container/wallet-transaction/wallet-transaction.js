import React, { Component } from "react";

const WalletTransactionDetail = ({ isOpen, equivalent, transactionId }) => {
  if (!isOpen) return null;

  return (
    <div className="row wh-transaction-description mt-4">
      <div className="col-2">
        <div className="wh-transaction-description__header">Equivalent</div>
        <div className="wh-transaction-description__value">${equivalent}</div>
      </div>
      <div className="col-2">
        <div className="wh-transaction-description__header">Transaction Id</div>
        <div className="wh-transaction-description__value">{transactionId}</div>
      </div>
    </div>
  );
};

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
    return (
      <div className="list-group-item">
        <div className="row">
          <div className="col-2">{transaction.type}</div>
          <div className="col-7">
            {transaction.programName} (<span
              className="link"
              onClick={this.toggleDescription}
            >
              {transaction.amount} gvt
            </span>)
          </div>
          <div className="col-3">
            {new Date(transaction.date).toDateString()}
          </div>
        </div>
        <WalletTransactionDetail
          isOpen={this.state.isDescriptionOpen}
          equivalent={transaction.amount * transaction.rate}
          transactionId={transaction.transactionId}
        />
      </div>
    );
  }
}

export default WalletTransaction;
