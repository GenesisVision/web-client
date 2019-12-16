import {
  AssetGuestActions,
  BrokerTradeServerType,
  SignalSubscription
} from "gv-api-web";
import * as React from "react";
import { CurrencyEnum } from "utils/types";

import FollowButton from "./follow-button";
import UnFollowButton from "./unfollow-button";

const _SignalProviderButtons: React.FC<Props> = ({
  onApply,
  guestActions: {
    canSubscribeToExternalSignalCommonAccount,
    canSubscribeToExternalSignalPrivateAccount,
    canSubscribeToInternalSignal
  } = {},
  leverage,
  brokerId,
  isExternal,
  broker,
  signalSubscription,
  id,
  title,
  currency
}) => {
  const hasActiveSubscription =
    !!signalSubscription && signalSubscription.hasActiveSubscription;
  return (
    <div className="asset-details-description__statistic-container asset-details-description__statistic-container--btn">
      {hasActiveSubscription ? (
        <UnFollowButton
          onApply={onApply}
          id={id}
          tradingAccountId={signalSubscription!.subscriberInfo.tradingAccountId}
          isExternal={isExternal}
        />
      ) : (
        (canSubscribeToExternalSignalCommonAccount ||
          canSubscribeToExternalSignalPrivateAccount ||
          canSubscribeToInternalSignal) && (
          <FollowButton
            onApply={onApply}
            leverage={leverage}
            brokerId={brokerId}
            isExternal={isExternal}
            broker={broker}
            id={id}
            title={title}
            currency={currency}
          />
        )
      )}
    </div>
  );
};

interface Props {
  onApply: VoidFunction;
  guestActions?: AssetGuestActions;
  leverage: number;
  isExternal: boolean;
  brokerId: string;
  broker: BrokerTradeServerType;
  signalSubscription?: SignalSubscription;
  id: string;
  title: string;
  currency: CurrencyEnum;
}

const SignalProviderButtons = React.memo(_SignalProviderButtons);
export default SignalProviderButtons;
