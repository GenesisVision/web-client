import { LevelsParamsInfo } from "gv-api-web";
import * as React from "react";
import { compose } from "redux";
import DetailsBlock, {
  DETAILS_BLOCK_TYPE
} from "shared/components/details/details-block";
import SignalProgramInfo from "shared/components/programs/program-details/program-details-description/signal-program-info";
import { IProgramControlsProps } from "shared/components/programs/program-details/program-details.types";
import {
  WithBlurLoaderProps,
  withBlurLoader
} from "shared/decorators/with-blur-loader";

import InvestmentProgramControls from "./investment-program-controls";

const _ProgramControls: React.FC<Props> = ({
  programDescription,
  data: levelsParameters,
  isAuthenticated
}) => {
  const personalProgramDetails = programDescription.personalProgramDetails;
  const canCloseProgram =
    personalProgramDetails && personalProgramDetails.canCloseProgram;
  const isOwnProgram =
    personalProgramDetails && personalProgramDetails.isOwnProgram;

  return (
    <div className="asset-details-description__controls">
      <InvestmentProgramControls
        programDescription={programDescription}
        canCloseProgram={canCloseProgram}
        isOwnProgram={isOwnProgram}
        isAuthenticated={isAuthenticated}
        levelsParameters={levelsParameters}
      />
      {isOwnProgram && programDescription.isSignalProgram && (
        <DetailsBlock
          type={DETAILS_BLOCK_TYPE.BORDERED}
          className="asset-details-description__col"
        >
          <SignalProgramInfo programDescription={programDescription} />
        </DetailsBlock>
      )}
    </div>
  );
};

interface Props extends IProgramControlsProps {}

const ProgramControls = compose<
  React.ComponentType<IProgramControlsProps & WithBlurLoaderProps<LevelsParamsInfo>>
>(
  withBlurLoader,
  React.memo
)(_ProgramControls);
export default ProgramControls;
