import "./wallet-tables.scss";

import GVTabs from "components/gv-tabs";
import GVTab from "components/gv-tabs/gv-tab";
import Link from "components/link/link";
import { HORIZONTAL_POPOVER_POS } from "components/popover/popover";
import Surface from "components/surface/surface";
import Tooltip from "components/tooltip/tooltip";
import { CURRENCIES } from "modules/currency-select/currency-select.constants";
import React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import { CurrencyEnum } from "utils/types";

import useHashTab from "../../services/hashTab.hook";
import {
  composeWalletCurrencyUrl,
  WALLET_CURRENCY_FOLDER_ROUTE
} from "../../wallet.routes";
import DepositsWithdrawalsRow from "./wallet-deposits-withdrawals/deposits-withdrawals-row";
import WalletDepositsWithdrawals from "./wallet-deposits-withdrawals/wallet-deposits-withdrawals";
import { WALLET_DEPOSITS_WITHDRAWALS_COLUMNS } from "./wallet-deposits-withdrawals/wallet-deposits-withdrawals.constants";
import TransactionsRow from "./wallet-transactions/transactions-row";
import WalletTransactions from "./wallet-transactions/wallet-transactions";
import { WALLET_TRANSACTIONS_COLUMNS } from "./wallet-transactions/wallet-transactions.constants";

const _WalletTables: React.FC<Props> = ({ t, currency }) => {
  const { tab } = useHashTab<TABS>(TABS.TRANSACTIONS_TAB);
  return (
    <Surface className="wallet-container">
      <div className="wallet-container__header">
        <div className="wallet-container__tabs">
          <GVTabs value={tab}>
            <GVTab
              className={"gv-tab"}
              value={TABS.TRANSACTIONS_TAB} //TODO add disable prop
              label={
                <Tooltip
                  horizontal={HORIZONTAL_POPOVER_POS.LEFT}
                  render={() => (
                    <div className="tooltip__content">
                      {t("wallet-page.tooltip.transactions")}
                    </div>
                  )}
                >
                  <Link
                    to={{
                      pathname: WALLET_CURRENCY_FOLDER_ROUTE,
                      as:
                        composeWalletCurrencyUrl(currency.toLowerCase()) +
                        TABS.TRANSACTIONS_TAB,
                      state: "/ Wallet"
                    }}
                  >
                    {t("wallet-page.tabs.transactions")}
                  </Link>
                </Tooltip>
              }
            />
            <GVTab
              className={"gv-tab"}
              value={TABS.EXTERNAL_TAB}
              label={
                <>
                  <Tooltip
                    horizontal={HORIZONTAL_POPOVER_POS.LEFT}
                    render={() => (
                      <div className="tooltip__content">
                        {t("wallet-page.tooltip.deposit")}
                      </div>
                    )}
                  >
                    <Link
                      to={{
                        pathname: WALLET_CURRENCY_FOLDER_ROUTE,
                        as:
                          composeWalletCurrencyUrl(currency.toLowerCase()) +
                          TABS.EXTERNAL_TAB,
                        state: "/ Wallet"
                      }}
                    >
                      {t("wallet-page.tabs.deposit")}
                    </Link>
                  </Tooltip>
                  <Tooltip
                    horizontal={HORIZONTAL_POPOVER_POS.LEFT}
                    render={() => (
                      <div className="tooltip__content">
                        {t("wallet-page.tooltip.withdrawals")}
                      </div>
                    )}
                  >
                    <Link
                      to={{
                        pathname: WALLET_CURRENCY_FOLDER_ROUTE,
                        as:
                          composeWalletCurrencyUrl(currency.toLowerCase()) +
                          TABS.EXTERNAL_TAB,
                        state: "/ Wallet"
                      }}
                    >
                      {t("wallet-page.tabs.withdrawals")}
                    </Link>
                  </Tooltip>
                </>
              }
            />
          </GVTabs>
        </div>
      </div>
      <div>
        {tab === TABS.TRANSACTIONS_TAB && (
          <WalletTransactions
            columns={WALLET_TRANSACTIONS_COLUMNS}
            renderBodyRow={(transaction, updateRow, updateItems) => (
              <TransactionsRow
                walletCurrency={currency}
                transaction={transaction}
                update={updateItems}
              />
            )}
            currency={currency}
          />
        )}
        {tab === TABS.EXTERNAL_TAB && (
          <WalletDepositsWithdrawals
            columns={WALLET_DEPOSITS_WITHDRAWALS_COLUMNS}
            renderBodyRow={(transaction, updateRow, updateItems) => (
              <DepositsWithdrawalsRow
                transaction={transaction}
                update={updateItems}
              />
            )}
            currency={currency}
          />
        )}
      </div>
    </Surface>
  );
};

enum TABS {
  TRANSACTIONS_TAB = "",
  EXTERNAL_TAB = "#external"
}

interface Props extends WithTranslation, OwnProps {}

interface OwnProps {
  currency: CurrencyEnum;
}

const WalletContainer = compose<React.ComponentType<OwnProps>>(
  translate(),
  React.memo
)(_WalletTables);
export default WalletContainer;
