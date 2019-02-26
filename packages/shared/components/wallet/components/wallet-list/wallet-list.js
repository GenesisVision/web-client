import "./wallet-list.scss";

import { WalletData } from "gv-api-web";
import React, { Component } from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";
import Chip from "shared/components/chip/chip";
import TableCell from "shared/components/table/components/table-cell";
import TableModule from "shared/components/table/components/table-module";
import TableRow from "shared/components/table/components/table-row";
import { DEFAULT_PAGING } from "shared/components/table/reducers/table-paging.reducer";
import { composeWalletCurrencytUrl } from "shared/components/wallet/wallet.routes";
import ArrowIcon from "shared/media/arrow-up.svg";
import ConvertIcon from "shared/media/convert.svg";
import WalletAddFundsPopup from "shared/modules/wallet-add-funds/wallet-add-funds-popup";
import WalletTransferPopup from "shared/modules/wallet-transfer/wallet-transfer-popup";
import WalletWithdrawPopup from "shared/modules/wallet-withdraw/wallet-withdraw-popup";
import filesService from "shared/services/file-service";
import { formatCurrencyValue } from "shared/utils/formatter";

import { walletTableTransactionsSelector } from "../wallet-transactions/wallet-transactions.selector";
import { WALLET_LIST_COLUMNS } from "./wallet-list.constants";

class WalletList extends Component {
  state = {
    isOpenAddFundsPopup: false,
    isOpenWithdrawPopup: false,
    isOpenTransferPopup: false,
    currentWallet: {}
  };

  handleOpenAddFundsPopup = wallet => () => {
    const { currency, available } = wallet;
    this.setState({
      isOpenAddFundsPopup: true,
      currentWallet: { currency, available }
    });
  };

  handleCloseAddFundsPopup = () => {
    this.setState({ isOpenAddFundsPopup: false, currentWallet: {} });
  };

  handleOpenWithdrawPopup = wallet => () => {
    this.setState({ isOpenWithdrawPopup: true, currentWallet: wallet });
  };

  handleCloseWithdrawPopup = () => {
    this.setState({ isOpenWithdrawPopup: false, currentWallet: {} });
  };

  handleOpenTransferPopup = wallet => () => {
    this.setState({ isOpenTransferPopup: true, currentWallet: wallet });
  };

  handleCloseTransferPopup = () => {
    this.setState({ isOpenTransferPopup: false, currentWallet: {} });
  };

  render() {
    const { t, createButtonToolbar, wallets } = this.props;
    return (
      <div className="wallet-list">
        <TableModule
          paging={DEFAULT_PAGING}
          createButtonToolbar={createButtonToolbar}
          data={{ items: wallets, total: wallets.length }}
          dataSelector={walletTableTransactionsSelector}
          columns={WALLET_LIST_COLUMNS}
          renderHeader={column => (
            <span
              className={`wallet-list__cell wallet-list__cell--${column.name}`}
            >
              {t(`wallet-page.list.${column.name}`)}
            </span>
          )}
          renderBodyRow={(wallet: WalletData) => {
            return (
              <TableRow className="wallet-list__row">
                <TableCell className="wallet-list__cell wallet-list__cell--wallet">
                  <Link
                    className="wallet-list__link"
                    to={{
                      pathname: composeWalletCurrencytUrl(
                        wallet.currency.toLowerCase()
                      ),
                      state: "Wallet"
                    }}
                  >
                    <img
                      src={filesService.getFileUrl(wallet.logo)}
                      className="wallet-list__icon"
                      alt="Icon"
                    />
                    {wallet.currency}
                  </Link>
                </TableCell>
                <TableCell className="wallet-list__cell">
                  <NumberFormat
                    value={formatCurrencyValue(wallet.total, wallet.currency)}
                    thousandSeparator=" "
                    displayType="text"
                  />
                </TableCell>
                <TableCell className="wallet-list__cell">
                  <NumberFormat
                    value={formatCurrencyValue(
                      wallet.available,
                      wallet.currency
                    )}
                    thousandSeparator=" "
                    displayType="text"
                  />
                </TableCell>
                <TableCell className="wallet-list__cell">
                  <NumberFormat
                    value={formatCurrencyValue(
                      wallet.invested,
                      wallet.currency
                    )}
                    thousandSeparator=" "
                    displayType="text"
                  />
                </TableCell>
                <TableCell className="wallet-list__cell">
                  <NumberFormat
                    value={formatCurrencyValue(wallet.pending, wallet.currency)}
                    thousandSeparator=" "
                    displayType="text"
                  />
                </TableCell>
                <TableCell className="wallet-list__cell wallet-list__cell--buttons">
                  <Chip
                    className="wallet-list__button-transfer"
                    onClick={this.handleOpenTransferPopup(wallet)}
                  >
                    <img src={ConvertIcon} alt="Convert Icon" />
                  </Chip>
                  <Chip
                    className="wallet-list__withdraw"
                    onClick={this.handleOpenWithdrawPopup(wallet)}
                    disabled={
                      !wallet.isWithdrawalEnabled &&
                      wallet.isWithdrawalEnabled !== undefined
                    }
                  >
                    <img src={ArrowIcon} alt="Arrow Icon" />
                  </Chip>
                  <Chip
                    className="wallet-list__button-add-funds"
                    type="positive"
                    onClick={this.handleOpenAddFundsPopup(wallet)}
                    disabled={
                      !wallet.isDepositEnabled &&
                      wallet.isDepositEnabled !== undefined
                    }
                  >
                    +
                  </Chip>
                </TableCell>
              </TableRow>
            );
          }}
        />
        <WalletAddFundsPopup
          currentWallet={this.state.currentWallet}
          open={this.state.isOpenAddFundsPopup}
          onClose={this.handleCloseAddFundsPopup}
        />
        <WalletWithdrawPopup
          currentWallet={this.state.currentWallet}
          open={this.state.isOpenWithdrawPopup}
          onClose={this.handleCloseWithdrawPopup}
        />
        <WalletTransferPopup
          currentWallet={this.state.currentWallet}
          open={this.state.isOpenTransferPopup}
          onClose={this.handleCloseTransferPopup}
        />
      </div>
    );
  }
}

export default translate()(WalletList);
