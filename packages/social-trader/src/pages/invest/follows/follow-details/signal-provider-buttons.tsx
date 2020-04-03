import { fetchSubscriptions } from "components/details/details-description-section/details-investment/details-investment.service";
import Crashable from "decorators/crashable";
import { AssetGuestActions, BrokerTradeServerType } from "gv-api-web";
import useApiRequest from "hooks/api-request.hook";
import * as React from "react";
import { useCallback } from "react";
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
  broker,
  id,
  currency
}) => {
  const { data, sendRequest } = useApiRequest({
    request: fetchSubscriptions,
    fetchOnMount: true,
    fetchOnMountData: id
  });
  const updateInfo = useCallback(() => {
    sendRequest(id);
    onApply();
  }, [id]);
  const signalSubscription = data && data[0];

  const isExternal = !!canSubscribeToExternalSignalPrivateAccount;
  const hasActiveSubscription =
    !!signalSubscription && signalSubscription.hasActiveSubscription;
  return (
    <div className="asset-details-description__statistic-container asset-details-description__statistic-container--btn">
      {hasActiveSubscription ? (
        <UnFollowButton
          onApply={updateInfo}
          id={id}
          tradingAccountId={signalSubscription!.subscriberInfo.tradingAccountId}
          isExternal={isExternal}
        />
      ) : (
        <FollowButton
          canFollow={
            canSubscribeToExternalSignalCommonAccount ||
            canSubscribeToExternalSignalPrivateAccount ||
            canSubscribeToInternalSignal
          }
          onApply={updateInfo}
          leverage={leverage}
          brokerId={brokerId}
          isExternal={isExternal}
          broker={broker}
          id={id}
          currency={currency}
        />
      )}
    </div>
  );
};

interface Props {
  onApply: VoidFunction;
  guestActions?: AssetGuestActions;
  leverage: number;
  brokerId: string;
  broker: BrokerTradeServerType;
  id: string;
  currency: CurrencyEnum;
}

const SignalProviderButtons = React.memo(Crashable(_SignalProviderButtons));
export default SignalProviderButtons;
