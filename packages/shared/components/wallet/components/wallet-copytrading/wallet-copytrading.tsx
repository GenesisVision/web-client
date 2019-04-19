import "./wallet-copytrading.scss";
import "../wallet-list/wallet-list.scss";

import { CopyTradingAccountInfo } from "gv-api-web";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";
import TableModule from "shared/components/table/components/table-module";
import { DEFAULT_PAGING } from "shared/components/table/reducers/table-paging.reducer";
import WalletTransferPopup from "shared/modules/wallet-transfer/wallet-transfer-popup";

import { CurrentWallet } from "../../../../modules/wallet-add-funds/components/wallet-add-funds-container";
import WalletAddFundsPopup from "../../../../modules/wallet-add-funds/wallet-add-funds-popup";
import WalletWithdrawPopup from "../../../../modules/wallet-withdraw/wallet-withdraw-popup";
import { formatCurrencyValue } from "../../../../utils/formatter";
import WalletImage from "../../../avatar/wallet-image/wallet-image";
import Profitability from "../../../profitability/profitability";
import TableCell from "../../../table/components/table-cell";
import TableRow from "../../../table/components/table-row";
import { fetchCopytradingAccounts } from "../../services/wallet.services";
import { composeWalletCopytradingCurrencyUrl } from "../../wallet.routes";
import WalletCopytradingButtons from "./wallet-copytrading-buttons";
import { WALLET_COPYTRADING_COLUMNS } from "./wallet-copytrading.constants";

class WalletCopytrading extends React.PureComponent<Props, State> {
  state = {
    isOpenAddFundsPopup: false,
    isOpenWithdrawPopup: false,
    isOpenTransferPopup: false,
    currentAccount: undefined
  };

  handleOpenAddFundsPopup = (currentAccount?: CopyTradingAccountInfo) => () => {
    this.setState({
      isOpenAddFundsPopup: true,
      currentAccount
    });
  };

  handleCloseAddFundsPopup = () => {
    this.setState({ isOpenAddFundsPopup: false });
  };

  handleOpenWithdrawPopup = (currentAccount?: CopyTradingAccountInfo) => () => {
    this.setState({ isOpenWithdrawPopup: true, currentAccount });
  };

  handleCloseWithdrawPopup = () => {
    this.setState({ isOpenWithdrawPopup: false });
  };

  render() {
    const { t } = this.props;
    const {
      isOpenAddFundsPopup,
      isOpenWithdrawPopup,
      currentAccount
    } = this.state;
    console.log(currentAccount, isOpenWithdrawPopup);
    return (
      <div className="wallet-list">
        <TableModule
          paging={DEFAULT_PAGING}
          getItems={fetchCopytradingAccounts}
          columns={WALLET_COPYTRADING_COLUMNS}
          renderHeader={column => (
            <span
              className={`wallet-list__cell wallet-list__cell--${column.name}`}
            >
              {t(`wallet-page.copytrading.${column.name}`)}
            </span>
          )}
          renderBodyRow={account => (
            <TableRow className="wallet-list__row">
              <TableCell className="wallet-list__cell wallet-list__cell--wallet">
                <Link
                  className="wallet-list__link"
                  to={{
                    pathname: composeWalletCopytradingCurrencyUrl(
                      account.currency.toLowerCase()
                    ),
                    state: `/ ${t("wallet-copytrading-page.title")}`
                  }}
                >
                  <WalletImage
                    url={account.logo}
                    alt={account.currency}
                    imageClassName="wallet-list__icon"
                  />
                  {account.currency}
                </Link>
              </TableCell>
              <TableCell className="wallet-list__cell wallet-list__cell--balance">
                <Profitability value={account.balance}>
                  <NumberFormat
                    value={formatCurrencyValue(
                      account.balance,
                      account.currency
                    )}
                    thousandSeparator=" "
                    displayType="text"
                  />
                </Profitability>
              </TableCell>
              <TableCell className="wallet-list__cell wallet-list__cell--equity">
                <Profitability value={account.equity}>
                  <NumberFormat
                    value={formatCurrencyValue(
                      account.equity,
                      account.currency
                    )}
                    thousandSeparator=" "
                    displayType="text"
                  />
                </Profitability>
              </TableCell>
              <TableCell className="wallet-list__cell wallet-list__cell--freeMargin">
                <Profitability value={account.freeMargin}>
                  <NumberFormat
                    value={formatCurrencyValue(
                      account.equity,
                      account.currency
                    )}
                    thousandSeparator=" "
                    displayType="text"
                  />
                </Profitability>
              </TableCell>
              <TableCell className="wallet-list__cell wallet-list__cell--buttons">
                <WalletCopytradingButtons
                  account={account}
                  handleOpenWithdrawPopup={this.handleOpenWithdrawPopup}
                  handleOpenAddFundsPopup={this.handleOpenAddFundsPopup}
                />
              </TableCell>
            </TableRow>
          )}
        />
        {currentAccount && (
          <>
            <WalletTransferPopup
              currentWallet={currentAccount}
              open={isOpenAddFundsPopup}
              onClose={this.handleCloseAddFundsPopup}
            />
            <WalletTransferPopup
              currentWallet={currentAccount}
              open={isOpenWithdrawPopup}
              onClose={this.handleCloseWithdrawPopup}
            />
          </>
        )}
      </div>
    );
  }
}

interface Props extends InjectedTranslateProps {}

interface State {
  isOpenAddFundsPopup: boolean;
  isOpenWithdrawPopup: boolean;
  isOpenTransferPopup: boolean;
  currentAccount?: CopyTradingAccountInfo;
}

export default React.memo(translate()(WalletCopytrading));
