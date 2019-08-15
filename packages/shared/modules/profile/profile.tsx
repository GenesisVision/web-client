import "./profile.scss";

import { ProfileFullViewModel } from "gv-api-web";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import ProfileImageContainer from "shared/components/profile/settings/profile-image/profile-image-container";
import VerificationStatus from "shared/components/verification-status/verification-status";
import { ROLE } from "shared/constants/constants";
import withLoader, { WithLoaderProps } from "shared/decorators/with-loader";
import withRole, { WithRoleProps } from "shared/decorators/with-role";

import About from "../about/about";
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
              <tr className="profile__title">
                <td className="profile__left">
                  <h4 className="profile__subtitle">01</h4>
                </td>
                <td className="profile__center" />
                <td className="profile__right">
                  <h4 className="profile__subtitle">
                    {t("profile-page.public-info")}
                  </h4>
                </td>
              </tr>
              <About about={info.about} userName={info.userName} />
              <tr className="profile__title">
                <td className="profile__left">
                  <h4 className="profile__subtitle">02</h4>
                </td>
                <td className="profile__center" />
                <td className="profile__right">
                  <h4 className="profile__subtitle">{t("profile-page.id")}</h4>
                </td>
              </tr>
              <tr className="profile__content">
                <td className="profile__left">
                  <span className="profile__stick" />
                </td>
                <td className="profile__center" />
                <td className="profile__right">
                  <ProfileField
                    label={t("profile-page.id")}
                    value={info.id}
                    name="id"
                  />
                </td>
              </tr>
            </>
          )}
          <tr className="profile__title">
            <td className="profile__left">
              <h4 className="profile__subtitle">0{initCount + 1}</h4>
            </td>
            <td className="profile__center" />
            <td className="profile__right">
              <h4 className="profile__subtitle">
                {t("profile-page.settings.profile-image")}
              </h4>
            </td>
          </tr>
          <tr className="profile__content">
            <td className="profile__left">
              <span className="profile__stick" />
            </td>
            <td className="profile__center" />
            <td className="profile__right">
              <ProfileImageContainer />
            </td>
          </tr>
          <tr className="profile__title">
            <td className="profile__left">
              <h4 className="profile__subtitle">0{initCount + 2}</h4>
            </td>
            <td className="profile__center" />
            <td className="profile__right">
              <h4 className="profile__subtitle">
                {t("profile-page.contacts")}
              </h4>
              <VerificationStatus checked={true} />
            </td>
          </tr>
          <tr className="profile__content">
            <td className="profile__left">
              <span className="profile__stick" />
            </td>
            <td className="profile__center" />
            <td className="profile__right">
              <ProfileField
                label={t("profile-page.email")}
                value={info.email}
                name="phone"
              />
            </td>
          </tr>
          <tr className="profile__title">
            <td className="profile__left">
              <h4 className="profile__subtitle">0{initCount + 3}</h4>
            </td>
            <td className="profile__center" />
            <td className="profile__right">
              <h4 className="profile__subtitle">
                {t("profile-page.personal-info")}
              </h4>
              <VerificationStatus
                verificationStatus={info.verificationStatus}
              />
            </td>
          </tr>
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
