import "./wallet-list.scss";

import React, { Component } from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import Surface from "shared/components/surface/surface";
import TableCell from "shared/components/table/components/table-cell";
import TableContainer from "shared/components/table/components/table-container";
import TableRow from "shared/components/table/components/table-row";
import BTCIcon from "shared/media/currency/BTC.svg";
import EmptyTransactionsIcon from "shared/media/empty-wallet.svg";
import authService from "shared/services/auth-service";
import { formatValue } from "shared/utils/formatter";

import { fetchWalletTransactions } from "../../services/wallet.services";
import { walletTableTransactionsSelector } from "../wallet-transactions/wallet-transactions.selector";
import { WALLET_LIST_COLUMNS } from "./wallet-list.constants";

const emptyWallets = t => (
  <div className="empty-wallets">
    <div className="empty-wallets__subtitle">
      {t("wallet-page.transactions.title")}
    </div>
    <div className="empty-wallets__disclaimer">
      <div className="empty-wallets__icon">
        <img src={EmptyTransactionsIcon} alt="" />
      </div>
      <div className="empty-wallets__text">
        {t("wallet-page.transactions.empty-wallets")}
      </div>
    </div>
  </div>
);

class WalletList extends Component {
  state = {
    transactionsCount: []
  };

  render() {
    const { t, createButtonToolbar } = this.props;
    return (
      <Surface className="wallet-list">
        <TableContainer
          isFetchOnMount
          createButtonToolbar={createButtonToolbar}
          getItems={fetchWalletTransactions}
          dataSelector={walletTableTransactionsSelector}
          columns={WALLET_LIST_COLUMNS}
          renderHeader={column => (
            <span
              className={`wallet-list__cell wallet-list__cell--${column.name}`}
            >
              {t(`wallet-page.list.${column.name}`)}
            </span>
          )}
          renderBodyRow={transaction => {
            return (
              <TableRow className="wallet-list__row">
                <TableCell className="wallet-list__cell wallet-list__cell--currency">
                  <img src={BTCIcon} className="wallet-list__icon" alt="Icon" />
                  Bitcoin
                </TableCell>
                <TableCell className="wallet-list__cell">
                  <NumberFormat
                    value={547.678}
                    thousandSeparator=" "
                    displayType="text"
                  />
                </TableCell>
                <TableCell className="wallet-list__cell">
                  <NumberFormat
                    value={547.678}
                    thousandSeparator=" "
                    displayType="text"
                  />
                </TableCell>
                <TableCell className="wallet-list__cell">
                  <NumberFormat
                    value={547.678}
                    thousandSeparator=" "
                    displayType="text"
                  />
                </TableCell>
                <TableCell className="wallet-list__cell">
                  <NumberFormat
                    value={547.678}
                    thousandSeparator=" "
                    displayType="text"
                  />
                </TableCell>
                <TableCell className="wallet-list__cell wallet-list__cell--buttons" />
              </TableRow>
            );
          }}
        />
      </Surface>
    );
  }
}

export default translate()(WalletList);
