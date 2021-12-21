import { DashboardTradingAsset } from "gv-api-web";
import { DemoDepositButton } from "modules/demo-deposit/demo-deposit.button";
import { DepositTransferButton } from "modules/transfer/deposit-transfer-button";
import { WithdrawTransferButton } from "modules/transfer/withdraw-transfer-button";
import { transformAmountWithCurrencyToTransferItem } from "pages/dashboard/components/dashboard-trading/dashboard-private-card.helpers";
import { mapAccountToTransferItemType } from "pages/dashboard/services/dashboard.service";
import React from "react";

interface Props {
  updateItems: VoidFunction;
  asset: DashboardTradingAsset;
}

const _DashboardPrivateCardTransfer: React.FC<Props> = ({
  asset,
  updateItems
}) => {
  const isExchangeAccount = asset.accountInfo.type === "ExchangeAccount";
  const currentItemContainerItems = isExchangeAccount
    ? asset.accountInfo.balances.map(transformAmountWithCurrencyToTransferItem)
    : undefined;
  const currentItem =
    isExchangeAccount && asset.accountInfo.balances?.length
      ? transformAmountWithCurrencyToTransferItem(asset.accountInfo.balances[0])
      : mapAccountToTransferItemType(asset);
  return (
    <>
      {asset?.actions?.canTransferMoney && (
        <>
          <DepositTransferButton
            isExchangeAccount={isExchangeAccount}
            supportedCurrencies={asset.accountInfo.supportedCurrencies}
            accountId={asset.id}
            outerCurrentItemContainerItems={currentItemContainerItems}
            onApply={updateItems}
            currentItem={currentItem}
            accountType={asset.accountInfo.type}
          />
          <WithdrawTransferButton
            isExchangeAccount={isExchangeAccount}
            supportedCurrencies={asset.accountInfo.supportedCurrencies}
            accountId={asset.id}
            outerCurrentItemContainerItems={currentItemContainerItems}
            onApply={updateItems}
            currentItem={currentItem}
            accountType={asset.accountInfo.type}
          />
        </>
      )}
      {asset.actions.canMakeDemoDeposit && (
        <DemoDepositButton
          currentDeposit={asset.accountInfo.balance}
          onApply={updateItems}
          currency={asset.accountInfo.currency}
          id={asset.id}
        />
      )}
    </>
  );
};

export const DashboardPrivateCardTransfer = React.memo(
  _DashboardPrivateCardTransfer
);
