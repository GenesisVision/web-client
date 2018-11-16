import { Component, Fragment } from "react";
import { translate } from "react-i18next";
import { Link } from "react-router-dom";
import { PROFILE_EDIT_ROUTE } from "../../components/profile/profile.constants";
import { GVButton, GVTextField } from "gv-react-components";
import React from "react";

export const ProfileField = ({ name, value, label, disabled = true, type }) => {
  return value || !disabled ? (
    <GVTextField
      type={type}
      name={name}
      value={value}
      label={label}
      disabled={disabled}
    />
  ) : null;
};

class ProfilePersonal extends Component {
  render() {
    const { t, info } = this.props;
    return (
      <Fragment>
        <tr className="profile__content">
          <td className="profile__left" />
          <td className="profile__center" />
          <td className="profile__right">
            <div className="profile__row">
              <ProfileField
                className="profile__id"
                label={t("profile.id")}
                value={info.id}
                name="id"
              />
            </div>
            <div className="profile__row">
              <ProfileField
                label={t("profile.login")}
                value={info.userName}
                name="userName"
              />
            </div>
            <div className="profile__row">
              <ProfileField
                disabled
                type="textarea"
                name="about"
                value={info.about}
                label={t("profile.about")}
              />
            </div>
          </td>
        </tr>
        <tr>
          <td />
          <td />
          <td>
            <Link to={PROFILE_EDIT_ROUTE} className="profile__edit-link">
              <GVButton>{this.props.t("buttons.edit")}</GVButton>
            </Link>
          </td>
        </tr>
      </Fragment>
    );
  }
}
export default translate()(ProfilePersonal);
