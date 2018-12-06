import "./profile.scss";

import PropTypes from "prop-types";
import React, { Component } from "react";
import Scrollbars from "react-custom-scrollbars";
import { translate } from "react-i18next";
import VerificationStatus from "shared/components/verification-status/verification-status";

import ProfilePersonal, { ProfileField } from "./profile-personal";

class Profile extends Component {
  render() {
    const { t, info, personal } = this.props;
    return (
      <div className="profile__container profile__container--padding-top">
        <Scrollbars autoHeight autoHeightMax={14000}>
          <table className="profile profile--is-disabled">
            <tbody>
              {personal && <ProfilePersonal info={info} />}
              <tr className="profile__title">
                <td className="profile__left">
                  <h4 className="profile__subtitle">01</h4>
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
                  <h4 className="profile__subtitle">02</h4>
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
