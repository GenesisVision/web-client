import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { Field } from "formik";
import React from "react";

import { WALLET_ROUTE } from "../../../../../wallet.constants";

const FilterLink = withRouter(({ history, filter, children }) => {
  return (
    <Link to={{ pathname: WALLET_ROUTE, search: `?filter=${filter}` }}>
      {children}
    </Link>
  );
});

const WalletTransactionFilter = ({ programs }) => {
  const programList = () => {
    const list = programs.map(x => (
      <option key={x.id} value={x.id}>
        {x.title}
      </option>
    ));

    list.unshift(
      <option key="" value="">
        Choose Program
      </option>
    );

    return list;
  };

  return (
    <div>
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
      <div>
        Program Name:
        <select name="brokerTradeServerId" component="select">
          {programList()}
        </select>
      </div>
    </div>
  );
};

export default WalletTransactionFilter;
