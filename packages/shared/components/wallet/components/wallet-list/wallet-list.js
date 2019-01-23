import "./wallet-list.scss";

import React, { Component } from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";
import Surface from "shared/components/surface/surface";
import TableCell from "shared/components/table/components/table-cell";
import TableContainer from "shared/components/table/components/table-container";
import TableRow from "shared/components/table/components/table-row";
import BTCIcon from "shared/media/currency/BTC.svg";
import EmptyTransactionsIcon from "shared/media/empty-wallet.svg";

import ArrowIcon from "../../../../media/arrow-up.svg";
import WalletAddFundsPopup from "../../../../modules/wallet-add-funds/wallet-add-funds-popup";
import WalletWithdrawPopup from "../../../../modules/wallet-withdraw/wallet-withdraw-popup";
import { composeProgramDetailsUrl } from "../../../../utils/compose-url";
import Chip from "../../../chip/chip";
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

  handleOpenAddFundsPopup = () => {
    this.setState({ isOpenAddFundsPopup: true });
  };

  handleCloseAddFundsPopup = () => {
    this.setState({ isOpenAddFundsPopup: false });
  };

  handleOpenWithdrawPopup = () => {
    this.setState({ isOpenWithdrawPopup: true });
  };

  handleCloseWithdrawPopup = () => {
    this.setState({ isOpenWithdrawPopup: false });
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
          renderBodyRow={() => {
            return (
              <TableRow className="wallet-list__row">
                <TableCell className="wallet-list__cell wallet-list__cell--currency">
                  <Link
                    className="wallet-list__link"
                    to={{
                      pathname: "/wallet-1",
                      state: "Bitcoin"
                    }}
                  >
                    <img
                      src={BTCIcon}
                      className="wallet-list__icon"
                      alt="Icon"
                    />
                    Bitcoin
                  </Link>
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
                <TableCell className="wallet-list__cell wallet-list__cell--buttons">
                  <Chip onClick={this.handleOpenWithdrawPopup}>
                    <img src={ArrowIcon} alt="Icon" />
                  </Chip>
                  <Chip
                    className="wallet-list__button-add-funds"
                    type="positive"
                    onClick={this.handleOpenAddFundsPopup}
                  >
                    +
                  </Chip>
                </TableCell>
              </TableRow>
            );
          }}
        />
        <WalletAddFundsPopup
          open={this.state.isOpenAddFundsPopup}
          onClose={this.handleCloseAddFundsPopup}
        />
        <WalletWithdrawPopup
          open={this.state.isOpenWithdrawPopup}
          onClose={this.handleCloseWithdrawPopup}
        />
      </Surface>
    );
  }
}

export default translate()(WalletList);
