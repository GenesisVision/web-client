import useApiRequest from "hooks/api-request.hook";
import { getAccountSubscriptionsLoaderData } from "pages/accounts/account-details/account-details.loader-data";
import { fetchAccountSubscriptions } from "pages/accounts/account-details/services/account-details.service";
import React, { useCallback } from "react";
import { CurrencyEnum } from "utils/types";

import SubscriptionsTable from "./subscriptions-table";

const _SubscriptionsContainer: React.FC<Props> = ({ id, assetCurrency }) => {
  const { data, sendRequest } = useApiRequest({
    name: "fetchAccountSubscriptions",
    cache: true,
    request: fetchAccountSubscriptions,
    fetchOnMount: true,
    fetchOnMountData: id
  });
  const updateInfo = useCallback(() => {
    sendRequest(id);
  }, [id]);
  return (
    <SubscriptionsTable
      assetCurrency={assetCurrency}
      onApply={updateInfo}
      data={data!}
      loaderData={getAccountSubscriptionsLoaderData()}
      id={id}
    />
  );
};

interface Props {
  id: string;
  assetCurrency: CurrencyEnum;
}

const SubscriptionsContainer = React.memo(_SubscriptionsContainer);
export default SubscriptionsContainer;
