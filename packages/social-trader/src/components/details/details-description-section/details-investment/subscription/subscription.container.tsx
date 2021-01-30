import { fetchSubscriptions } from "components/details/details-description-section/details-investment/details-investment.service";
import SubscriptionTable
  from "components/details/details-description-section/details-investment/subscription/subscription-table";
import useApiRequest from "hooks/api-request.hook";
import React, { useCallback, useEffect } from "react";
import { CurrencyEnum } from "utils/types";
import { SignalSubscription } from "gv-api-web";

const _SubscriptionContainer: React.FC<Props> = ({
  id,
  assetCurrency,
  subscribedAccounts
}) => {
  const { data, sendRequest } = useApiRequest<SignalSubscription[]>({
    name: "SubscriptionContainer",
    cache: true,
    request: fetchSubscriptions
  });
  const updateInfo = useCallback(() => {
    sendRequest(id);
  }, [id]);
  useEffect(() => {
    sendRequest(id);
  }, [id, subscribedAccounts]);

  return (
    <SubscriptionTable
      assetCurrency={assetCurrency}
      onApply={updateInfo}
      data={data!}
      loaderData={[]}
      id={id}
    />
  );
};

interface Props {
  subscribedAccounts?: number;
  id: string;
  assetCurrency: CurrencyEnum;
}

const SubscriptionContainer = React.memo(_SubscriptionContainer);
export default SubscriptionContainer;
