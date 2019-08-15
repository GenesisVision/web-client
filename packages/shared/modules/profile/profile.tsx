import "./profile.scss";

import { ProfileFullViewModel } from "gv-api-web";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import ProfileImageContainer from "shared/components/profile/settings/profile-image/profile-image-container";
import { ROLE } from "shared/constants/constants";
import withLoader, { WithLoaderProps } from "shared/decorators/with-loader";
import withRole, { WithRoleProps } from "shared/decorators/with-role";

import About from "../about/about";
import ProfileBlock from "./profile-block";
import { ProfileField } from "./profile-personal";

const _Profile: React.FC<Props> = ({ t, info, role }) => {
  const isManager = role === ROLE.MANAGER;
  const initCount = isManager ? 2 : 0;
  return (
    <div className="profile__container profile__container--padding-top">
      <table className="profile">
        <tbody>
          {isManager && (
            <>
              <ProfileBlock
                number={"01"}
                title={t("profile-page.public-info")}
                content={<About about={info.about} userName={info.userName} />}
              />
              <ProfileBlock
                number={"02"}
                title={t("profile-page.public-info")}
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
          <ProfileBlock
            number={`0${initCount + 1}`}
            title={t("profile-page.settings.profile-image")}
            content={<ProfileImageContainer />}
          />
          <ProfileBlock
            number={`0${initCount + 2}`}
            title={t("profile-page.contacts")}
            content={
              <ProfileField
                label={t("profile-page.email")}
                value={info.email}
                name="phone"
              />
            }
            checked={true}
          />
          <ProfileBlock
            number={`0${initCount + 3}`}
            title={t("profile-page.contacts")}
            verificationStatus={info.verificationStatus}
          />
        </tbody>
      </table>
    </div>
  );
};

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
