import DetailsBlock, {
  DETAILS_BLOCK_TYPE
} from "components/details/details-block";
import InvestmentProgramInfo from "components/details/details-description-section/investment-program-info";
import { GV_BTN_SIZE } from "components/gv-button";
import { LevelsParamsInfo, ProgramDetailsFull } from "gv-api-web";
import DepositButton from "modules/deposit/deposit.button";
import LevelCalculator from "modules/level-calculator/components/level-calculator";
import * as React from "react";
import { ASSET } from "shared/constants/constants";

const _InvestmentProgramControls: React.FC<Props> = ({
  onApply,
  isOwnProgram,
  programDescription,
  levelsParameters
}) => {
  return (
    <DetailsBlock
      type={DETAILS_BLOCK_TYPE.BORDERED}
      className="details-description__control-elements-block"
    >
      <InvestmentProgramInfo
        isOwnProgram={isOwnProgram}
        programDescription={programDescription}
        levelsParameters={levelsParameters}
        LevelCalculator={LevelCalculator}
      />
      <div className="asset-details-description__statistic-container asset-details-description__statistic-container--btn">
        <DepositButton
          onApply={onApply}
          size={GV_BTN_SIZE.BIG}
          ownAsset={isOwnProgram}
          entryFee={programDescription.entryFeeCurrent}
          availableToInvest={programDescription.availableInvestmentBase}
          broker={programDescription.brokerDetails.type}
          type={ASSET.PROGRAM}
          id={programDescription.id}
          currency={programDescription.currency}
        />
      </div>
    </DetailsBlock>
  );
};

interface Props {
  onApply?: VoidFunction;
  canCloseAsset: boolean;
  isOwnProgram: boolean;
  programDescription: ProgramDetailsFull;
  levelsParameters: LevelsParamsInfo;
}

const InvestmentProgramControls = React.memo(_InvestmentProgramControls);
export default InvestmentProgramControls;
