import { Link } from "react-router-dom";
import React from "react";

import WPTransaction from "./wp-transaction/wp-transaction";

import "./wp-transaction-list.css";
import { WALLET_ROUTE } from "../../../../../../wallet/wallet.constants";

const WPTransactionList = ({ transactions }) => {
  return (
    <div className="wp-transaction-list">
      <div className="wp-transaction-list__header">Latest Transactions</div>
      <div className="wp-transaction-list__items">
        {transactions.map(x => <WPTransaction key={x.id} transaction={x} />)}
      </div>
      <div className="wp-transaction-list__all-transactions">
        <Link to={WALLET_ROUTE}>See all transactions</Link>
      </div>
    </div>
  );
};

export default WPTransactionList;
