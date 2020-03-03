import "./wallet-balance.scss";

import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import Crashable from "decorators/crashable";
import { WalletData } from "gv-api-web";
import TransferButton from "modules/transfer/transfer-button";
import { TRANSFER_CONTAINER } from "modules/transfer/transfer.types";
import WalletDeposit from "modules/wallet-deposit/wallet-deposit";
import WalletWithdrawButton from "modules/wallet-withdraw/wallet-withdraw.button";
import { fetchWallets } from "pages/wallet/services/wallet.services";
import * as React from "react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currencySelector } from "reducers/account-settings-reducer";

const _WalletBalanceButtons: React.FC<Props> = ({ currentItem }) => {
  const { currency, isDepositEnabled, isWithdrawalEnabled } = currentItem;
  const profileCurrency = useSelector(currencySelector);
  const dispatch = useDispatch();
  const updateWalletInfo = useCallback(() => {
    dispatch(fetchWallets(profileCurrency));
  }, [profileCurrency]);
  return (
    <Row wrap>
      <RowItem>
        <WalletDeposit currency={currency} disabled={!isDepositEnabled} />
      </RowItem>
      <RowItem>
        <WalletWithdrawButton
          currency={currency}
          disabled={!isWithdrawalEnabled}
        />
      </RowItem>
      <RowItem>
        <TransferButton
          onApply={updateWalletInfo}
          withIcon
          currentItem={currentItem}
          currentItemContainer={TRANSFER_CONTAINER.SOURCE}
          sourceType={"Wallet"}
          destinationType={"Wallet"}
        />
      </RowItem>
    </Row>
  );
};

interface Props {
  currentItem: WalletData;
}

const WalletBalanceButtons = React.memo(Crashable(_WalletBalanceButtons));
export default WalletBalanceButtons;
