import "./wallet-transactions.scss";

import Profitability from "components/profitability/profitability";
import Surface from "components/surface/surface";
import { TableCell, TableRow } from "modules/table/components";
import { ASSET_TYPE_FILTER_VALUES } from "modules/table/components/filtering/asset-type-filter/asset-type-filter.constants";
import DateRangeFilter from "modules/table/components/filtering/date-range-filter/date-range-filter";
import { DATE_RANGE_FILTER_NAME } from "modules/table/components/filtering/date-range-filter/date-range-filter.constants";
import SelectFilter from "modules/table/components/filtering/select-filter/select-filter";
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
  WALLET_TRANSACTIONS_TYPES_ENUM,
  WALLET_TRANSACTION_ACTIONS_VALUES
} from "./wallet-transactions.constants";

const WalletTransactions = ({ t }) => (
  <Surface className="wallet-transactions">
    <TableModule
      title="Transactions"
      defaultFilters={WALLET_TRANSACTIONS_FILTERS}
      getItems={fetchWalletTransactions}
      filtering={WALLET_TRANSACTIONS_DEFAULT_FILTERING}
      renderFilters={(updateFilter, filtering) => (
        <Fragment>
          <SelectFilter
            name="txAction"
            label="Type"
            value={filtering["txAction"]}
            values={WALLET_TRANSACTION_ACTIONS_VALUES}
            onChange={updateFilter}
          />
          <SelectFilter
            name="assetType"
            label="Assets type"
            value={filtering["assetType"]}
            values={ASSET_TYPE_FILTER_VALUES}
            onChange={updateFilter}
          />
          <DateRangeFilter
            name={DATE_RANGE_FILTER_NAME}
            value={filtering["dateRange"]}
            onChange={updateFilter}
          />
        </Fragment>
      )}
      paging={DEFAULT_PAGING}
      columns={WALLET_TRANSACTIONS_COLUMNS}
      renderHeader={column => (
        <span
          className={`wallet-transactions__cell wallet-transactions__cell--${
            column.name
          }`}
        >
          {t(`wallet.transactions.${column.name}`)}
        </span>
      )}
      renderBodyRow={transaction => (
        <TableRow className="wallet-transactions__row">
          <TableCell className="wallet-transactions__cell wallet-transactions__cell--date">
            {moment(transaction.date).format("DD-MM-YYYY, hh:mm a")}
          </TableCell>
          <TableCell className="wallet-transactions__cell wallet-transactions__cell--type">
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
              {transaction.sourceCurrency !== "Undefined" &&
                " " + transaction.sourceCurrency}
            </Profitability>
          </TableCell>
        </TableRow>
      )}
    />
  </Surface>
);

export default translate()(WalletTransactions);
