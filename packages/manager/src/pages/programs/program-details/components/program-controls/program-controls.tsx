import { LevelsParamsInfo } from "gv-api-web";
import * as React from "react";
import { compose } from "redux";
import SignalProviderControls from "shared/components/details/details-description-section/details-description/controls/signal-provider-controls/signal-provider-controls";
import SignalProgramInfo from "shared/components/programs/program-details/program-details-description/signal-program-info";
import { IProgramControlsProps } from "shared/components/programs/program-details/program-details.types";
import {
  withBlurLoader,
  WithBlurLoaderProps
} from "shared/decorators/with-blur-loader";

import InvestmentProgramControls from "./investment-program-controls";

const _ProgramControls: React.FC<Props> = ({
  programDescription,
  data: levelsParameters,
  isAuthenticated
}) => {
  const personalProgramDetails = programDescription.personalProgramDetails;
  const canCloseAsset =
    personalProgramDetails && personalProgramDetails.canCloseAsset;
  const isOwnProgram =
    personalProgramDetails && personalProgramDetails.isOwnProgram;

  return (
    <>
      <InvestmentProgramControls
        programDescription={programDescription}
        canCloseAsset={canCloseAsset}
        isOwnProgram={isOwnProgram}
        isAuthenticated={isAuthenticated}
        levelsParameters={levelsParameters}
      />
      {isOwnProgram && programDescription.isSignalProgram && (
        <SignalProviderControls>
          <SignalProgramInfo programDescription={programDescription} />
        </SignalProviderControls>
      )}
    </>
  );
};

interface Props extends IProgramControlsProps {}

const ProgramControls = compose<
  React.ComponentType<
    IProgramControlsProps & WithBlurLoaderProps<LevelsParamsInfo>
  >
>(
  withBlurLoader,
  React.memo
)(_ProgramControls);
export default ProgramControls;
