import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import React from "react";

import { WALLET_ROUTE } from "../../../../wallet.constants";

const FilterLink = withRouter(({ history, filter, children }) => (
  <Link to={{ pathname: WALLET_ROUTE, search: `?filter=${filter}` }}>
    {children}
  </Link>
));

const WalletTransactionFilter = ({ selectFilter }) => {
  return (
    <ul className="nav nav-pills">
      <li className="mr-4">
        <FilterLink filter={"All"}>All</FilterLink>
      </li>
      <li className="mr-4">
        <FilterLink filter={"External"}>External</FilterLink>
      </li>
      <li>
        <FilterLink filter={"Internal"}>Internal</FilterLink>
      </li>
    </ul>
  );
};

export default WalletTransactionFilter;
