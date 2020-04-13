import { DetailsInvestmentBlock } from "components/details/details-description-section/details-investment/blocks/details-investment-block";
import { DetailsInvestmentHeading } from "components/details/details-description-section/details-investment/blocks/details-investment-title";
import { fetchSubscriptions } from "components/details/details-description-section/details-investment/details-investment.service";
import SubscriptionTable from "components/details/details-description-section/details-investment/subscription/subscription-table";
import useApiRequest from "hooks/api-request.hook";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { CurrencyEnum } from "utils/types";

const _Subscription: React.FC<Props> = ({ id, assetCurrency }) => {
  const [t] = useTranslation();
  const { data, sendRequest } = useApiRequest({
    request: fetchSubscriptions,
    fetchOnMount: true,
    fetchOnMountData: id
  });
  const updateInfo = useCallback(() => {
    sendRequest(id);
  }, [id]);

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
  id: string;
  assetCurrency: CurrencyEnum;
}

const SubscriptionContainer = React.memo(_Subscription);
export default SubscriptionContainer;
