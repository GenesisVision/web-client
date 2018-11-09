import "./profile.scss";

import { GVButton, GVTextField } from "gv-react-components";
import PropTypes from "prop-types";
import React, { Component } from "react";
import Scrollbars from "react-custom-scrollbars";
import { translate } from "react-i18next";
import { Link } from "react-router-dom";

import VerificationStatus from "../../components/verification-status/verification-status";
import { PROFILE_EDIT_ROUTE } from "../../pages/profile/profile.constants";

const ProfileField = ({ name, value, label, disabled = true, type }) => {
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

class Profile extends Component {
  render() {
    const { t, info } = this.props;
    return (
      <div className="profile__container">
        <Scrollbars autoHeight autoHeightMax={14000}>
          <table className="profile profile--is-disabled">
            <tbody>
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
              <tr className="profile__title">
                <td className="profile__left">
                  <h4>01</h4>
                </td>
                <td className="profile__center" />
                <td className="profile__right">
                  <h4>{t("profile.contacts")}</h4>
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
                    label={t("profile.email")}
                    value={info.email}
                    name="phone"
                  />
                </td>
              </tr>
              <tr className="profile__title">
                <td className="profile__left">
                  <h4>02</h4>
                </td>
                <td className="profile__center" />
                <td className="profile__right">
                  <h4>{t("profile.personal-info")}</h4>
                  <VerificationStatus
                    verificationStatus={info.verificationStatus}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </Scrollbars>
      </div>
    );
  }
}

Profile.propTypes = {
  info: PropTypes.shape({
    id: PropTypes.string,
    email: PropTypes.string,
    firstName: PropTypes.string,
    middleName: PropTypes.string,
    lastName: PropTypes.string,
    documentType: PropTypes.string,
    documentNumber: PropTypes.string,
    country: PropTypes.string,
    city: PropTypes.string,
    address: PropTypes.string,
    phone: PropTypes.string,
    phoneNumberConfirmed: PropTypes.bool,
    birthday: PropTypes.instanceOf(Date),
    gender: PropTypes.bool,
    avatar: PropTypes.string,
    userName: PropTypes.string,
    documentsConfirmed: PropTypes.bool,
    citizenship: PropTypes.string,
    index: PropTypes.string
  })
};

export default translate()(Profile);
