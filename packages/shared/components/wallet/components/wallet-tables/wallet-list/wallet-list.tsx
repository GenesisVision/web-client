import "./wallet-list.scss";

import { WalletData } from "gv-api-web";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";
import WalletImage from "shared/components/avatar/wallet-image/wallet-image";
import Table from "shared/components/table/components/table";
import TableCell from "shared/components/table/components/table-cell";
import TableRow from "shared/components/table/components/table-row";
import { DEFAULT_PAGING } from "shared/components/table/reducers/table-paging.reducer";
import { composeWalletCurrencyUrl } from "shared/components/wallet/wallet.routes";
import TransferPopup from "shared/modules/transfer/transfer-popup";
import { CurrentWallet } from "shared/modules/wallet-add-funds/components/wallet-add-funds-form";
import WalletAddFundsPopup from "shared/modules/wallet-add-funds/wallet-add-funds-popup";
import WalletWithdrawPopup from "shared/modules/wallet-withdraw/wallet-withdraw-popup";
import { formatCurrencyValue } from "shared/utils/formatter";

import WalletListButton from "./wallet-list-button";
import { WALLET_LIST_COLUMNS } from "./wallet-list.constants";

class _WalletList extends React.PureComponent<Props, State> {
  state = {
    isOpenAddFundsPopup: false,
    isOpenWithdrawPopup: false,
    isOpenTransferPopup: false,
    currentWallet: undefined
  };

  handleOpenAddFundsPopup = (wallet: CurrentWallet) => () => {
    const { currency, available } = wallet;
    this.setState({
      isOpenAddFundsPopup: true,
      currentWallet: { currency, available }
    });
  };

  handleCloseAddFundsPopup = () => {
    this.setState({ isOpenAddFundsPopup: false, currentWallet: {} });
  };

  handleOpenWithdrawPopup = (wallet: CurrentWallet) => () => {
    this.setState({ isOpenWithdrawPopup: true, currentWallet: wallet });
  };

  handleCloseWithdrawPopup = () => {
    this.setState({ isOpenWithdrawPopup: false, currentWallet: {} });
  };

  handleOpenTransferPopup = (wallet: CurrentWallet) => () => {
    this.setState({ isOpenTransferPopup: true, currentWallet: wallet });
  };

  handleCloseTransferPopup = () => {
    this.setState({ isOpenTransferPopup: false, currentWallet: {} });
  };

  render() {
    const { t, createButtonToolbar, wallets } = this.props;
    const {
      isOpenAddFundsPopup,
      currentWallet,
      isOpenWithdrawPopup,
      isOpenTransferPopup
    } = this.state;
    return (
      <div className="wallet-list">
        <Table
          paging={DEFAULT_PAGING}
          items={wallets}
          // dataSelector={walletTableTransactionsSelector} TableContainer have this prop
          columns={WALLET_LIST_COLUMNS}
          renderHeader={column => (
            <span
              className={`wallet-list__cell wallet-list__cell--${column.name}`}
            >
              {t(`wallet-page.list.${column.name}`)}
            </span>
          )}
          renderBodyRow={(wallet: WalletData) => (
            <TableRow className="wallet-list__row" key={wallet.id}>
              <TableCell className="wallet-list__cell wallet-list__cell--wallet">
                <Link
                  className="wallet-list__link"
                  to={{
                    pathname: composeWalletCurrencyUrl(
                      wallet.currency.toLowerCase()
                    ),
                    state: "Wallet"
                  }}
                >
                  <WalletImage
                    url={wallet.logo}
                    imageClassName="wallet-list__icon"
                    alt={wallet.currency}
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
                  value={formatCurrencyValue(wallet.available, wallet.currency)}
                  thousandSeparator=" "
                  displayType="text"
                />
              </TableCell>
              <TableCell className="wallet-list__cell">
                <NumberFormat
                  value={formatCurrencyValue(wallet.invested, wallet.currency)}
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
                <WalletListButton
                  wallet={wallet}
                  handleOpenTransferPopup={this.handleOpenTransferPopup}
                  handleOpenWithdrawPopup={this.handleOpenWithdrawPopup}
                  handleOpenAddFundsPopup={this.handleOpenAddFundsPopup}
                />
              </TableCell>
            </TableRow>
          )}
        />
        {currentWallet && (
          <>
            <WalletAddFundsPopup
              currentWallet={currentWallet}
              open={isOpenAddFundsPopup}
              onClose={this.handleCloseAddFundsPopup}
            />
            <WalletWithdrawPopup
              currentWallet={currentWallet}
              open={isOpenWithdrawPopup}
              onClose={this.handleCloseWithdrawPopup}
            />
            <TransferPopup
              currentItem={currentWallet}
              open={isOpenTransferPopup}
              onClose={this.handleCloseTransferPopup}
            />
          </>
        )}
      </div>
    );
  }
}

interface Props extends WithTranslation {
  wallets: WalletData[];
  createButtonToolbar?: () => void;
}

interface State {
  isOpenAddFundsPopup: boolean;
  isOpenWithdrawPopup: boolean;
  isOpenTransferPopup: boolean;
  currentWallet?: any;
}

const WalletList = translate()(_WalletList);
export default WalletList;
