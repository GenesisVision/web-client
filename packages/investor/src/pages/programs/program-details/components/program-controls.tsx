import React from "react";
import DetailsBlock, {
  DETAILS_BLOCK_TYPE
} from "shared/components/details/details-block";
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
      <InvestmentProgramControls
        programDescription={programDescription}
        isAuthenticated={isAuthenticated}
      />
      {isAvailableFollowingTrades ? (
        <DetailsBlock
          type={DETAILS_BLOCK_TYPE.BORDERED}
          className="asset-details-description__col"
        >
          <SignalProviderControls
            programDescription={programDescription}
            isAuthenticated={isAuthenticated}
          />
        </DetailsBlock>
      ) : null}
    </div>
  );
};

const ProgramControls = React.memo(_ProgramControls);
export default ProgramControls;
