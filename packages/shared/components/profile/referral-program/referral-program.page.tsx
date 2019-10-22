import "./referral-program.scss";

import * as faker from "faker";
import { ProfileFullViewModel, SocialLinkViewModelTypeEnum } from "gv-api-web";
import * as React from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import DetailsBlock from "shared/components/details/details-block";
import GVButton from "shared/components/gv-button";
import CopyIcon from "shared/components/icon/copy-icon";
import ProfileLayout from "shared/components/profile/profile-layout";
import { REFERRAL_PROGRAM } from "shared/components/profile/profile.constants";
import SettingsBlock from "shared/components/settings-block/settings-block";
import SocialLinksBlock from "shared/components/social-links-block/social-links-block";
import { withBlurLoader } from "shared/decorators/with-blur-loader";
import Copy from "shared/decorators/with-copy";
import useApiRequest from "shared/hooks/api-request.hook";
import { CurrencyEnum } from "shared/utils/types";

import { ReferralFriendsTable } from "./referral-friends-table";
import { ReferralHistoryTable } from "./referral-history-table";
import { getProfile } from "./services/referral-program-services";

const SocialLinksMock = {
  url: "",
  logo: "",
  name: "",
  value: "",
  type: "Undefined" as SocialLinkViewModelTypeEnum
};
const SocialLinksMocks = Array(5)
  .fill("")
  .map(() => SocialLinksMock);

const _ReferralProgramPage: React.FC = () => {
  const { sendRequest, data } = useApiRequest<ProfileFullViewModel>({
    request: getProfile
  });
  useEffect(() => {
    sendRequest();
  }, []);
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
          currency={"GVT"}
          referralFriends1lvl={3}
          referralFriends2lvl={17}
          totalRewards={15}
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

const _InviteBlock: React.FC<{ data?: string }> = ({ data = "" }) => {
  const [t] = useTranslation();
  return (
    <div>
      <div className="referral-program__title">
        <h4>{t("profile-page.referral-program.title")}</h4>
      </div>
      <div className="referral-program__link-block">
        {t("profile-page.referral-program.referral-link")}
        <div className="referral-program__link">{data}</div>
        <Copy>
          {({ copy }) => (
            <GVButton
              color="secondary"
              onClick={() => copy(data)}
              variant="text"
            >
              <>
                <CopyIcon primary />
                &nbsp;
                {t("buttons.copy")}
              </>
            </GVButton>
          )}
        </Copy>
      </div>
      <div className="referral-program__share-block">
        {t("profile-page.referral-program.share-your-passion")}
        <SocialLinksBlock socialLinks={SocialLinksMocks} />
      </div>
    </div>
  );
};
const InviteBlock = withBlurLoader(React.memo(_InviteBlock));

const ReferralRewardsBlock: React.FC<{
  currency: CurrencyEnum;
  referralFriends1lvl: number;
  referralFriends2lvl: number;
  totalRewards: number;
}> = React.memo(
  ({ referralFriends1lvl, referralFriends2lvl, totalRewards, currency }) => {
    const [t] = useTranslation();
    return (
      <SettingsBlock>
        <table className="referral-program__rewards-table">
          <thead>
            <tr>
              <th>
                {t("profile-page.referral-program.referral-friends-1lvl")}
              </th>
              <th>
                {t("profile-page.referral-program.referral-friends-2lvl")}
              </th>
              <th>{t("profile-page.referral-program.total-rewards")}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{referralFriends1lvl}</td>
              <td>{referralFriends2lvl}</td>
              <td>
                {totalRewards} {currency}
              </td>
            </tr>
          </tbody>
        </table>
      </SettingsBlock>
    );
  }
);

const ReferralProgramPage = React.memo(_ReferralProgramPage);
export default ReferralProgramPage;
