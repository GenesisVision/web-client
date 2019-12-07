import "./details-investment.scss";

import { DetailsInvestmentBlock } from "components/details/details-description-section/details-investment/blocks/details-investment-block";
import { DetailsInvestmentFooter } from "components/details/details-description-section/details-investment/blocks/details-investment-footer";
import { DetailsInvestmentHeading } from "components/details/details-description-section/details-investment/blocks/details-investment-title";
import { StatisticItemList } from "components/statistic-item-list/statistic-item-list";
import StatisticItem from "components/statistic-item/statistic-item";
import { PersonalFollowDetailsFull } from "gv-api-web";
import EditFollowButton from "pages/follows/follow-details/edit-follow-button";
import React from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import { formatCurrencyValue } from "utils/formatter";
import { CurrencyEnum } from "utils/types";

const _Subscription: React.FC<Props> = ({
  updateDescription,
  id,
  assetCurrency,
  personalDetails
}) => {
  const [t] = useTranslation();
  const subscriptionInfo = personalDetails.signalSubscriptions[0];
  return (
    <DetailsInvestmentBlock>
      <DetailsInvestmentHeading>
        {t("follow-details-page.current-investment.title")}
      </DetailsInvestmentHeading>
      <StatisticItemList>
        <StatisticItem
          accent
          label={t("follow-details-page.current-investment.fields.profit")}
        >
          <NumberFormat
            value={formatCurrencyValue(
              subscriptionInfo.totalProfit,
              assetCurrency
            )}
            suffix={` ${assetCurrency}`}
            displayType="text"
          />
        </StatisticItem>
        <StatisticItem
          accent
          label={t("follow-details-page.current-investment.fields.status")}
        >
          ???
        </StatisticItem>
        <StatisticItem
          accent
          label={t("follow-details-page.current-investment.fields.type")}
        >
          {subscriptionInfo.mode}
        </StatisticItem>
        <StatisticItem
          accent
          label={t("follow-details-page.current-investment.fields.percentage")}
        >
          <NumberFormat
            value={subscriptionInfo.percent}
            suffix={` %`}
            displayType="text"
          />
        </StatisticItem>
      </StatisticItemList>
      <DetailsInvestmentFooter>
        <EditFollowButton
          currency={assetCurrency}
          tradingAccountId={subscriptionInfo.followAssetId}
          id={id}
        />
      </DetailsInvestmentFooter>
    </DetailsInvestmentBlock>
  );
};

interface Props {
  updateDescription: () => void;
  id: string;
  assetCurrency: CurrencyEnum;
  personalDetails: PersonalFollowDetailsFull;
}

const Subscription = React.memo(_Subscription);
export default Subscription;
