import * as React from "react";
import { useTranslation } from "react-i18next";
import SettingsBlock from "shared/components/settings-block/settings-block";
import { StatisticItemList } from "shared/components/statistic-item-list/statistic-item-list";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { withBlurLoader } from "shared/decorators/with-blur-loader";
import { CurrencyEnum } from "shared/utils/types";

const _ReferralRewardsBlock: React.FC<Props> = ({
  data: { firstLevel, secondLevel, amountTotal },
  currency
}) => {
  const [t] = useTranslation();
  return (
    <SettingsBlock>
      <StatisticItemList>
        <StatisticItem
          big
          label={t("profile-page.referral-program.referral-friends-1lvl")}
        >
          {firstLevel}
        </StatisticItem>
        <StatisticItem
          big
          label={t("profile-page.referral-program.referral-friends-2lvl")}
        >
          {secondLevel}
        </StatisticItem>
        <StatisticItem
          big
          label={t("profile-page.referral-program.total-rewards")}
        >
          {amountTotal} {currency}
        </StatisticItem>
      </StatisticItemList>
    </SettingsBlock>
  );
};

export interface IRewards {
  firstLevel: number;
  secondLevel: number;
  amountTotal: number;
}

interface Props {
  data: IRewards;
  currency: CurrencyEnum;
}

export const ReferralRewardsBlock = withBlurLoader(
  React.memo(_ReferralRewardsBlock)
);
