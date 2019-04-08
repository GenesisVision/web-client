import * as React from "react";
import ProgramDepositContainer from "shared/components/deposit/components/program-deposit-container";
import { IDialogProps } from "shared/components/dialog/dialog";
import investorApi from "shared/services/api-client/investor-api";

const ProgramDeposit: React.FC<OwnProps & IDialogProps> = ({
  id,
  currency,
  onApply,
  open,
  onClose
}) => {
  return (
    <ProgramDepositContainer
      id={id}
      hasEntryFee
      currency={currency}
      onApply={onApply}
      open={open}
      onClose={onClose}
      programInvest={investorApi.v10InvestorProgramsByIdInvestByAmountPost}
      fetchInfo={investorApi.v10InvestorProgramsByIdInvestInfoByCurrencyGet}
    />
  );
};

export default ProgramDeposit;

interface OwnProps {
  id: string;
  currency: string;
  onApply(): void;
}
