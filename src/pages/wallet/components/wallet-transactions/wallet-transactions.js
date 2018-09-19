import "./wallet-transactions.scss";

import Profitability from "components/profitability/profitability";
import Surface from "components/surface/surface";
import { TableCell, TableHeadCell, TableRow } from "modules/table/components";
import DateRangeFilter from "modules/table/components/filtering/date-range-filter/date-range-filter";
import {
  DATE_RANGE_FILTER_NAME,
  DEFAULT_DATE_RANGE_FILTER_VALUE
} from "modules/table/components/filtering/date-range-filter/date-range-filter.constants";
import TableModule from "modules/table/components/table-module";
import { DEFAULT_PAGING } from "modules/table/reducers/table-paging.reducer";
import moment from "moment";
import React, { Fragment } from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";

import { fetchWalletTransactions } from "../../services/wallet.services";
import {
  WALLET_TRANSACTIONS_COLUMNS,
  WALLET_TRANSACTIONS_DEFAULT_FILTERING,
  WALLET_TRANSACTIONS_FILTERS,
  WALLET_TRANSACTIONS_TYPES_ENUM
} from "./wallet-transactions.constants";

const walletTransactionsFiltering = {
  dateRange: DEFAULT_DATE_RANGE_FILTER_VALUE
};

const WalletTransactions = ({ t }) => (
  <Surface className="wallet-transactions-container">
    <TableModule
      title="Transactions"
      defaultFilters={WALLET_TRANSACTIONS_FILTERS}
      getItems={fetchWalletTransactions}
      filtering={WALLET_TRANSACTIONS_DEFAULT_FILTERING}
      renderFilters={(updateFilter, filtering) => (
        <Fragment>
          <DateRangeFilter
            name={DATE_RANGE_FILTER_NAME}
            value={DEFAULT_DATE_RANGE_FILTER_VALUE}
            onChange={updateFilter}
          />
        </Fragment>
      )}
      paging={DEFAULT_PAGING}
      columns={WALLET_TRANSACTIONS_COLUMNS}
      renderHeader={column => (
        <TableHeadCell
          key={column.name}
          className={`wallet-transactions__cell wallet-transactions__cell--${
            column.name
          }`}
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
            {t(
              `wallet.transactions-types.${
                WALLET_TRANSACTIONS_TYPES_ENUM[transaction.sourceType]
              }`
            )}
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
