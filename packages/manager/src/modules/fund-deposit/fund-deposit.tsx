import * as React from "react";
import FundDepositContainer from "shared/components/deposit/components/fund-deposit-container";
import { IDialogProps } from "shared/components/dialog/dialog";
import managerApi from "shared/services/api-client/manager-api";

const FundDeposit: React.FC<OwnProps & IDialogProps> = ({
  id,
  onApply,
  open,
  onClose
}) => {
  return (
    <FundDepositContainer
      id={id}
      onApply={onApply}
      open={open}
      onClose={onClose}
      fundInvest={managerApi.v10ManagerFundsByIdInvestByAmountPost}
      fetchInfo={managerApi.v10ManagerFundsByIdInvestInfoByCurrencyGet}
    />
  );
};

export default FundDeposit;

interface OwnProps {
  id: string;
  onApply(): void;
}
