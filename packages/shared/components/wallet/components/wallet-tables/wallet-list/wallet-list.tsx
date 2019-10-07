import "./wallet-list.scss";

import { WalletData } from "gv-api-web";
import React, { useCallback, useState } from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import NumberFormat from "react-number-format";
import WalletImage from "shared/components/avatar/wallet-image/wallet-image";
import Link from "shared/components/link/link";
import Table from "shared/components/table/components/table";
import TableCell from "shared/components/table/components/table-cell";
import TableRow from "shared/components/table/components/table-row";
import { DEFAULT_PAGING } from "shared/components/table/reducers/table-paging.reducer";
import {
  composeWalletCurrencyUrl,
  WALLET_CURRENCY_FOLDER_ROUTE
} from "shared/components/wallet/wallet.routes";
import useIsOpen from "shared/hooks/is-open.hook";
import TransferPopup from "shared/modules/transfer/transfer-popup";
import WalletAddFundsPopup from "shared/modules/wallet-add-funds/wallet-add-funds-popup";
import WalletWithdrawPopup from "shared/modules/wallet-withdraw/wallet-withdraw-popup";
import { formatCurrencyValue } from "shared/utils/formatter";

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
