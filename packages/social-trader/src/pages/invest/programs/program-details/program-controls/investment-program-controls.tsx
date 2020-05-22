import DetailsBlock, {
  DETAILS_BLOCK_TYPE
} from "components/details/details-block";
import { DetailsStatisticContainer } from "components/details/details-description-section/details-description/details-structure-blocks";
import InvestmentProgramInfo from "components/details/details-description-section/investment-program-info";
import { GV_BTN_SIZE } from "components/gv-button";
import { ASSET } from "constants/constants";
import Crashable from "decorators/crashable";
import {
  AssetPublicDetails,
  BrokerDetails,
  LevelsParamsInfo,
  ProgramDetailsFull,
  ProgramFollowDetailsFullTradingAccountDetails
} from "gv-api-web";
import DepositButton from "modules/deposit/deposit.button";
import NotifyButton from "modules/notity-button/notify-button";
import * as React from "react";
import { useSelector } from "react-redux";
import { isAuthenticatedSelector } from "reducers/auth-reducer";
import { CurrencyEnum } from "utils/types";

const _InvestmentProgramControls: React.FC<Props> = ({
  currency,
  onApply,
  isOwnProgram,
  id,
  programDetails,
  publicInfo,
  brokerDetails,
  tradingAccountInfo,
  levelsParameters
}) => {
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const canInvest = isAuthenticated
    ? !!programDetails.personalDetails &&
      programDetails.personalDetails.canInvest
    : true;
  return (
    <DetailsBlock type={DETAILS_BLOCK_TYPE.BORDERED}>
      <InvestmentProgramInfo
        id={id}
        currency={tradingAccountInfo.currency}
        title={publicInfo.title}
        programDetails={programDetails}
        isOwnProgram={isOwnProgram}
        levelsParameters={levelsParameters}
      />
      <DetailsStatisticContainer>
        {programDetails.availableInvestmentBase === 0 &&
        isAuthenticated &&
        !isOwnProgram ? (
          <NotifyButton
            broker={brokerDetails.type}
            canInvest={programDetails.personalDetails.canInvest}
            currency={currency}
            assetId={id}
          />
        ) : (
          <DepositButton
            disabled={!canInvest}
            title={publicInfo.title}
            onApply={onApply}
            size={GV_BTN_SIZE.BIG}
            ownAsset={isOwnProgram}
            entryFee={programDetails.managementFeeCurrent}
            availableToInvest={programDetails.availableInvestmentBase}
            broker={brokerDetails.type}
            type={ASSET.PROGRAM}
            id={id}
            currency={tradingAccountInfo.currency}
          />
        )}
      </DetailsStatisticContainer>
    </DetailsBlock>
  );
};

interface Props {
  currency: CurrencyEnum;
  id: string;
  programDetails: ProgramDetailsFull;
  publicInfo: AssetPublicDetails;
  brokerDetails: BrokerDetails;
  tradingAccountInfo: ProgramFollowDetailsFullTradingAccountDetails;
  onApply: VoidFunction;
  isOwnProgram: boolean;
  levelsParameters: LevelsParamsInfo;
}

const InvestmentProgramControls = React.memo(
  Crashable(_InvestmentProgramControls)
);
export default InvestmentProgramControls;
