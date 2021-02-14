import DepositContainer from "components/deposit/components/deposit-container";
import { IDialogProps } from "components/dialog/dialog";
import { ASSET, FUND_CURRENCY } from "constants/constants";
import withLoader from "decorators/with-loader";
import * as React from "react";
import { useSelector } from "react-redux";
import { fundMinDepositAmountSelector } from "reducers/platform-reducer";

const _FundDeposit: React.FC<OwnProps & IDialogProps> = ({
  renderAssetPopup,
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
      renderAssetPopup={renderAssetPopup}
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
  renderAssetPopup: (popupTop: JSX.Element, form: JSX.Element) => JSX.Element;
  infoMessage?: string;
  title: string;
  entryFee?: number;
  availableToInvest?: number;
  id: string;
  onApply?: () => void;
  ownAsset?: boolean;
}
