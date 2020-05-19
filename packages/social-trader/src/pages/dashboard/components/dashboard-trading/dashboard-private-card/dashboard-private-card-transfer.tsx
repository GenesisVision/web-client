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
  const currentItemContainerItems =
    asset.accountInfo.type === "ExchangeAccount"
      ? asset.accountInfo.balances.map(
          transformAmountWithCurrencyToTransferItem
        )
      : undefined;
  return (
    <>
      {asset.actions.canTransferMoney && (
        <>
          <DepositTransferButton
            outerCurrentItemContainerItems={currentItemContainerItems}
            onApply={updateItems}
            currentItem={mapAccountToTransferItemType(asset)}
            accountType={asset.accountInfo.type}
          />
          <WithdrawTransferButton
            outerCurrentItemContainerItems={currentItemContainerItems}
            onApply={updateItems}
            currentItem={mapAccountToTransferItemType(asset)}
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
