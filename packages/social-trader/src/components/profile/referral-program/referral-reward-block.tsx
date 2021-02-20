import { LabeledValue } from "components/labeled-value/labeled-value";
import { Row } from "components/row/row";
import { RowItem } from "components/row-item/row-item";
import { Text } from "components/text/text";
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
      <RowItem size={"large"}>
        <LabeledValue
          label={t("profile-page:referral-program.referral-friends-1lvl")}
        >
          <Text size={"xlarge"}>{totalReferralsL1}</Text>
        </LabeledValue>
      </RowItem>
      <RowItem size={"large"}>
        <LabeledValue
          label={t("profile-page:referral-program.referral-friends-2lvl")}
        >
          <Text size={"xlarge"}>{totalReferralsL2}</Text>
        </LabeledValue>
      </RowItem>
      <RowItem size={"large"}>
        <LabeledValue label={t("profile-page:referral-program.total-rewards")}>
          <Text size={"xlarge"}>
            {totalAmount} {currency}
          </Text>
        </LabeledValue>
      </RowItem>
    </Row>
  );
};

interface Props {
  data: PartnershipDetails;
  currency: CurrencyEnum;
}

export const ReferralRewardsBlock = React.memo(_ReferralRewardsBlock);
