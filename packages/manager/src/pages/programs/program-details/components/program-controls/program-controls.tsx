import * as React from "react";
import { compose } from "redux";
import SignalProgramInfo from "shared/components/programs/program-details/asset-details-description/signal-program-info";
import { IProgramControlsProps } from "shared/components/programs/program-details/program-details.types";
import withLoader, { WithLoaderProps } from "shared/decorators/with-loader";

import InvestmentProgramControls from "./investment-program-controls";

const _ProgramControls: React.FC<Props> = ({
  programDescription,
  levelsParameters,
  isAuthenticated
}) => {
  const personalProgramDetails = programDescription.personalProgramDetails;
  const canCloseProgram =
    personalProgramDetails && personalProgramDetails.canCloseProgram;
  const isOwnProgram =
    personalProgramDetails && personalProgramDetails.isOwnProgram;

  return (
    <div className="asset-details-description__controls">
      <div className="asset-details-description__col details__block">
        <InvestmentProgramControls
          programDescription={programDescription}
          canCloseProgram={canCloseProgram}
          isOwnProgram={isOwnProgram}
          isAuthenticated={isAuthenticated}
          levelsParameters={levelsParameters}
        />
      </div>
      {isOwnProgram && programDescription.isSignalProgram && (
        <div className="asset-details-description__col asset-details-description__col--small-size  details__block">
          <SignalProgramInfo programDescription={programDescription} />
        </div>
      )}
    </div>
  );
};

interface Props extends IProgramControlsProps {}

const ProgramControls = compose<
  React.ComponentType<IProgramControlsProps & WithLoaderProps>
>(
  withLoader,
  React.memo
)(_ProgramControls);
export default ProgramControls;
