import {
  fetchSubscriptions,
  SignalSubscriptionLoaderData
} from "components/details/details-description-section/details-investment/details-investment.service";
import Subscription from "components/details/details-description-section/details-investment/subscription";
import useApiRequest from "hooks/api-request.hook";
import React, { useCallback } from "react";
import { CurrencyEnum } from "utils/types";

const _Subscription: React.FC<Props> = ({ id, assetCurrency }) => {
  const { data, sendRequest } = useApiRequest({
    request: fetchSubscriptions,
    fetchOnMount: true,
    fetchOnMountData: id
  });
  const updateInfo = useCallback(() => {
    sendRequest(id);
  }, [id]);

  return (
    <Subscription
      loaderData={SignalSubscriptionLoaderData}
      data={data! && data![0]!}
      updateInfo={updateInfo}
      id={id}
      assetCurrency={assetCurrency}
    />
  );
};

interface Props {
  id: string;
  assetCurrency: CurrencyEnum;
}

const SubscriptionContainer = React.memo(_Subscription);
export default SubscriptionContainer;
