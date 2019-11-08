import * as React from "react";
import { useSelector } from "react-redux";
import DepositContainer from "shared/components/deposit/components/deposit-container";
import { fundInvest } from "shared/components/deposit/services/fund-deposit.service";
import { getFundMinDeposit } from "shared/components/deposit/services/program-deposit.service";
import { IDialogProps } from "shared/components/dialog/dialog";
import { ASSET, FUND_CURRENCY } from "shared/constants/constants";
import withLoader from "shared/decorators/with-loader";
import { fundMinDepositAmountSelector } from "shared/reducers/platform-reducer";

const _FundDeposit: React.FC<OwnProps & IDialogProps> = ({
  entryFee,
  availableToInvest,
  id,
  onApply = () => {},
  open,
  onClose
}) => {
  const fundMinDepositAmounts = useSelector(fundMinDepositAmountSelector);
  const minDeposit = getFundMinDeposit(fundMinDepositAmounts, FUND_CURRENCY);
  return (
    <DepositContainer
      availableToInvest={availableToInvest}
      entryFee={entryFee}
      minDeposit={minDeposit}
      currency={FUND_CURRENCY}
      asset={ASSET.FUND}
      assetInvest={fundInvest}
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
  entryFee?: number;
  availableToInvest?: number;
  id: string;
  onApply?: () => void;
}
