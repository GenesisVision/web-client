import { fetchSubscriptions } from "components/details/details-description-section/details-investment/details-investment.service";
import SubscriptionTable from "components/details/details-description-section/details-investment/subscription/subscription-table";
import { SignalSubscription } from "gv-api-web";
import useApiRequest from "hooks/api-request.hook";
import React, { useCallback, useEffect } from "react";
import { CurrencyEnum } from "utils/types";

const _SubscriptionContainer: React.FC<Props> = ({
  title,
  renderAssetPopup,
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
      title={title}
      renderAssetPopup={renderAssetPopup}
      assetCurrency={assetCurrency}
      onApply={updateInfo}
      data={data!}
      loaderData={[]}
      id={id}
    />
  );
};

interface Props {
  title: string;
  renderAssetPopup: (popupTop: JSX.Element, form: JSX.Element) => JSX.Element;
  subscribedAccounts?: number;
  id: string;
  assetCurrency: CurrencyEnum;
}

const SubscriptionContainer = React.memo(_SubscriptionContainer);
export default SubscriptionContainer;
