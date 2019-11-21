import "./wallet-list.scss";

import { CurrencyItem } from "components/currency-item/currency-item";
import Link from "components/link/link";
import Table from "components/table/components/table";
import TableCell from "components/table/components/table-cell";
import TableRow from "components/table/components/table-row";
import { DEFAULT_PAGING } from "components/table/reducers/table-paging.reducer";
import {
  composeWalletCurrencyUrl,
  WALLET_CURRENCY_FOLDER_ROUTE
} from "components/wallet/wallet.routes";
import { WalletData } from "gv-api-web";
import useIsOpen from "hooks/is-open.hook";
import TransferPopup from "modules/transfer/transfer-popup";
import WalletAddFundsPopup from "modules/wallet-add-funds/wallet-add-funds-popup";
import WalletWithdrawPopup from "modules/wallet-withdraw/wallet-withdraw-popup";
import React, { useCallback, useState } from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { formatCurrencyValue } from "utils/formatter";

import WalletListButton from "./wallet-list-button";
import { WALLET_LIST_COLUMNS } from "./wallet-list.constants";

const _WalletList: React.FC<Props> = ({ t, createButtonToolbar, wallets }) => {
  const [isOpenAddFunds, setIsOpenAddFunds, setIsCloseAddFunds] = useIsOpen();
  const [isOpenWithdraw, setIsOpenWithdraw, setIsCloseWithdraw] = useIsOpen();
  const [isOpenTransfer, setIsOpenTransfer, setIsCloseTransfer] = useIsOpen();
  const [currentWallet, setCurrentWallet] = useState<WalletData | undefined>(
    undefined
  );
  const handleOpenPopup = useCallback(
    (openMethod: () => void) => (currentWallet?: WalletData) => () => {
      setCurrentWallet(currentWallet);
      openMethod();
    },
    []
  );
  const handleClosePopup = useCallback(
    (openMethod: () => void) => () => {
      setCurrentWallet(undefined);
      openMethod();
    },
    []
  );
  return (
    <div className="wallet-list">
      <Table
        loaderData={[]}
        paging={DEFAULT_PAGING}
        items={wallets}
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
                  pathname: WALLET_CURRENCY_FOLDER_ROUTE,
                  as: composeWalletCurrencyUrl(wallet.currency.toLowerCase()),
                  state: "/ Wallet"
                }}
              >
                <CurrencyItem
                  logo={wallet.logo}
                  name={wallet.currency}
                  small
                  clickable={false}
                />
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
                handleOpenTransferPopup={handleOpenPopup(setIsOpenTransfer)}
                handleOpenWithdrawPopup={handleOpenPopup(setIsOpenWithdraw)}
                handleOpenAddFundsPopup={handleOpenPopup(setIsOpenAddFunds)}
              />
            </TableCell>
          </TableRow>
        )}
      />
      {currentWallet && (
        <>
          <WalletAddFundsPopup
            currentWallet={currentWallet}
            open={isOpenAddFunds}
            onClose={handleClosePopup(setIsCloseAddFunds)}
          />
          <WalletWithdrawPopup
            currentWallet={currentWallet}
            open={isOpenWithdraw}
            onClose={handleClosePopup(setIsCloseWithdraw)}
          />
          <TransferPopup
            currentItem={currentWallet}
            open={isOpenTransfer}
            onClose={handleClosePopup(setIsCloseTransfer)}
          />
        </>
      )}
    </div>
  );
};

interface Props extends WithTranslation {
  wallets: WalletData[];
  createButtonToolbar?: () => void;
}

const WalletList = translate()(React.memo(_WalletList));
export default WalletList;
