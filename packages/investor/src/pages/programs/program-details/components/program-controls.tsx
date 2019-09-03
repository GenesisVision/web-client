import React from "react";
import { IProgramControlsProps } from "shared/components/programs/program-details/program-details.types";

import InvestmentProgramControls from "./investment-program-controls";
import SignalProviderControls from "./signal-provider-controls";

const ProgramControls: React.FC<IProgramControlsProps> = ({
  programDescription,
  isAuthenticated
}) => {
  const isAvailableFollowingTrades = programDescription.isSignalProgram;
  return (
    <div className="asset-details-description__controls">
      <div className="asset-details-description__col">
        <InvestmentProgramControls
          programDescription={programDescription}
          isAuthenticated={isAuthenticated}
        />
      </div>
      {isAvailableFollowingTrades ? (
        <div className="asset-details-description__col program-details-description__col--small-size">
          <SignalProviderControls
            programDescription={programDescription}
            isAuthenticated={isAuthenticated}
          />
        </div>
      ) : null}
    </div>
  );
};

export default ProgramControls;
