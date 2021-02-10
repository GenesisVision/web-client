import DepositContainer from "components/deposit/components/deposit-container";
import { IDialogProps } from "components/dialog/dialog";
import { ASSET, FUND_CURRENCY } from "constants/constants";
import withLoader from "decorators/with-loader";
import * as React from "react";
import { useSelector } from "react-redux";
import { fundMinDepositAmountSelector } from "reducers/platform-reducer";

const _FundDeposit: React.FC<OwnProps & IDialogProps> = ({
  ownerUrl,
  AssetDetailsExtraBlock,
  fundColor,
  fundLogo,
  fundOwner,
  renderFees,
  infoMessage,
  title,
  entryFee,
  availableToInvest,
  id,
  onApply = () => { },
  open,
  onClose,
  ownAsset
}) => {
  const fundMinDepositAmounts = useSelector(fundMinDepositAmountSelector);
  return (
    <DepositContainer
      ownerUrl={ownerUrl}
      assetColor={fundColor}
      AssetDetailsExtraBlock={AssetDetailsExtraBlock}
      assetOwner={fundOwner}
      assetLogo={fundLogo}
      renderFees={renderFees}
      infoMessage={infoMessage}
      ownAsset={ownAsset}
      title={title}
      availableToInvest={availableToInvest}
      entryFee={entryFee}
      minDeposit={fundMinDepositAmounts}
      currency={FUND_CURRENCY}
      asset={ASSET.FUND}
      id={id}
      hasEntryFee
      onApply={onApply}
      open={open}
      onClose={onClose}
    />
  );
};

const FundDeposit = withLoader(React.memo(_FundDeposit));
export default FundDeposit;

interface OwnProps {
  AssetDetailsExtraBlock: React.ComponentType<any>;
  ownerUrl: string;
  fundOwner: string;
  fundLogo: string;
  renderFees?: React.ReactNode;
  infoMessage?: string;
  title: string;
  entryFee?: number;
  availableToInvest?: number;
  id: string;
  onApply?: () => void;
  ownAsset?: boolean;
  fundColor: string;
}
