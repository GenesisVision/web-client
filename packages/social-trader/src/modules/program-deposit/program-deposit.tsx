import DepositContainer from "components/deposit/components/deposit-container";
import {
  getMinProgramDeposit,
  getMinProgramDeposits,
  minProgramDepositsDefaultData
} from "components/deposit/services/program-deposit.service";
import { IDialogProps } from "components/dialog/dialog";
import { ASSET } from "constants/constants";
import withLoader from "decorators/with-loader";
import useApiRequest from "hooks/api-request.hook";
import * as React from "react";
import { useEffect } from "react";
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
  const programMinDepositAmounts = useSelector(
    programMinDepositAmountsSelector
  );
  const minDeposit = getMinProgramDeposit(
    programMinDepositAmounts,
    currency,
    broker
  );
  const { data: minDeposits, sendRequest } = useApiRequest({
    request: getMinProgramDeposits
  });
  useEffect(() => {
    open && sendRequest({ minDeposit, programCurrency: currency });
  }, [open]);
  return (
    <DepositContainer
      title={title}
      ownAsset={ownAsset}
      availableToInvest={availableToInvest}
      entryFee={entryFee}
      minDeposit={minDeposits || minProgramDepositsDefaultData}
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
