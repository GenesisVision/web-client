import "./wallet-tables.scss";

import { CopyTradingAccountInfo, WalletData } from "gv-api-web";
import { Location } from "history";
import React, { useEffect, useState } from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import Link from "shared/components/link/link";
import { compose } from "redux";
import GVTabs from "shared/components/gv-tabs";
import GVTab from "shared/components/gv-tabs/gv-tab";
import { HORIZONTAL_POPOVER_POS } from "shared/components/popover/popover";
import Surface from "shared/components/surface/surface";
import Tooltip from "shared/components/tooltip/tooltip";
import useTab from "shared/hooks/tab.hook";

import WalletCopytrading from "./wallet-copytrading/wallet-copytrading";
import AllDepositsWithdrawalsRow from "./wallet-deposits-withdrawals/all-deposits-withdrawals-row";
import WalletDepositsWithdrawals from "./wallet-deposits-withdrawals/wallet-deposits-withdrawals";
import { WALLET_TOTAL_DEPOSITS_WITHDRAWALS_COLUMNS } from "./wallet-deposits-withdrawals/wallet-deposits-withdrawals.constants";
import WalletList from "./wallet-list/wallet-list";
import TransactionsRow from "./wallet-transactions/transactions-row";
import WalletTransactions from "./wallet-transactions/wallet-transactions";
import { WALLET_TOTAL_TRANSACTIONS_COLUMNS } from "./wallet-transactions/wallet-transactions.constants";
import { getLocation, setHash } from "shared/utils/location";

const _WalletTablesTotal: React.FC<Props> = ({
  t,
  wallets,
  copytrading,
  locationTab,
  copyTradingAccounts,
  copyTradingAccountsPending
}) => {
  const [location, setLocation] = useState<Location | undefined>();
  const { tab, setTab } = useTab<TABS>(TABS.WALLETS_TAB);
  useEffect(() => {
    setLocation(getLocation());
    setTab(null, location ? location.hash : TABS.WALLETS_TAB);
  }, []);
  useEffect(
    () => {
      setHash(tab);
    },
    [tab]
  );
  return (
    <Surface className="wallet-container">
      <div className="wallet-container__header">
        <div className="wallet-container__tabs">
          <GVTabs value={tab} onChange={setTab}>
            <GVTab
              value={TABS.WALLETS_TAB}
              label={t("wallet-page.tabs.wallets")}
            />
            <GVTab
              className={"gv-tab"}
              visible={copytrading}
              value={TABS.COPYTRADING_TAB}
              label={t("wallet-page.tabs.copytrading")}
            />
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
                  <span>{t("wallet-page.tabs.transactions")}</span>
                </Tooltip>
                /*<Link
                  to={{
                    hash: TABS.TRANSACTIONS_TAB
                  }}
                >
                </Link>*/
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
                    <span>{t("wallet-page.tabs.deposit")}</span>
                  </Tooltip>
                  <Tooltip
                    horizontal={HORIZONTAL_POPOVER_POS.LEFT}
                    render={() => (
                      <div className="tooltip__content">
                        {t("wallet-page.tooltip.withdrawals")}
                      </div>
                    )}
                  >
                    <span>{t("wallet-page.tabs.withdrawals")}</span>
                  </Tooltip>
                </>

                /*<Link
                  to={{
                    hash: TABS.EXTERNAL_TAB
                  }}
                >
                </Link>*/
              }
            />
          </GVTabs>
        </div>
      </div>
      {tab === TABS.WALLETS_TAB && <WalletList wallets={wallets} />}
      {tab === TABS.COPYTRADING_TAB && (
        <WalletCopytrading
          copyTradingAccounts={copyTradingAccounts}
          copyTradingAccountsPending={copyTradingAccountsPending}
        />
      )}
      {tab === TABS.TRANSACTIONS_TAB && (
        <WalletTransactions
          columns={WALLET_TOTAL_TRANSACTIONS_COLUMNS}
          renderBodyRow={(transaction, updateRow, updateItems) => (
            <TransactionsRow transaction={transaction} update={updateItems} />
          )}
        />
      )}
      {tab === TABS.EXTERNAL_TAB && (
        <WalletDepositsWithdrawals
          columns={WALLET_TOTAL_DEPOSITS_WITHDRAWALS_COLUMNS}
          renderBodyRow={(transaction, updateRow, updateItems) => (
            <AllDepositsWithdrawalsRow
              transaction={transaction}
              update={updateItems}
            />
          )}
        />
      )}
    </Surface>
  );
};

enum TABS {
  WALLETS_TAB = "",
  COPYTRADING_TAB = "#copytrading",
  TRANSACTIONS_TAB = "#transactions",
  EXTERNAL_TAB = "#external"
}

interface Props extends WithTranslation, OwnProps {
  location: Location;
}

interface OwnProps {
  wallets: WalletData[];
  copytrading: boolean;
  copyTradingAccounts: CopyTradingAccountInfo[];
  copyTradingAccountsPending: boolean;
  locationTab?: TABS;
}

const WalletContainerTotal = compose<React.ComponentType<OwnProps>>(
  translate(),
  React.memo
)(_WalletTablesTotal);
export default WalletContainerTotal;
