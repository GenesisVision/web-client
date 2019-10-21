import "./referral-program.scss";

import { SocialLinkViewModelTypeEnum } from "gv-api-web";
import * as React from "react";
import { useTranslation } from "react-i18next";
import DetailsBlock from "shared/components/details/details-block";
import GVButton from "shared/components/gv-button";
import CopyIcon from "shared/components/icon/copy-icon";
import ProfileLayout from "shared/components/profile/profile-layout";
import { REFERRAL_PROGRAM } from "shared/components/profile/profile.constants";
import SocialLinksBlock from "shared/components/social-links-block/social-links-block";
import Copy from "shared/decorators/with-copy";
import { CurrencyEnum } from "shared/utils/types";

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
  return (
    <ProfileLayout route={REFERRAL_PROGRAM}>
      <div className="referral-program profile__container--padding-top">
        <div className="referral-program__blocks">
          <InviteBlock link={"http://dddd.r"} />
          <ReferralRewardsBlock
            currency={"GVT"}
            referralFriends={3}
            totalRewards={15}
          />
        </div>
      </div>
    </ProfileLayout>
  );
};

const InviteBlock: React.FC<{ link: string }> = React.memo(({ link }) => {
  const [t] = useTranslation();
  return (
    <DetailsBlock horizontalPaddings>
      <h4>{t("profile-page.referral-program.title")}</h4>
      <div className="referral-program__link-block">
        {t("profile-page.referral-program.referral-link")}
        <div className="referral-program__link">{link}</div>
        <Copy>
          {({ copy }) => (
            <GVButton
              color="secondary"
              onClick={() => copy(link)}
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
    </DetailsBlock>
  );
});

const ReferralRewardsBlock: React.FC<{
  currency: CurrencyEnum;
  referralFriends: number;
  totalRewards: number;
}> = React.memo(({ referralFriends, totalRewards, currency }) => {
  const [t] = useTranslation();
  return (
    <DetailsBlock horizontalPaddings>
      <table className="referral-program__rewards-table">
        <thead>
          <tr>
            <th>{t("profile-page.referral-program.referral-friends")}</th>
            <th>{t("profile-page.referral-program.total-rewards")}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{referralFriends}</td>
            <td>
              {totalRewards} {currency}
            </td>
          </tr>
        </tbody>
      </table>
    </DetailsBlock>
  );
});

const ReferralProgramPage = React.memo(_ReferralProgramPage);
export default ReferralProgramPage;
