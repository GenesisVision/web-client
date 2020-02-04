import DepositContainer from "components/deposit/components/deposit-container";
import { getFundMinDeposit } from "components/deposit/services/program-deposit.service";
import { IDialogProps } from "components/dialog/dialog";
import { ASSET, FUND_CURRENCY } from "constants/constants";
import withLoader from "decorators/with-loader";
import * as React from "react";
import { useSelector } from "react-redux";
import { fundMinDepositAmountSelector } from "reducers/platform-reducer";

const _FundDeposit: React.FC<OwnProps & IDialogProps> = ({
  title,
  entryFee,
  availableToInvest,
  id,
  onApply = () => {},
  open,
  onClose,
  ownAsset
}) => {
  const fundMinDepositAmounts = useSelector(fundMinDepositAmountSelector);
  const minDeposit = getFundMinDeposit(fundMinDepositAmounts, FUND_CURRENCY);
  return (
    <DepositContainer
      ownAsset={ownAsset}
      title={title}
      availableToInvest={availableToInvest}
      entryFee={entryFee}
      minDeposit={minDeposit}
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
  title: string;
  entryFee?: number;
  availableToInvest?: number;
  id: string;
  onApply?: () => void;
  ownAsset?: boolean;
}
