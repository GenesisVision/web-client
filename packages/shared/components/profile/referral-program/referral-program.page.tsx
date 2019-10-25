import "./referral-program.scss";

import * as faker from "faker";
import { ProfileFullViewModel } from "gv-api-web";
import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DetailsBlock from "shared/components/details/details-block";
import ProfileLayout from "shared/components/profile/profile-layout";
import { REFERRAL_PROGRAM } from "shared/components/profile/profile.constants";
import SettingsBlock from "shared/components/settings-block/settings-block";
import useApiRequest from "shared/hooks/api-request.hook";
import { referralDetailsSelector } from "shared/reducers/profile-reducer";
import { getRandomInteger } from "shared/utils/helpers";

import { InviteBlock, inviteBlockLoaderData } from "./invite-block";
import { ReferralFriendsTable } from "./referral-friends-table";
import { ReferralHistoryTable } from "./referral-history-table";
import { ReferralRewardsBlock } from "./referral-reward-block";
import {
  getProfile,
  getReferralDetails
} from "./services/referral-program-services";

const _ReferralProgramPage: React.FC = () => {
  const dispatch = useDispatch();
  const { sendRequest, data } = useApiRequest<ProfileFullViewModel>({
    request: getProfile
  });
  useEffect(() => {
    dispatch(getReferralDetails());
    sendRequest();
  }, []);
  const rewards = useSelector(referralDetailsSelector);
  return (
    <ProfileLayout route={REFERRAL_PROGRAM}>
      <SettingsBlock>
        <InviteBlock data={data!} loaderData={inviteBlockLoaderData} />
      </SettingsBlock>
      <SettingsBlock>
        <ReferralRewardsBlock
          data={rewards!}
          loaderData={{
            totalReferralsL1: getRandomInteger(1, 50),
            totalReferralsL2: getRandomInteger(1, 50),
            totalAmount: getRandomInteger(1, 50)
          }}
          currency={"GVT"}
        />
      </SettingsBlock>
      <div className="referral-program__tables">
        <DetailsBlock table>
          <ReferralFriendsTable />
        </DetailsBlock>
        <DetailsBlock table>
          <ReferralHistoryTable />
        </DetailsBlock>
      </div>
    </ProfileLayout>
  );
};

const ReferralProgramPage = React.memo(_ReferralProgramPage);
export default ReferralProgramPage;
