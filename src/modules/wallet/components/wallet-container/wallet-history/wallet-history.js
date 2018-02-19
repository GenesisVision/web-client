import { connect } from "react-redux";
import React, { Component } from "react";

import WHTransactionList from "./wh-transaction-list/wh-transaction-list";

class WalletHistory extends Component {
  componentWillMount() {
    this.props.fetchTransactions();
  }

  render() {
    return <WHTransactionList transactions={this.props.transactions} />;
  }
}

const mapStateToProps = state => {
  const transactions = [
    {
      id: 1,
      direction: "In",
      programName: "Program name",
      amount: 100.1,
      date: "3sec ago"
    },
    {
      id: 2,
      direction: "Out",
      programName: "Program name",
      amount: 100.1,
      date: "5min ago"
    },
    {
      id: 3,
      direction: "In",
      programName: "Program name 1",
      amount: 23400.1,
      date: "2hour ago"
    },
    {
      id: 4,
      direction: "Out",
      programName: "Program name 1",
      amount: 33400.1,
      date: "5hour ago"
    }
  ];
  return { transactions };
};

const mapDispatchToProps = dispatch => ({
  fetchTransactions: () => {}
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletHistory);
