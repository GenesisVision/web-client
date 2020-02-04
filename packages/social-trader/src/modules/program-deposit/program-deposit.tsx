import DepositContainer from "components/deposit/components/deposit-container";
import { getMinProgramDeposit } from "components/deposit/services/program-deposit.service";
import { IDialogProps } from "components/dialog/dialog";
import { ASSET } from "constants/constants";
import withLoader from "decorators/with-loader";
import * as React from "react";
import { useSelector } from "react-redux";
import { programMinDepositAmountsSelector } from "reducers/platform-reducer";
import { CurrencyEnum } from "utils/types";

const _ProgramDeposit: React.FC<OwnProps & IDialogProps> = ({
  title,
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
      title={title}
      ownAsset={ownAsset}
      availableToInvest={availableToInvest}
      entryFee={entryFee}
      minDeposit={minDeposit}
      asset={ASSET.PROGRAM}
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
  title: string;
  entryFee?: number;
  ownAsset?: boolean;
  availableToInvest?: number;
  broker: string;
  id: string;
  currency: CurrencyEnum;
  onApply?: () => void;
}
