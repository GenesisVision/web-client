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
import { getProgramWithdrawInfo } from "modules/program-withdraw/services/program-withdraw.services";
import * as React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { programMinDepositAmountsSelector } from "reducers/platform-reducer";
import { CurrencyEnum } from "utils/types";

interface OwnProps {
  renderAssetPopup: (popupTop: JSX.Element, form: JSX.Element) => JSX.Element;
  isProcessingRealTime?: boolean;
  title: string;
  entryFee?: number;
  ownAsset?: boolean;
  availableToInvest?: number;
  broker: string;
  id: string;
  currency: CurrencyEnum;
  onApply?: () => void;
}

interface Props extends OwnProps, IDialogProps {}

const _ProgramDeposit: React.FC<Props> = ({
  renderAssetPopup,
  isProcessingRealTime,
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

  const minDeposits = getMinProgramDeposits({
    broker,
    programMinDepositAmounts: programMinDepositAmounts
  });
  const { data: withdrawInfo, sendRequest: getWithdrawInfo } = useApiRequest({
    name: "getProgramWithdrawInfo",
    cache: true,
    request: getProgramWithdrawInfo
  });
  useEffect(() => {
    if (open) {
      getWithdrawInfo({ id });
    }
  }, [open]);

  const infoMessage =
    withdrawInfo && !isProcessingRealTime
      ? `Your request will be processed at ${new Date(
          withdrawInfo?.periodEnds
        ).toUTCString()}`
      : undefined;

  return (
    <DepositContainer
      renderAssetPopup={renderAssetPopup}
      infoMessage={infoMessage}
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
