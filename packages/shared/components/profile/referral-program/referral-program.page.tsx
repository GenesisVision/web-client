import "./referral-program.scss";

import * as faker from "faker";
import { ProfileFullViewModel } from "gv-api-web";
import * as React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import DetailsBlock from "shared/components/details/details-block";
import ProfileLayout from "shared/components/profile/profile-layout";
import { REFERRAL_PROGRAM } from "shared/components/profile/profile.constants";
import SettingsBlock from "shared/components/settings-block/settings-block";
import { ITableState } from "shared/components/table/reducers/table.reducer";
import useApiRequest from "shared/hooks/api-request.hook";
import {
  referralHistorySelector,
  TReferralHistory
} from "shared/reducers/profile-reducer";
import { RootState } from "shared/reducers/root-reducer";
import { getRandomInteger } from "shared/utils/helpers";

import { InviteBlock } from "./invite-block";
import { ReferralFriendsTable } from "./referral-friends-table";
import { ReferralHistoryTable } from "./referral-history-table";
import { IRewards, ReferralRewardsBlock } from "./referral-reward-block";
import { getProfile } from "./services/referral-program-services";

const _ReferralProgramPage: React.FC = () => {
  const { sendRequest, data } = useApiRequest<ProfileFullViewModel>({
    request: getProfile
  });
  useEffect(() => {
    sendRequest();
  }, []);
  const rewards = useSelector(rewardsSelector);
  console.log(rewards);
  return (
    <ProfileLayout route={REFERRAL_PROGRAM}>
      <div className="asset-settings referral-program referral-program__blocks profile__container--padding-top">
        <SettingsBlock>
          <InviteBlock
            data={data ? data.refUrl : undefined}
            loaderData={faker.internet.url()}
          />
        </SettingsBlock>
        <ReferralRewardsBlock
          data={rewards!}
          loaderData={{
            firstLevel: getRandomInteger(1, 50),
            secondLevel: getRandomInteger(1, 50),
            amountTotal: getRandomInteger(1, 50)
          }}
          currency={"GVT"}
        />
      </div>
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

const rewardsSelector = createSelector<
  RootState,
  ITableState<TReferralHistory>,
  IRewards | undefined
>(
  referralHistorySelector,
  (data: ITableState<TReferralHistory>) => {
    if (!data.itemsData.data) return undefined;
    const { amountTotal, items } = data.itemsData.data;
    const firstLevel = items.filter(item => item.amount === 1).length;
    const secondLevel = items.filter(item => item.amount === 2).length;
    return {
      firstLevel,
      secondLevel,
      amountTotal
    };
  }
);
const ReferralProgramPage = React.memo(_ReferralProgramPage);
export default ReferralProgramPage;
