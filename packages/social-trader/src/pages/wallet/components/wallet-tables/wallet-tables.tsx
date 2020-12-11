import { DefaultTableBlock } from "components/default.block/default-table.block";
import DetailsBlockTabs from "components/details/details-block-tabs";
import GVTab from "components/gv-tabs/gv-tab";
import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import { HORIZONTAL_POPOVER_POS } from "components/popover/popover";
import Tooltip from "components/tooltip/tooltip";
import { TooltipContent } from "components/tooltip/tooltip-content";
import {
  composeWalletCurrencyUrl,
  WALLET_CURRENCY_FOLDER_ROUTE
} from "pages/wallet/wallet.paths";
import React from "react";
import { useTranslation } from "react-i18next";
import { CurrencyEnum } from "utils/types";

import useHashTab from "../../services/hashTab.hook";
import DepositsWithdrawalsRow from "./wallet-deposits-withdrawals/deposits-withdrawals-row";
import WalletDepositsWithdrawals from "./wallet-deposits-withdrawals/wallet-deposits-withdrawals";
import { WALLET_DEPOSITS_WITHDRAWALS_COLUMNS } from "./wallet-deposits-withdrawals/wallet-deposits-withdrawals.constants";
import TransactionsRow from "./wallet-transactions/transactions-row";
import WalletTransactions from "./wallet-transactions/wallet-transactions";
import { WALLET_TRANSACTIONS_COLUMNS } from "./wallet-transactions/wallet-transactions.constants";

const _WalletTables: React.FC<Props> = ({ currency }) => {
  const { linkCreator } = useToLink();
  const title = "Wallet";
  const [t] = useTranslation();
  const { tab } = useHashTab<TABS>(TABS.TRANSACTIONS_TAB);
  return (
    <DefaultTableBlock>
      <DetailsBlockTabs value={tab}>
        <GVTab
          value={TABS.TRANSACTIONS_TAB} //TODO add disable prop
          label={
            <Tooltip
              horizontal={HORIZONTAL_POPOVER_POS.LEFT}
              render={() => (
                <TooltipContent>
                  {t("wallet-page:tooltip.transactions")}
                </TooltipContent>
              )}
            >
              <Link
                noColor
                to={linkCreator(
                  composeWalletCurrencyUrl(currency.toLowerCase()) +
                    TABS.TRANSACTIONS_TAB,
                  WALLET_CURRENCY_FOLDER_ROUTE,
                  title
                )}
              >
                {t("wallet-page:tabs.transactions")}
              </Link>
            </Tooltip>
          }
        />
        <GVTab
          value={TABS.EXTERNAL_TAB}
          label={
            <>
              <Tooltip
                horizontal={HORIZONTAL_POPOVER_POS.LEFT}
                render={() => (
                  <TooltipContent>
                    {t("wallet-page:tooltip.deposit")}
                  </TooltipContent>
                )}
              >
                <Link
                  noColor
                  to={linkCreator(
                    composeWalletCurrencyUrl(currency.toLowerCase()) +
                      TABS.EXTERNAL_TAB,
                    WALLET_CURRENCY_FOLDER_ROUTE,
                    title
                  )}
                >
                  {t("wallet-page:tabs.deposit")}
                </Link>
              </Tooltip>
              <Tooltip
                horizontal={HORIZONTAL_POPOVER_POS.LEFT}
                render={() => (
                  <TooltipContent>
                    {t("wallet-page:tooltip.withdrawals")}
                  </TooltipContent>
                )}
              >
                <Link
                  noColor
                  to={linkCreator(
                    composeWalletCurrencyUrl(currency.toLowerCase()) +
                      TABS.EXTERNAL_TAB,
                    WALLET_CURRENCY_FOLDER_ROUTE,
                    title
                  )}
                >
                  {t("wallet-page:tabs.withdrawals")}
                </Link>
              </Tooltip>
            </>
          }
        />
      </DetailsBlockTabs>
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
    </DefaultTableBlock>
  );
};

enum TABS {
  TRANSACTIONS_TAB = "",
  EXTERNAL_TAB = "#external"
}

interface Props {
  currency: CurrencyEnum;
}

const WalletContainer = React.memo(_WalletTables);
export default WalletContainer;
