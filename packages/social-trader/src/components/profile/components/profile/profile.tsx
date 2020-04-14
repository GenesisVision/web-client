import GVButton from "components/gv-button";
import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import { KYC_ROUTE } from "components/profile/profile.constants";
import ProfileImageContainer from "components/profile/settings/profile-image/profile-image-container";
import SettingsBlock from "components/settings-block/settings-block";
import StatisticItem from "components/statistic-item/statistic-item";
import withLoader from "decorators/with-loader";
import { ProfileFullViewModel } from "gv-api-web";
import PublicInfo from "modules/public-info/public-info";
import * as React from "react";
import { useTranslation } from "react-i18next";

import "./profile.scss";

const _Profile: React.FC<IProfileOwnProps> = ({
  info,
  onUpdate,
  isPending
}) => {
  const { linkCreator } = useToLink();
  const [t] = useTranslation();
  return (
    <>
      <SettingsBlock label={t("profile-page.public-info")}>
        <PublicInfo
          isPending={isPending}
          about={info.about}
          userName={info.userName}
          onUpdate={onUpdate}
        />
      </SettingsBlock>
      <SettingsBlock label={t("profile-page.settings.profile-image")}>
        <ProfileImageContainer />
      </SettingsBlock>
      <SettingsBlock label={t("profile-page.contacts")} checked={true}>
        <StatisticItem label={t("profile-page.email")}>
          {info.email}
        </StatisticItem>
      </SettingsBlock>
      <SettingsBlock
        label={t("profile-page.personal-info")}
        verificationStatus={info.verificationStatus}
      >
        {info.verificationStatus === "NotVerified" && (
          <Link
            className="level-calculator-popup__btn-verify"
            to={linkCreator(KYC_ROUTE)}
          >
            <GVButton color="primary" variant="outlined">
              {t("buttons.verify")}
            </GVButton>
          </Link>
        )}
      </SettingsBlock>
    </>
  );
};

export interface IProfileOwnProps {
  isPending: boolean;
  onUpdate: () => void;
  info: ProfileFullViewModel;
}

const Profile = withLoader(React.memo(_Profile));
export default Profile;
