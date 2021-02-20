import { DefaultTableBlock } from "components/default.block/default-table.block";
import { REFERRAL_PROGRAM } from "components/profile/profile.constants";
import ProfileLayout from "components/profile/profile-layout";
import { Row } from "components/row/row";
import SettingsBlock from "components/settings-block/settings-block";
import { ProfileFullViewModel } from "gv-api-web";
import { useAccountCurrency } from "hooks/account-currency.hook";
import useApiRequest from "hooks/api-request.hook";
import * as React from "react";

import { InviteBlock, inviteBlockLoaderData } from "./invite-block";
import { ReferralFriendsTable } from "./referral-friends-table";
import { ReferralHistoryTable } from "./referral-history-table";
import styles from "./referral-program.module.scss";
import { ReferralRewardsBlock } from "./referral-reward-block";
import {
  getProfile,
  getReferralDetails
} from "./services/referral-program-services";

const _ReferralProgramPage: React.FC = () => {
  const currency = useAccountCurrency();
  const { data: profile } = useApiRequest<ProfileFullViewModel>({
    fetchOnMount: true,
    request: getProfile
  });
  const { data: rewards } = useApiRequest({
    fetchOnMount: true,
    fetchOnMountData: currency,
    request: getReferralDetails
  });
  return (
    <ProfileLayout route={REFERRAL_PROGRAM}>
      <SettingsBlock>
        <InviteBlock data={profile!} loaderData={inviteBlockLoaderData} />
      </SettingsBlock>
      {rewards && (
        <SettingsBlock>
          <ReferralRewardsBlock data={rewards} currency={currency} />
        </SettingsBlock>
      )}
      <Row
        center={false}
        size={"large"}
        className={styles["referral-program__tables"]}
      >
        <DefaultTableBlock className={styles["referral-program__table"]}>
          <ReferralFriendsTable />
        </DefaultTableBlock>
        <DefaultTableBlock className={styles["referral-program__table"]}>
          <ReferralHistoryTable />
        </DefaultTableBlock>
      </Row>
    </ProfileLayout>
  );
};

const ReferralProgramPage = React.memo(_ReferralProgramPage);
export default ReferralProgramPage;
