import * as React from "react";
import SignalProviderControls from "shared/components/details/details-description-section/details-description/controls/signal-provider-controls/signal-provider-controls";
import SignalInfo from "shared/components/follows/follow-details/follow-details-description/signal-info";
import { IFollowControlsProps } from "shared/components/follows/follow-details/follow-details.types";
import SignalProviderButtons from "shared/components/follows/follow-details/signal-provider-buttons";

const _ProgramControls: React.FC<Props> = ({ description }) => {
  return (
    (description.signalSettings && (
      <SignalProviderControls>
        <SignalInfo description={description} />
        <SignalProviderButtons
          condition={!!description.personalDetails}
          personalDetails={description.personalDetails}
          id={description.id}
          title={description.title}
          currency={description.currency}
        />
      </SignalProviderControls>
    )) ||
    null
  );
};

interface Props extends IFollowControlsProps {}

const FollowControls = React.memo(_ProgramControls);
export default FollowControls;
