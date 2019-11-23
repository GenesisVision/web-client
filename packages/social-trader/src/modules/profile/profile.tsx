import "components/details/details.scss";
import "modules/asset-settings/asset-settings.scss";
import "./profile.scss";

import ProfileImageContainer from "components/profile/settings/profile-image/profile-image-container";
import SettingsBlock from "components/settings-block/settings-block";
import StatisticItem from "components/statistic-item/statistic-item";
import withLoader from "decorators/with-loader";
import { ProfileFullViewModel } from "gv-api-web";
import CopyButton from "modules/copy-button/copy-button";
import PublicInfo from "modules/public-info/public-info";
import * as React from "react";
import { useTranslation } from "react-i18next";

const _Profile: React.FC<IProfileOwnProps> = ({
  info,
  onUpdate,
  isPending
}) => {
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
      <SettingsBlock label={t("profile-page.id")}>
        <div className="profile__content">
          <div>{info.id}</div>
          <CopyButton
            value={info.id}
            successMessage={"profile-page.success-copy"}
          />
        </div>
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
      />
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
