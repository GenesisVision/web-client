import * as React from "react";
import SignalProviderControls from "shared/components/details/details-description-section/details-description/controls/signal-provider-controls/signal-provider-controls";
import SignalInfo from "shared/components/follows/follow-details/follow-details-description/signal-info";
import { IFollowControlsProps } from "shared/components/follows/follow-details/follow-details.types";

const _ProgramControls: React.FC<Props> = ({ description }) => {
  const personalProgramDetails = description.personalProgramDetails;
  const isOwnProgram =
    personalProgramDetails && personalProgramDetails.isOwnProgram;

  return (
    <div className="asset-details-description__controls">
      {isOwnProgram && description.isSignalProgram && (
        <SignalProviderControls>
          <SignalInfo description={description} />
        </SignalProviderControls>
      )}
    </div>
  );
};

interface Props extends IFollowControlsProps {}

const FollowControls = React.memo(_ProgramControls);
export default FollowControls;
