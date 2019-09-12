import React from "react";
import { IProgramControlsProps } from "shared/components/programs/program-details/program-details.types";

import InvestmentProgramControls from "./investment-program-controls";
import SignalProviderControls from "./signal-provider-controls";

const _ProgramControls: React.FC<IProgramControlsProps> = ({
  programDescription,
  isAuthenticated
}) => {
  const isAvailableFollowingTrades = programDescription.isSignalProgram;
  return (
    <div className="asset-details-description__controls">
      <div className="asset-details-description__col  details__block">
        <InvestmentProgramControls
          programDescription={programDescription}
          isAuthenticated={isAuthenticated}
        />
      </div>
      {isAvailableFollowingTrades ? (
        <div className="asset-details-description__col program-details-description__col--small-size  details__block">
          <SignalProviderControls
            programDescription={programDescription}
            isAuthenticated={isAuthenticated}
          />
        </div>
      ) : null}
    </div>
  );
};

const ProgramControls = React.memo(_ProgramControls);
export default ProgramControls;
