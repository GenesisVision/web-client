import "./wallet-copytrading.scss";

import moment from "moment";
import React, { Component, Fragment } from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import Profitability from "shared/components/profitability/profitability";
import DateRangeFilter from "shared/components/table/components/filtering/date-range-filter/date-range-filter";
import {
  DATE_RANGE_FILTER_NAME,
  DEFAULT_DATE_RANGE_FILTER_VALUE
} from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import { composeDefaultDateRangeFilter } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.helpers";
import SelectFilter from "shared/components/table/components/filtering/select-filter/select-filter";
import TableCell from "shared/components/table/components/table-cell";
import TableModule from "shared/components/table/components/table-module";
import TableRow from "shared/components/table/components/table-row";
import { FilterType } from "shared/components/table/helpers/filtering.helpers";
import { DEFAULT_PAGING } from "shared/components/table/reducers/table-paging.reducer";
import { reduceFilters } from "shared/components/wallet/components/wallet-transactions/wallet-transaction-type-filter.helpers";
import GVTIcon from "shared/media/currency/GVT.svg";
import TransactionDetailsPopup from "shared/modules/transaction-details/transaction-details-popup";
import { formatCurrencyValue } from "shared/utils/formatter";

import { fetchCopytradingAccounts } from "../../services/wallet.services";
import AllDepositsWithdrawalsRow from "../wallet-deposits-withdrawals/all-deposits-withdrawals-row";
import WalletCopytradingActions from "./wallet-copytrading-action-cell";
import WalletCopytradingRow from "./wallet-copytrading-row";
import { WALLET_COPYTRADING_COLUMNS } from "./wallet-copytrading.constants";

class WalletCopytrading extends Component {
  fetchCopytradingAccounts = () => {
    return fetchCopytradingAccounts();
  };

  render() {
    const { t } = this.props;
    return (
      <div className="wallet-copytrading">
        <TableModule
          paging={DEFAULT_PAGING}
          getItems={this.fetchCopytradingAccounts}
          columns={WALLET_COPYTRADING_COLUMNS}
          renderHeader={column => (
            <span
              className={`wallet-copytrading__cell wallet-copytrading__cell--${
                column.name
              }`}
            >
              {t(`wallet-page.copytrading.${column.name}`)}
            </span>
          )}
          renderBodyRow={wallet => <WalletCopytradingRow wallet={wallet} />}
        />
      </div>
    );
  }
}

export default translate()(WalletCopytrading);
