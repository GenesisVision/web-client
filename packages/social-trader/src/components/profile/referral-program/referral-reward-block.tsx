import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { StatisticItemList } from "components/statistic-item-list/statistic-item-list";
import StatisticItem from "components/statistic-item/statistic-item";
import StatisticItemInner from "components/statistic-item/statistic-item-inner";
import { withBlurLoader } from "decorators/with-blur-loader";
import { PartnershipDetails } from "gv-api-web";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { CurrencyEnum } from "utils/types";

const _ReferralRewardsBlock: React.FC<Props> = ({
  data: { totalReferralsL1, totalReferralsL2, totalAmount },
  currency
}) => {
  const [t] = useTranslation();
  return (
    <Row>
      <RowItem large>
        <StatisticItemInner
          big
          label={t("profile-page.referral-program.referral-friends-1lvl")}
        >
          {totalReferralsL1}
        </StatisticItemInner>
      </RowItem>
      <RowItem large>
        <StatisticItemInner
          big
          label={t("profile-page.referral-program.referral-friends-2lvl")}
        >
          {totalReferralsL2}
        </StatisticItemInner>
      </RowItem>
      <RowItem large>
        <StatisticItemInner
          big
          label={t("profile-page.referral-program.total-rewards")}
        >
          {totalAmount} {currency}
        </StatisticItemInner>
      </RowItem>
    </Row>
  );
};

interface Props {
  data: PartnershipDetails;
  currency: CurrencyEnum;
}

export const ReferralRewardsBlock = withBlurLoader(
  React.memo(_ReferralRewardsBlock)
);
