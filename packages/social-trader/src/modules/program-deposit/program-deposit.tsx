import * as React from "react";
import { useSelector } from "react-redux";
import DepositContainer from "shared/components/deposit/components/deposit-container";
import {
  getMinProgramDeposit,
  programInvest
} from "shared/components/deposit/services/program-deposit.service";
import { IDialogProps } from "shared/components/dialog/dialog";
import { ASSET } from "shared/constants/constants";
import withLoader from "shared/decorators/with-loader";
import { programMinDepositAmountsSelector } from "shared/reducers/platform-reducer";
import { CurrencyEnum } from "shared/utils/types";

const _ProgramDeposit: React.FC<OwnProps & IDialogProps> = ({
  entryFee,
  availableToInvest,
  broker,
  id,
  currency,
  onApply = () => {},
  open,
  onClose
}) => {
  let programMinDepositAmounts = useSelector(programMinDepositAmountsSelector);
  const minDeposit = getMinProgramDeposit(
    programMinDepositAmounts,
    currency,
    broker
  );
  return (
    <DepositContainer
      availableToInvest={availableToInvest}
      entryFee={entryFee}
      minDeposit={minDeposit}
      asset={ASSET.PROGRAM}
      assetInvest={programInvest}
      id={id}
      hasEntryFee
      currency={currency}
      onApply={onApply}
      open={open}
      onClose={onClose}
    />
  );
};

const ProgramDeposit = withLoader(React.memo(_ProgramDeposit));
export default ProgramDeposit;

interface OwnProps {
  entryFee?: number;
  availableToInvest?: number;
  broker: string;
  id: string;
  currency: CurrencyEnum;
  onApply?: () => void;
}
