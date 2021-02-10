import { MinDepositType } from "components/deposit/components/deposit.types";
import Dialog, { IDialogProps } from "components/dialog/dialog";
import { ASSET } from "constants/constants";
import { useAccountCurrency } from "hooks/account-currency.hook";
import dynamic from "next/dynamic";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { gvInvestFeeSelector } from "reducers/platform-reducer";
import { CurrencyEnum } from "utils/types";

const DepositPopupContainer = dynamic(
  () => import("./deposit-popup.container")
);

interface Props extends IDialogProps {
  AssetDetailsExtraBlock?: React.ComponentType<any>;
  renderFees?: React.ReactNode;
  assetLevel?: number;
  assetLogo: string;
  assetOwner: string;
  ownerUrl: string;
  brokerLogo?: string;
  brokerName?: string;
  infoMessage?: string;
  title: string;
  availableToInvest?: number;
  entryFee?: number;
  minDeposit: MinDepositType;
  asset: ASSET;
  id: string;
  onApply: () => void;
  hasEntryFee?: boolean;
  currency?: CurrencyEnum;
  ownAsset?: boolean;
  totalAvailableInvestment?: number;
  assetColor: string;
  assetLevelProgress?: number;
}

const _DepositContainer: React.FC<Props> = ({
  ownerUrl,
  totalAvailableInvestment,
  assetColor,
  assetLevelProgress,
  assetLevel,
  assetLogo,
  renderFees,
  AssetDetailsExtraBlock,
  brokerName,
  brokerLogo,
  assetOwner,
  infoMessage,
  title,
  availableToInvest,
  entryFee,
  minDeposit,
  asset,
  id,
  open,
  hasEntryFee,
  onClose,
  currency,
  onApply,
  ownAsset
}) => {
  const gvCommission = useSelector(gvInvestFeeSelector);
  const stateCurrency = useAccountCurrency();

  const fees = useMemo(() => ({ gvCommission, entryFee }), [
    gvCommission,
    entryFee
  ]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DepositPopupContainer
        ownerUrl={ownerUrl}
        totalAvailableInvestment={totalAvailableInvestment}
        assetColor={assetColor}
        assetLevelProgress={assetLevelProgress}
        assetLevel={assetLevel}
        assetLogo={assetLogo}
        brokerName={brokerName}
        brokerLogo={brokerLogo}
        AssetDetailsExtraBlock={AssetDetailsExtraBlock}
        renderFees={renderFees}
        assetOwner={assetOwner}
        infoMessage={infoMessage}
        title={title}
        ownAsset={ownAsset}
        availableToInvest={availableToInvest}
        fees={fees}
        minDeposit={minDeposit}
        id={id}
        onClose={onClose}
        onApply={onApply}
        asset={asset}
        hasEntryFee={hasEntryFee}
        currency={currency || stateCurrency}
      />
    </Dialog>
  );
};

const DepositContainer = React.memo(_DepositContainer);
export default DepositContainer;
