import * as React from "react";
import ProgramDepositContainer from "shared/components/deposit/components/program-deposit-container";
import { IDialogProps } from "shared/components/dialog/dialog";
import managerApi from "shared/services/api-client/manager-api";

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
      currency={currency}
      onApply={onApply}
      open={open}
      onClose={onClose}
      programInvest={managerApi.v10ManagerProgramsByIdInvestByAmountPost}
      fetchInfo={managerApi.v10ManagerProgramsByIdInvestInfoByCurrencyGet}
    />
  );
};

export default ProgramDeposit;

interface OwnProps {
  id: string;
  currency: string;
  onApply(): void;
}
