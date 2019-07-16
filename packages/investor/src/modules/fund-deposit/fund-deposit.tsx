import * as React from "react";
import DepositContainer from "shared/components/deposit/components/deposit-container";
import {
  fundInvestCreator,
  getFundInfoCreator
} from "shared/components/deposit/services/fund-deposit.service";
import { IDialogProps } from "shared/components/dialog/dialog";
import { ASSET } from "shared/constants/constants";
import investorApi from "shared/services/api-client/investor-api";

const _FundDeposit: React.FC<OwnProps & IDialogProps> = ({
  id,
  onApply,
  open,
  onClose
}) => (
  <DepositContainer
    asset={ASSET.FUND}
    assetInvest={fundInvestCreator(
      investorApi.v10InvestorFundsByIdInvestByAmountPost
    )}
    fetchInfo={getFundInfoCreator(
      investorApi.v10InvestorFundsByIdInvestInfoByCurrencyGet
    )}
    id={id}
    hasEntryFee
    onApply={onApply}
    open={open}
    onClose={onClose}
  />
);

const FundDeposit = React.memo(_FundDeposit);
export default FundDeposit;

interface OwnProps {
  id: string;
  onApply(): void;
}
