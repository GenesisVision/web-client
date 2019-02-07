import "./wallet-container.scss";

import { GVTab, GVTabs } from "gv-react-components";
import moment from "moment";
import React, { Fragment, PureComponent } from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";
import { SearchIcon } from "shared/components/icon/search-icon";
import Profitability from "shared/components/profitability/profitability";
import Surface from "shared/components/surface/surface";
import TableCell from "shared/components/table/components/table-cell";
import TableRow from "shared/components/table/components/table-row";
import SuccessTransactionsIcon from "shared/media/transactions/success.svg";
import { formatValue } from "shared/utils/formatter";

import { getWalletIcon } from "../wallet-currency";
import WalletList from "../wallet-list/wallet-list";
import WalletTransactions from "../wallet-transactions/wallet-transactions";
import { WALLET_TOTAL_TRANSACTIONS_COLUMNS } from "../wallet-transactions/wallet-transactions.constants";

const WALLETS_TAB = "wallets";
const COPYTRADING_TAB = "copytrading";
const TRANSACTIONS_TAB = "transactions";
const EXTERNAL_TAB = "external";

const createButtonSearch = route => (
  <div className="wallet-container__search-container">
    <Link to={route}>
      <SearchIcon />
    </Link>
  </div>
);

const renderAmountConvertTransaction = transaction => (
  <Fragment>
    <span className="wallet-transactions__col">
      <NumberFormat
        value={formatValue(transaction.amount)}
        thousandSeparator=" "
        displayType="text"
        suffix=" GVT"
      />
    </span>
    <span className="wallet-transactions__back-arrow">&rarr;</span>
    <span className="wallet-transactions__col">
      <NumberFormat
        value={formatValue(transaction.amount)}
        thousandSeparator=" "
        displayType="text"
        suffix=" BTC"
      />
    </span>
  </Fragment>
);

const renderWalletConvertTransaction = () => (
  <Fragment>
    <span className="wallet-transactions__col">
      <img
        src={getWalletIcon("GVT")}
        className="wallet-transactions__icon"
        alt="Icon"
      />
      Genesis Vision
    </span>
    <span className="wallet-transactions__back-arrow">&rarr;</span>
    <span className="wallet-transactions__col">
      <img
        src={getWalletIcon("BTC")}
        className="wallet-transactions__icon"
        alt="Icon"
      />
      Bitcoin
    </span>
  </Fragment>
);

class WalletContainerTotal extends PureComponent {
  state = {
    tab: WALLETS_TAB
  };

  handleTabChange = (e, tab) => {
    this.setState({ tab });
  };

  renderBodyRow = transaction => {
    const isConvertAction = transaction.action === "ProgramRequestInvest"; //@todo when add type of action "Convert" have to change from "ProgramRequestInvest" to action "Convert"
    return (
      <TableRow className="wallet-transactions__row">
        <TableCell className="wallet-transactions__cell wallet-transactions__cell--wallet">
          {isConvertAction ? (
            renderWalletConvertTransaction()
          ) : (
            <Fragment>
              <img
                src={getWalletIcon("GVT")}
                className="wallet-transactions__icon"
                alt="Icon"
              />
              Genesis Vision
            </Fragment>
          )}
        </TableCell>
        <TableCell className="wallet-transactions__cell wallet-transactions__cell--date">
          {moment(transaction.date).format("DD-MM-YYYY, hh:mm a")}
        </TableCell>
        <TableCell className="wallet-transactions__cell wallet-transactions__cell--type">
          <img
            src={SuccessTransactionsIcon}
            className="wallet-transactions__icon"
            alt="TransactionsIcon"
          />
        </TableCell>
        <TableCell className="wallet-transactions__cell wallet-transactions__cell--information">
          {transaction.information}
        </TableCell>
        <TableCell className="wallet-transactions__cell wallet-transactions__cell--amount">
          {isConvertAction ? (
            renderAmountConvertTransaction(transaction)
          ) : (
            <Profitability value={formatValue(transaction.amount)}>
              <NumberFormat
                value={formatValue(transaction.amount)}
                thousandSeparator=" "
                displayType="text"
                suffix=" GVT"
              />
            </Profitability>
          )}
        </TableCell>
      </TableRow>
    );
  };

  render() {
    const { tab } = this.state;
    const { t, wallets } = this.props;
    return (
      <Surface className="wallet-container">
        <div className="wallet-container__header">
          <div className="wallet-container__tabs">
            <GVTabs value={tab} onChange={this.handleTabChange}>
              <GVTab
                value={WALLETS_TAB}
                label={t("wallet-page.tabs.wallets")}
              />
              {/*<GVTab value={COPYTRADING_TAB} label={t("wallet-page.tabs.copytrading")} />*/}
              <GVTab
                value={TRANSACTIONS_TAB}
                label={t("wallet-page.tabs.transactions")}
              />
              {/*<GVTab value={EXTERNAL_TAB} label={t("wallet-page.tabs.external")} />*/}
            </GVTabs>
          </div>
        </div>
        <div>
          {tab === WALLETS_TAB && <WalletList wallets={wallets} />}
          {tab === TRANSACTIONS_TAB && (
            <WalletTransactions
              columns={WALLET_TOTAL_TRANSACTIONS_COLUMNS}
              renderBodyRow={this.renderBodyRow}
            />
          )}
          {/*{tab === EXTERNAL_TAB && (*/}
          {/*)}*/}
        </div>
      </Surface>
    );
  }
}

export default translate()(WalletContainerTotal);
