import "./profile.scss";

import VerificationStatus from "components/verification-status/verification-status";
import { GVButton, GVTextField } from "gv-react-components";
import moment from "moment";
import { PROFILE_EDIT_ROUTE } from "pages/profile/profile.constants";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { translate } from "react-i18next";
import { Link } from "react-router-dom";

const ProfileField = ({ name, value, label, disabled = true }) => {
  return value || !disabled ? (
    <GVTextField name={name} value={value} label={label} disabled={disabled} />
  ) : null;
};

class Profile extends Component {
  render() {
    const { t, info } = this.props;
    return (
      <div className="profile__container">
        <table className="profile profile--is-disabled">
          <tbody>
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
