import { CurrencyItem } from "components/currency-item/currency-item";
import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import Table from "components/table/components/table";
import TableCell from "components/table/components/table-cell";
import TableRow from "components/table/components/table-row";
import { DEFAULT_PAGING } from "components/table/reducers/table-paging.reducer";
import { WalletData } from "gv-api-web";
import {
  composeWalletCurrencyUrl,
  WALLET_CURRENCY_FOLDER_ROUTE,
  WALLET_TOTAL_PAGE_NAME
} from "pages/wallet/wallet.paths";
import React from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import { formatCurrencyValue } from "utils/formatter";

import WalletListButton from "./wallet-list-button";
import { WALLET_LIST_COLUMNS } from "./wallet-list.constants";
import styles from "./wallet-list.module.scss";

const _WalletList: React.FC<Props> = ({ wallets }) => {
  const [t] = useTranslation();
  const { linkCreator } = useToLink();
  return (
    <>
      <Table
        loaderData={[]}
        paging={DEFAULT_PAGING}
        items={wallets}
        columns={WALLET_LIST_COLUMNS}
        renderHeader={column => (
          <span>{t(`wallet-page.list.${column.name}`)}</span>
        )}
        renderBodyRow={(wallet: WalletData) => (
          <TableRow key={wallet.id}>
            <TableCell>
              <Link
                to={linkCreator(
                  composeWalletCurrencyUrl(wallet.currency.toLowerCase()),
                  WALLET_CURRENCY_FOLDER_ROUTE,
                  WALLET_TOTAL_PAGE_NAME
                )}
              >
                <CurrencyItem
                  logo={wallet.logoUrl}
                  name={wallet.currency}
                  small
                  clickable={false}
                />
              </Link>
            </TableCell>
            <TableCell>
              <NumberFormat
                value={formatCurrencyValue(wallet.total, wallet.currency)}
                thousandSeparator=" "
                displayType="text"
              />
            </TableCell>
            <TableCell>
              <NumberFormat
                value={formatCurrencyValue(wallet.available, wallet.currency)}
                thousandSeparator=" "
                displayType="text"
              />
            </TableCell>
            <TableCell>
              <NumberFormat
                value={formatCurrencyValue(wallet.invested, wallet.currency)}
                thousandSeparator=" "
                displayType="text"
              />
            </TableCell>
            <TableCell>
              <NumberFormat
                value={formatCurrencyValue(wallet.trading, wallet.currency)}
                thousandSeparator=" "
                displayType="text"
              />
            </TableCell>
            <TableCell>
              <NumberFormat
                value={formatCurrencyValue(wallet.pending, wallet.currency)}
                thousandSeparator=" "
                displayType="text"
              />
            </TableCell>
            <TableCell className={styles["wallet-list__cell--buttons"]}>
              <WalletListButton wallet={wallet} />
            </TableCell>
          </TableRow>
        )}
      />
    </>
  );
};

interface Props {
  wallets: WalletData[];
}

const WalletList = React.memo(_WalletList);
export default WalletList;
