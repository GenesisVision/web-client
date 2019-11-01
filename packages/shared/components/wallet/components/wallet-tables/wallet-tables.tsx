import "./wallet-tables.scss";

import { Currency } from "gv-api-web";
import React, { useEffect } from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { Link, withRouter } from "react-router-dom";
import { compose } from "redux";
import GVTabs from "shared/components/gv-tabs";
import GVTab from "shared/components/gv-tabs/gv-tab";
import Surface from "shared/components/surface/surface";
import { TooltipLabel } from "shared/components/tooltip-label/tooltip-label";
import { WALLET_TOTAL_PAGE_ROUTE } from "shared/components/wallet/wallet.routes";
import useTab from "shared/hooks/tab.hook";

import DepositsWithdrawalsRow from "./wallet-deposits-withdrawals/deposits-withdrawals-row";
import WalletDepositsWithdrawals from "./wallet-deposits-withdrawals/wallet-deposits-withdrawals";
import { WALLET_DEPOSITS_WITHDRAWALS_COLUMNS } from "./wallet-deposits-withdrawals/wallet-deposits-withdrawals.constants";
import TransactionsRow from "./wallet-transactions/transactions-row";
import WalletTransactions from "./wallet-transactions/wallet-transactions";
import { WALLET_TRANSACTIONS_COLUMNS } from "./wallet-transactions/wallet-transactions.constants";

const _WalletTables: React.FC<Props> = ({ t, currency, location }) => {
  const { tab, setTab } = useTab<TABS>(TABS.TRANSACTIONS_TAB);
  useEffect(() => {
    setTab(null, location.hash);
  }, [location]);
  return (
    <Surface className="wallet-container">
      <div className="wallet-container__header">
        <div className="wallet-container__tabs">
          <GVTabs value={tab} onChange={setTab}>
            <GVTab
              className={"gv-tab"}
              value={TABS.TRANSACTIONS_TAB} //TODO add disable prop
              label={
                <Link
                  to={{
                    // @ts-ignore
                    prevPath: WALLET_TOTAL_PAGE_ROUTE,
                    pathname: location.pathname,
                    state: t("wallet-page.title")
                  }}
                >
                  <TooltipLabel
                    tooltipContent={t("wallet-page.tooltip.transactions")}
                    labelText={t("wallet-page.tabs.transactions")}
                    className="tooltip__label--cursor-pointer"
                  />
                </Link>
              }
            />
            <GVTab
              value={TABS.EXTERNAL_TAB}
              label={
                <Link
                  to={{
                    // @ts-ignore
                    prevPath: WALLET_TOTAL_PAGE_ROUTE,
                    hash: TABS.EXTERNAL_TAB,
                    state: t("wallet-page.title")
                  }}
                >
                  <TooltipLabel
                    tooltipContent={t("wallet-page.tooltip.deposit")}
                    labelText={t("wallet-page.tabs.deposit")}
                    className="tooltip__label--cursor-pointer"
                  />
                  <TooltipLabel
                    tooltipContent={t("wallet-page.tooltip.withdrawals")}
                    labelText={t("wallet-page.tabs.withdrawals")}
                    className="tooltip__label--cursor-pointer"
                  />
                </Link>
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
                transaction={transaction}
                walletCurrency={currency}
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

interface Props extends WithTranslation, OwnProps {
  location: Location;
}

interface OwnProps {
  currency: Currency;
}

const WalletContainer = compose<React.ComponentType<OwnProps>>(
  translate(),
  withRouter,
  React.memo
)(_WalletTables);
export default WalletContainer;
