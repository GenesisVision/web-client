import React, { Component } from "react";

const WHTransactionDescription = ({ isOpen, description }) => {
  if (!isOpen) return null;

  return (
    <div className="row wh-transaction-description mt-4">
      <div className="col-3">
        <div className="wh-transaction-description__header">Status</div>
        <div className="wh-transaction-description__value">Pending</div>
      </div>
      <div className="col-3">
        <div className="wh-transaction-description__header">Date</div>
        <div className="wh-transaction-description__value">2018-02-14</div>
      </div>
      <div className="col-3">
        <div className="wh-transaction-description__header">Transaction Id</div>
        <div className="wh-transaction-description__value">
          0x777f620f020b4c6765d600ea7832fb94286d9462acbfef30b2e49df6220f2fe8
        </div>
      </div>
    </div>
  );
};

class WHTransaction extends Component {
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
          <div className="col-2">{transaction.direction}</div>
          <div className="col-7">
            {transaction.programName} (<span
              className="link"
              onClick={this.toggleDescription}
            >
              {transaction.amount} gvt
            </span>)
          </div>
          <div className="col-3">{transaction.date}</div>
        </div>
        <WHTransactionDescription
          isOpen={this.state.isDescriptionOpen}
          description={transaction.description}
        />
      </div>
    );
  }
}

export default WHTransaction;
