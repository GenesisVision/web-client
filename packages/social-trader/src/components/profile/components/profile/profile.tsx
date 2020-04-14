import { useToLink } from "components/link/link.helper";
import ProfileImageContainer from "components/profile/settings/profile-image/profile-image-container";
import SettingsBlock from "components/settings-block/settings-block";
import withLoader from "decorators/with-loader";
import { ProfileFullViewModel } from "gv-api-web";
import PublicInfo from "modules/public-info/public-info";
import * as React from "react";
import { useTranslation } from "react-i18next";

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
