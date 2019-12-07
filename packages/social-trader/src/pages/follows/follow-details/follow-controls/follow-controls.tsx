import SignalProviderControls from "components/details/details-description-section/details-description/controls/signal-provider-controls/signal-provider-controls";
import { FollowDetailsDataType } from "pages/follows/follow-details/follow-details.types";
import * as React from "react";

import SignalInfo from "../follow-details-description/signal-info";
import SignalProviderButtons from "../signal-provider-buttons";

const _FollowControls: React.FC<Props> = ({
  description: {
    signalSettings,
    personalDetails,
    id,
    title,
    currency,
    brokerDetails
  }
}) => {
  return (
    <SignalProviderControls>
      <SignalInfo
        successFee={signalSettings.signalSuccessFee}
        volumeFee={signalSettings.signalVolumeFee}
      />
      {personalDetails && !!personalDetails.signalSubscriptions.length && (
        <SignalProviderButtons
          leverage={personalDetails ? personalDetails.leverage : 0}
          isExternal={
            personalDetails &&
            personalDetails.guestActions &&
            personalDetails.guestActions
              .canSubscribeToExternalSignalPrivateAccount
          }
          brokerId={brokerDetails.id}
          broker={brokerDetails.type}
          signalSubscription={
            personalDetails && personalDetails.signalSubscriptions[0] //TODO
          }
          id={id}
          title={title}
          currency={currency}
        />
      )}
    </SignalProviderControls>
  );
};

interface Props {
  description: FollowDetailsDataType;
}

const FollowControls = React.memo(_FollowControls);
export default FollowControls;
