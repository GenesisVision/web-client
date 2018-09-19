import "./program-details-chart.scss";

import Surface from "components/surface/surface";
import {
  Table,
  TableCell,
  TableHeadCell,
  TableRow
} from "modules/table/components";
import DateRangeFilter from "modules/table/components/filtering/date-range-filter/date-range-filter";
import { DATE_RANGE_FILTER_NAME } from "modules/table/components/filtering/date-range-filter/date-range-filter.constants";
import moment from "moment";
import React, { Fragment } from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";

import { DEFAULT_PAGING } from "../../../../../modules/table/reducers/table-paging.reducer";
import { fetchWalletTransactions } from "../../services/wallet.services";
import {
  WALLET_TRANSACTIONS_COLUMNS,
  WALLET_TRANSACTIONS_DEFAULT_FILTERING,
  WALLET_TRANSACTIONS_FILTERS
} from "./wallet-transactions.constants";

const WalletTransactions = ({ t }) => (
  <Surface className="wallet-transactions-container">
    <TableModule
      defaultFilters={WALLET_TRANSACTIONS_FILTERS}
      getItems={fetchWalletTransactions}
      filtering={WALLET_TRANSACTIONS_DEFAULT_FILTERING}
      renderFilters={(updateFilter, filtering) => (
        <Fragment>
          <DateRangeFilter
            name={DATE_RANGE_FILTER_NAME}
            value={filtering[DATE_RANGE_FILTER_NAME]}
            onChange={updateFilter}
          />
        </Fragment>
      )}
      paging={DEFAULT_PAGING}
      columns={WALLET_TRANSACTIONS_COLUMNS}
      renderHeader={({ column, sortingName, isAsc }) => (
        <TableHeadCell
          key={column.name}
          className={`wallet-transactions__cell wallet-transactions__cell--${
            column.name
          }`}
          sortable={false}
          active={false}
        >
          {t(`program-details-page.history.trades.${column.name}`)}
        </TableHeadCell>
      )}
      renderBodyRow={transaction => (
        <TableRow className="wallet-transactions__row">
          <TableCell className="wallet-transactions__cell wallet-transactions__cell--date">
            {moment(transaction.date).format("DD-MM-YYYY, hh:mm a")}
          </TableCell>
          <TableCell className="wallet-transactions__cell wallet-transactions__cell--Type">
            {transaction.type}
          </TableCell>
          <TableCell className="wallet-transactions__cell wallet-transactions__cell--description">
            {transaction.description}
          </TableCell>
          <TableCell className="wallet-transactions__cell wallet-transactions__cell--amount">
            <Profitability value={transaction.amount}>
              <NumberFormat
                value={Math.abs(transaction.amount)}
                decimalScale={2}
                displayType="text"
              />
            </Profitability>
          </TableCell>
        </TableRow>
      )}
    />
  </Surface>
);

export default translate()(WalletTransactions);
