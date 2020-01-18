import DetailsBlock, {
  DETAILS_BLOCK_TYPE
} from "components/details/details-block";
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
import { ProgramDescriptionDataType } from "pages/invest/programs/program-details/program-details.types";
import * as React from "react";
import { useSelector } from "react-redux";
import { isAuthenticatedSelector } from "reducers/auth-reducer";

const _InvestmentProgramControls: React.FC<Props> = ({
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
    <DetailsBlock
      type={DETAILS_BLOCK_TYPE.BORDERED}
      className="details-description__control-elements-block"
    >
      <InvestmentProgramInfo
        id={id}
        currency={tradingAccountInfo.currency}
        title={publicInfo.title}
        programDetails={programDetails}
        isOwnProgram={isOwnProgram}
        levelsParameters={levelsParameters}
      />
      <div className="asset-details-description__statistic-container asset-details-description__statistic-container--btn">
        <DepositButton
          disabled={!canInvest}
          title={publicInfo.title}
          onApply={onApply}
          size={GV_BTN_SIZE.BIG}
          ownAsset={isOwnProgram}
          entryFee={programDetails.entryFeeCurrent}
          availableToInvest={programDetails.availableInvestmentBase}
          broker={brokerDetails.type}
          type={ASSET.PROGRAM}
          id={id}
          currency={tradingAccountInfo.currency}
        />
      </div>
    </DetailsBlock>
  );
};

interface Props {
  id: string;
  programDetails: ProgramDetailsFull;
  publicInfo: AssetPublicDetails;
  brokerDetails: BrokerDetails;
  tradingAccountInfo: ProgramFollowDetailsFullTradingAccountDetails;
  onApply: VoidFunction;
  isOwnProgram: boolean;
  description: ProgramDescriptionDataType;
  levelsParameters: LevelsParamsInfo;
}

const InvestmentProgramControls = React.memo(
  Crashable(_InvestmentProgramControls)
);
export default InvestmentProgramControls;
