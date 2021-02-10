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
  AssetDetailsExtraBlock: React.ComponentType<any>;
  ownerUrl: string;
  renderFees?: React.ReactNode;
  programLevel: number;
  programLogo: string;
  programOwner: string;
  brokerName: string;
  brokerLogo: string;
  isProcessingRealTime?: boolean;
  title: string;
  entryFee?: number;
  ownAsset?: boolean;
  availableToInvest?: number;
  broker: string;
  id: string;
  currency: CurrencyEnum;
  onApply?: () => void;
  totalAvailableInvestment?: number;
  programColor: string;
  programLevelProgress?: number;
}

interface Props extends OwnProps, IDialogProps { }

const _ProgramDeposit: React.FC<Props> = ({
  ownerUrl,
  totalAvailableInvestment,
  programColor,
  programLevelProgress,
  programLevel,
  programLogo,
  renderFees,
  AssetDetailsExtraBlock,
  brokerLogo,
  brokerName,
  programOwner,
  isProcessingRealTime,
  title,
  entryFee,
  availableToInvest,
  broker,
  id,
  currency,
  onApply = () => { },
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
  const { data: minDeposits, sendRequest: getMinDeposits } = useApiRequest({
    name: "getMinProgramDeposits",
    cache: true,
    request: getMinProgramDeposits
  });
  const { data: withdrawInfo, sendRequest: getWithdrawInfo } = useApiRequest({
    name: "getProgramWithdrawInfo",
    cache: true,
    request: getProgramWithdrawInfo
  });
  useEffect(() => {
    if (open) {
      getWithdrawInfo({ id });
      getMinDeposits({ minDeposit, programCurrency: currency });
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
      ownerUrl={ownerUrl}
      totalAvailableInvestment={totalAvailableInvestment}
      assetColor={programColor}
      assetLevelProgress={programLevelProgress}
      assetLevel={programLevel}
      assetLogo={programLogo}
      AssetDetailsExtraBlock={AssetDetailsExtraBlock}
      renderFees={renderFees}
      brokerName={brokerName}
      brokerLogo={brokerLogo}
      assetOwner={programOwner}
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
