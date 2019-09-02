import * as React from "react";
import { compose } from "redux";
import SignalProgramInfo from "shared/components/programs/program-details/program-details-description/signal-program-info";
import { IProgramControlsProps } from "shared/components/programs/program-details/program-details.types";
import withLoader, { WithLoaderProps } from "shared/decorators/with-loader";

import InvestmentProgramControls from "./investment-program-controls";

const _ProgramControls: React.FC<Props> = ({
  programDescription,
  levelsParameters,
  isAuthenticated,
  redirectToLogin
}) => {
  const personalProgramDetails = programDescription.personalProgramDetails;
  const canCloseProgram =
    personalProgramDetails && personalProgramDetails.canCloseProgram;
  const isOwnProgram =
    personalProgramDetails && personalProgramDetails.isOwnProgram;

  return (
    <div className="asset-details-description__controls">
      <div className="asset-details-description__col">
        <InvestmentProgramControls
          programDescription={programDescription}
          canCloseProgram={canCloseProgram}
          isOwnProgram={isOwnProgram}
          isAuthenticated={isAuthenticated}
          redirectToLogin={redirectToLogin}
          levelsParameters={levelsParameters}
        />
      </div>
      {isOwnProgram && programDescription.isSignalProgram && (
        <div className="program-details-description__col program-details-description__col--small-size">
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
