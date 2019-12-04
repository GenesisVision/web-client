import { BrokerTradeServerType, SignalSubscription } from "gv-api-web";
import * as React from "react";
import { CurrencyEnum } from "utils/types";

import FollowButton from "./follow-button";
import UnFollowButton from "./unfollow-button";

const _SignalProviderButtons: React.FC<Props> = ({
  brokerId,
  isExternal,
  broker,
  signalSubscription,
  id,
  title,
  currency
}) => {
  return (
    <div className="asset-details-description__statistic-container asset-details-description__statistic-container--btn">
      {signalSubscription.hasActiveSubscription ? (
        <UnFollowButton id={id} />
      ) : (
        <FollowButton
          brokerId={brokerId}
          isExternal={isExternal}
          broker={broker}
          signalSubscription={signalSubscription}
          id={id}
          title={title}
          currency={currency}
        />
      )}
    </div>
  );
};

interface Props {
  isExternal: boolean;
  brokerId: string;
  broker: BrokerTradeServerType;
  signalSubscription: SignalSubscription;
  id: string;
  title: string;
  currency: CurrencyEnum;
}

const SignalProviderButtons = React.memo(_SignalProviderButtons);
export default SignalProviderButtons;
