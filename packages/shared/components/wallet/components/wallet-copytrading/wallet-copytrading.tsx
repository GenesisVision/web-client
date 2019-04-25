import "./wallet-copytrading.scss";
import "../wallet-list/wallet-list.scss";

import { CopyTradingAccountInfo } from "gv-api-web";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { compose } from "redux";
import WalletImage from "shared/components/avatar/wallet-image/wallet-image";
import Profitability from "shared/components/profitability/profitability";
import Table from "shared/components/table/components/table";
import TableCell from "shared/components/table/components/table-cell";
import TableRow from "shared/components/table/components/table-row";
import TransferPopup from "shared/modules/transfer/transfer-popup";
import {
  TRANSFER_CONTAINER,
  TRANSFER_DIRECTION
} from "shared/modules/transfer/transfer.types";
import { formatCurrencyValue } from "shared/utils/formatter";
import { MiddlewareDispatch } from "shared/utils/types";

import { fetchAccounts } from "../../services/wallet.services";
import { composeWalletCopytradingCurrencyUrl } from "../../wallet.routes";
import WalletCopytradingButtons from "./wallet-copytrading-buttons";
import { WALLET_COPYTRADING_COLUMNS } from "./wallet-copytrading.constants";

class _WalletCopytrading extends React.PureComponent<Props, State> {
  state = {
    isOpenAddFundsPopup: false,
    isOpenWithdrawPopup: false,
    isOpenTransferPopup: false,
    currentAccount: undefined
  };

  componentDidMount() {
    this.props.service.fetchAccounts();
  }

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
    const { t, copyTradingAccounts } = this.props;
    const {
      isOpenAddFundsPopup,
      isOpenWithdrawPopup,
      currentAccount
    } = this.state;
    return (
      <div className="wallet-list">
        <Table
          items={copyTradingAccounts}
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
            <TransferPopup
              title={t("wallet-withdraw.title")}
              sourceType={TRANSFER_DIRECTION.COPYTRADING_ACCOUNT}
              currentItem={currentAccount}
              open={isOpenWithdrawPopup}
              onClose={this.handleCloseWithdrawPopup}
            />
            <TransferPopup
              title={t("wallet-deposit.title")}
              currentItemContainer={TRANSFER_CONTAINER.DESTINATION}
              destinationType={TRANSFER_DIRECTION.COPYTRADING_ACCOUNT}
              currentItem={currentAccount}
              open={isOpenAddFundsPopup}
              onClose={this.handleCloseAddFundsPopup}
            />
          </>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: MiddlewareDispatch): DispatchProps => ({
  service: {
    fetchAccounts: () => dispatch(fetchAccounts())
  }
});

interface Props extends InjectedTranslateProps, DispatchProps, OwnProps {}

interface OwnProps {
  copyTradingAccounts: CopyTradingAccountInfo[];
}

interface DispatchProps {
  service: { fetchAccounts: () => void };
}

interface State {
  isOpenAddFundsPopup: boolean;
  isOpenWithdrawPopup: boolean;
  isOpenTransferPopup: boolean;
  currentAccount?: CopyTradingAccountInfo;
}

const WalletCopytrading = compose<React.ComponentType<OwnProps>>(
  translate(),
  connect(
    null,
    mapDispatchToProps
  )
)(_WalletCopytrading);
export default WalletCopytrading;
