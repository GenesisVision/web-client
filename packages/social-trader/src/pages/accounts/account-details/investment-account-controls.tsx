import DetailsBlock, {
  DETAILS_BLOCK_TYPE
} from "components/details/details-block";
import { DetailsBlockRowItem } from "components/details/details-block-row-item.block";
import { GV_BTN_SIZE } from "components/gv-button";
import { WalletItemType } from "components/wallet-select/wallet-select";
import {
  AmountWithCurrency,
  AssetTypeExt,
  PrivateTradingAccountType
} from "gv-api-web";
import { DepositTransferButton } from "modules/transfer/deposit-transfer-button";
import { WithdrawTransferButton } from "modules/transfer/withdraw-transfer-button";
import { transformAmountWithCurrencyToTransferItem } from "pages/dashboard/components/dashboard-trading/dashboard-private-card.helpers";
import * as React from "react";

const _InvestmentAccountControls: React.FC<Props> = ({
  id,
  balances,
  onApply,
  accountType,
  transferableItem
}) => {
  const isExchangeAccount = accountType === "ExchangeAccount";
  const currentItemContainerItems =
    isExchangeAccount && balances
      ? balances.map(transformAmountWithCurrencyToTransferItem)
      : undefined;
  const currentItem =
    isExchangeAccount && balances
      ? transformAmountWithCurrencyToTransferItem(balances[0])
      : transferableItem;
  return (
    <DetailsBlock type={DETAILS_BLOCK_TYPE.BORDERED} row>
      <DetailsBlockRowItem>
        <DepositTransferButton
          fixedSelects={isExchangeAccount}
          accountId={id}
          outerCurrentItemContainerItems={currentItemContainerItems}
          size={GV_BTN_SIZE.BIG}
          onApply={onApply}
          currentItem={currentItem}
          accountType={accountType}
        />
      </DetailsBlockRowItem>
      <DetailsBlockRowItem>
        <WithdrawTransferButton
          fixedSelects={isExchangeAccount}
          accountId={id}
          outerCurrentItemContainerItems={currentItemContainerItems}
          size={GV_BTN_SIZE.BIG}
          onApply={onApply}
          currentItem={currentItem}
          accountType={accountType}
        />
      </DetailsBlockRowItem>
    </DetailsBlock>
  );
};

interface Props {
  id?: string;
  balances?: AmountWithCurrency[];
  transferableItem: WalletItemType;
  accountType?: PrivateTradingAccountType | AssetTypeExt;
  onApply: VoidFunction;
}

const InvestmentAccountControls = React.memo(_InvestmentAccountControls);
export default InvestmentAccountControls;
