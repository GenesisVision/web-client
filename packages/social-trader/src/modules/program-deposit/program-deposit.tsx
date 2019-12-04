import DepositContainer from "components/deposit/components/deposit-container";
import {
  getMinProgramDeposit,
  programInvest
} from "components/deposit/services/program-deposit.service";
import { IDialogProps } from "components/dialog/dialog";
import withLoader from "decorators/with-loader";
import * as React from "react";
import { useSelector } from "react-redux";
import { programMinDepositAmountsSelector } from "reducers/platform-reducer";
import { ASSET } from "shared/constants/constants";
import { CurrencyEnum } from "utils/types";

const _ProgramDeposit: React.FC<OwnProps & IDialogProps> = ({
  entryFee,
  availableToInvest,
  broker,
  id,
  currency,
  onApply = () => {},
  open,
  onClose,
  ownAsset
}) => {
  let programMinDepositAmounts = useSelector(programMinDepositAmountsSelector);
  const minDeposit = getMinProgramDeposit(
    programMinDepositAmounts,
    currency,
    broker
  );
  return (
    <DepositContainer
      ownAsset={ownAsset}
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
  ownAsset?: boolean;
  availableToInvest?: number;
  broker: string;
  id: string;
  currency: CurrencyEnum;
  onApply?: () => void;
}
