import { FollowDetailsDataType } from "pages/follows/follow-details/follow-details.types";
import * as React from "react";
import SignalProviderControls from "shared/components/details/details-description-section/details-description/controls/signal-provider-controls/signal-provider-controls";

import SignalInfo from "../follow-details-description/signal-info";
import SignalProviderButtons from "../signal-provider-buttons";

const _FollowControls: React.FC<Props> = ({
  description: {
    signalSettings,
    personalDetails,
    id,
    title,
    currency,
    brokerDetails: { type }
  }
}) => {
  return (
    <SignalProviderControls>
      <SignalInfo
        successFee={signalSettings.signalSuccessFee}
        volumeFee={signalSettings.signalVolumeFee}
      />
      <SignalProviderButtons
        broker={type}
        condition={!!personalDetails}
        signalSubscription={
          personalDetails && personalDetails.signalSubscription
        }
        id={id}
        title={title}
        currency={currency}
      />
    </SignalProviderControls>
  );
};

interface Props {
  description: FollowDetailsDataType;
}

const FollowControls = React.memo(_FollowControls);
export default FollowControls;
