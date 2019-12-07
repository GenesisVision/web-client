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
  guestActions: {
    canSubscribeToExternalSignalCommonAccount,
    canSubscribeToExternalSignalPrivateAccount,
    canSubscribeToInternalSignal
  },
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
  const hasSignalAccount =
    !!signalSubscription && signalSubscription.hasSignalAccount;
  return (
    <div className="asset-details-description__statistic-container asset-details-description__statistic-container--btn">
      {hasActiveSubscription ? (
        <UnFollowButton
          id={id}
          tradingAccountId={signalSubscription!.followAssetId}
          isExternal={isExternal}
        />
      ) : (
        (canSubscribeToExternalSignalCommonAccount ||
          canSubscribeToExternalSignalPrivateAccount ||
          canSubscribeToInternalSignal) && (
          <FollowButton
            hasSignalAccount={hasSignalAccount}
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
  guestActions: AssetGuestActions;
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
