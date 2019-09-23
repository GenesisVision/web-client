import "./referral-program.scss";

import * as React from "react";
import { useTranslation } from "react-i18next";
import ProfileLayout from "shared/components/profile/profile-layout";
import { SETTINGS } from "shared/components/profile/profile.constants";
import DetailsBlock from "shared/components/details/details-block";
import CopyIcon from "shared/components/icon/copy-icon";
import GVButton from "shared/components/gv-button";
import Copy from "shared/decorators/with-copy";
import SocialLinksBlock from "shared/components/social-links-block/social-links-block";
import { CurrencyEnum } from "shared/utils/types";

const _ReferralProgramPage: React.FC = () => {
  return (
    <ProfileLayout route={SETTINGS}>
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
        <SocialLinksBlock socialLinks={[]} />
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
