import "shared/components/details/details.scss";
import "shared/modules/asset-settings/asset-settings.scss";

import "./profile.scss";

import { ProfileFullViewModel } from "gv-api-web";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import ProfileImageContainer from "shared/components/profile/settings/profile-image/profile-image-container";
import SettingsBlock from "shared/components/settings-block/settings-block";
import { ROLE } from "shared/constants/constants";
import withLoader, { WithLoaderProps } from "shared/decorators/with-loader";
import withRole, { WithRoleProps } from "shared/decorators/with-role";
import PublicInfo from "shared/modules/public-info/public-info";

import { ProfileField } from "./profile-personal";

const _Profile: React.FC<Props> = ({ t, info, role }) => (
  <div className="asset-settings profile__container--padding-top">
    {role === ROLE.MANAGER && (
      <>
        <SettingsBlock
          label={t("profile-page.public-info")}
          content={<PublicInfo about={info.about} userName={info.userName} />}
        />
        <SettingsBlock
          label={t("profile-page.id")}
          content={
            <ProfileField
              label={t("profile-page.id")}
              value={info.id}
              name="phone"
            />
          }
        />
      </>
    )}
    <SettingsBlock
      label={t("profile-page.settings.profile-image")}
      content={<ProfileImageContainer />}
    />
    <SettingsBlock
      label={t("profile-page.contacts")}
      checked={true}
      content={
        <ProfileField
          label={t("profile-page.email")}
          value={info.email}
          name="phone"
        />
      }
    />
    <SettingsBlock
      label={t("profile-page.personal-info")}
      verificationStatus={info.verificationStatus}
    />
  </div>
);

interface Props extends WithTranslation, IProfileOwnProps, WithRoleProps {}

export interface IProfileOwnProps {
  info: ProfileFullViewModel;
}

const Profile = compose<
  React.ComponentType<IProfileOwnProps & WithLoaderProps>
>(
  withLoader,
  withRole,
  translate(),
  React.memo
)(_Profile);
export default Profile;
