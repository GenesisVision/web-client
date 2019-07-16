import * as React from "react";
import DepositContainer from "shared/components/deposit/components/deposit-container";
import {
  getProgramInfoCreator,
  programInvestCreator
} from "shared/components/deposit/services/program-deposit.service";
import { IDialogProps } from "shared/components/dialog/dialog";
import { ASSET } from "shared/constants/constants";
import investorApi from "shared/services/api-client/investor-api";
import { CurrencyEnum } from "shared/utils/types";

const _ProgramDeposit: React.FC<OwnProps & IDialogProps> = ({
  id,
  currency,
  onApply,
  open,
  onClose
}) => (
  <DepositContainer
    asset={ASSET.PROGRAM}
    assetInvest={programInvestCreator(
      investorApi.v10InvestorProgramsByIdInvestByAmountPost
    )}
    fetchInfo={getProgramInfoCreator(
      investorApi.v10InvestorProgramsByIdInvestInfoByCurrencyGet
    )}
    id={id}
    hasEntryFee
    currency={currency}
    onApply={onApply}
    open={open}
    onClose={onClose}
  />
);

const ProgramDeposit = React.memo(_ProgramDeposit);
export default ProgramDeposit;

interface OwnProps {
  id: string;
  currency: CurrencyEnum;
  onApply(): void;
}
