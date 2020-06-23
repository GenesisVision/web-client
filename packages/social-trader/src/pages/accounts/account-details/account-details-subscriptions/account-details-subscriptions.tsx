import DetailsBlock from "components/details/details-block";
import DetailsBlockTitleBox from "components/details/details-block-title-box";
import React from "react";
import { useTranslation } from "react-i18next";
import { CurrencyEnum } from "utils/types";

import SubscriptionsContainer from "./subscriptions.container";

const _AccountDetailsSubscriptions: React.FC<Props> = ({
  id,
  assetCurrency
}) => {
  const [t] = useTranslation();
  return (
    <div>
      <DetailsBlock table wide>
        <DetailsBlockTitleBox>
          <h3>{t("account-details-page:subscriptions.title")}</h3>
        </DetailsBlockTitleBox>
        <SubscriptionsContainer id={id} assetCurrency={assetCurrency} />
      </DetailsBlock>
    </div>
  );
};

interface Props {
  id: string;
  assetCurrency: CurrencyEnum;
}

const AccountDetailsSubscriptions = React.memo(_AccountDetailsSubscriptions);
export default AccountDetailsSubscriptions;
