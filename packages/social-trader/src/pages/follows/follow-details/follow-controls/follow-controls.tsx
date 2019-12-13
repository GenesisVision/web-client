import SignalProviderControls from "components/details/details-description-section/details-description/controls/signal-provider-controls/signal-provider-controls";
import { withBlurLoader } from "decorators/with-blur-loader";
import { SignalSubscription } from "gv-api-web";
import { ProgramDescriptionDataType } from "pages/programs/program-details/program-details.types";
import * as React from "react";

import SignalInfo from "../follow-details-description/signal-info";
import SignalProviderButtons from "../signal-provider-buttons";

const _FollowControls: React.FC<Props> = ({
  onApply,
  data,
  description: {
    publicInfo: { title },
    tradingAccountInfo: { currency, leverageMax },
    followDetails: { personalDetails, signalSettings },
    id,
    brokerDetails
  }
}) => {
  const signalSubscriptions = data && data[0];
  return (
    <SignalProviderControls>
      <SignalInfo
        successFee={signalSettings.signalSuccessFee}
        volumeFee={signalSettings.signalVolumeFee}
      />
      {personalDetails && (
        <SignalProviderButtons
          onApply={onApply}
          guestActions={personalDetails.guestActions}
          leverage={leverageMax}
          isExternal={
            personalDetails &&
            personalDetails.guestActions &&
            personalDetails.guestActions
              .canSubscribeToExternalSignalPrivateAccount
          }
          brokerId={brokerDetails.id}
          broker={brokerDetails.type}
          signalSubscription={signalSubscriptions}
          id={id}
          title={title}
          currency={currency}
        />
      )}
    </SignalProviderControls>
  );
};

interface Props {
  onApply: VoidFunction;
  data: SignalSubscription[];
  description: ProgramDescriptionDataType;
}

const FollowControls = withBlurLoader(React.memo(_FollowControls));
export default FollowControls;
