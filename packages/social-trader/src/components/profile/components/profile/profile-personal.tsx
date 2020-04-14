import GVTextField from "components/gv-text-field";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";

export const ProfileField: React.FC<IProfileFieldProps> = React.memo(
  ({ name, value, label, disabled = true, type }) => (
    <GVTextField
      type={type}
      name={name}
      value={value}
      label={label}
      disabled={disabled}
    />
  )
);

const _ProfilePersonal: React.FC<IProfilePersonalProps> = ({
  t,
  userName,
  about
}) => (
  <tr className="profile__content">
    <td className="profile__left">
      <span className="profile__stick" />
    </td>
    <td className="profile__center" />
    <td className="profile__right">
      <div className="profile__row">
        {userName && (
          <ProfileField
            label={t("profile-page.login")}
            value={userName}
            name="userName"
          />
        )}
      </div>
      <div className="profile__row">
        {about && (
          <ProfileField
            disabled
            type="textarea"
            name="about"
            value={about}
            label={t("profile-page.about")}
          />
        )}
      </div>
    </td>
  </tr>
);

interface IProfileFieldProps {
  name: string;
  value: string | number;
  label: string;
  disabled?: boolean;
  type?: string;
}

interface IProfilePersonalProps extends WithTranslation {
  userName: string;
  about: string;
}

const ProfilePersonal = translate()(React.memo(_ProfilePersonal));
export default ProfilePersonal;
