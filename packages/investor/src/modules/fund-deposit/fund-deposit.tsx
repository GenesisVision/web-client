import * as React from "react";
import FundDepositContainer from "shared/components/deposit/components/fund-deposit-container";
import { IDialogProps } from "shared/components/dialog/dialog";
import investorApi from "shared/services/api-client/investor-api";

const FundDeposit: React.FC<OwnProps & IDialogProps> = ({
  id,
  onApply,
  open,
  onClose
}) => {
  return (
    <FundDepositContainer
      id={id}
      hasEntryFee
      onApply={onApply}
      open={open}
      onClose={onClose}
      fundInvest={investorApi.v10InvestorFundsByIdInvestByAmountPost}
      fetchInfo={investorApi.v10InvestorFundsByIdInvestInfoByCurrencyGet}
    />
  );
};

export default FundDeposit;

interface OwnProps {
  id: string;
  onApply(): void;
}
