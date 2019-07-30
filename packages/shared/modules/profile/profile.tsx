import "./profile.scss";

import { ProfileFullViewModel } from "gv-api-web";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import VerificationStatus from "shared/components/verification-status/verification-status";
import { ROLE } from "shared/constants/constants";
import withRole, { WithRoleProps } from "shared/decorators/with-role";

import ProfilePersonal, { ProfileField } from "./profile-personal";

const _Profile: React.FC<Props> = ({ t, info, role }) => (
  <div className="profile__container profile__container--padding-top">
    <table className="profile profile--is-disabled">
      <tbody>
        {role === ROLE.MANAGER && <ProfilePersonal info={info} />}
        <tr className="profile__title">
          <td className="profile__left">
            <h4 className="profile__subtitle">01</h4>
          </td>
          <td className="profile__center" />
          <td className="profile__right">
            <h4 className="profile__subtitle">{t("profile-page.contacts")}</h4>
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
            <h4 className="profile__subtitle">02</h4>
          </td>
          <td className="profile__center" />
          <td className="profile__right">
            <h4 className="profile__subtitle">
              {t("profile-page.personal-info")}
            </h4>
            <VerificationStatus verificationStatus={info.verificationStatus} />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);

interface Props extends WithTranslation, WithRoleProps, OwnProps {}

export interface OwnProps {
  info: ProfileFullViewModel;
}

const Profile = compose<React.ComponentType<OwnProps>>(
  withRole,
  translate(),
  React.memo
)(_Profile);
export default Profile;
