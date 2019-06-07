import { ProfileFullViewModel } from "gv-api-web";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { Link } from "react-router-dom";
import GVButton from "shared/components/gv-button";
import GVTextField from "shared/components/gv-text-field";
import { PROFILE_EDIT_ROUTE } from "shared/components/profile/profile.constants";

export const ProfileField: React.FC<IProfileFieldProps> = React.memo(
  ({ name, value, label, disabled = true, type }) => (
    // @ts-ignore
    <GVTextField // TODO correct type when gv-components will move
      type={type}
      name={name}
      value={value}
      label={label}
      disabled={disabled}
    />
  )
);

interface IProfileFieldProps {
  name: string;
  value: string | number;
  label: string;
  disabled?: boolean;
  type?: string;
}

const _ProfilePersonal: React.FC<IProfilePersonalProps> = ({ t, info }) => (
  <>
    <tr className="profile__content">
      <td className="profile__left" />
      <td className="profile__center" />
      <td className="profile__right">
        <div className="profile__row">
          {info.id && (
            <ProfileField
              label={t("profile-page.id")}
              value={info.id}
              name="id"
            />
          )}
        </div>
        <div className="profile__row">
          {info.userName && (
            <ProfileField
              label={t("profile-page.login")}
              value={info.userName}
              name="userName"
            />
          )}
        </div>
        <div className="profile__row">
          {info.about && (
            <ProfileField
              disabled
              type="textarea"
              name="about"
              value={info.about}
              label={t("profile-page.about")}
            />
          )}
        </div>
      </td>
    </tr>
    <tr>
      <td />
      <td />
      <td>
        <Link to={PROFILE_EDIT_ROUTE} className="profile__edit-link">
          <GVButton>{t("buttons.edit")}</GVButton>
        </Link>
      </td>
    </tr>
  </>
);

interface IProfilePersonalProps extends InjectedTranslateProps {
  info: ProfileFullViewModel;
}

const ProfilePersonal = translate()(React.memo(_ProfilePersonal));
export default ProfilePersonal;
