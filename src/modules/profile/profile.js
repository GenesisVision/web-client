import "./profile.scss";

import classnames from "classnames";
import Chip from "components/chip/chip";
import { GVButton, GVTextField } from "gv-react-components";
import UploadButton from "modules/upload-button/upload-file";
import moment from "moment";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { translate } from "react-i18next";

const ProfileField = ({ name, value, label, disabled }) => {
  return value || !disabled ? (
    <GVTextField name={name} value={value} label={label} disabled={disabled} />
  ) : null;
};

class Profile extends Component {
  state = {
    disabled: false
  };
  fileInput = React.createRef();
  render() {
    const { t, info } = this.props;
    return (
      <div className="profile__container">
        <table
          className={classnames("profile", {
            "profile--is-disabled": this.state.disabled
          })}
        >
          <tr className="profile__title">
            <td className="profile__left">
              <h4>01</h4>
            </td>
            <td className="profile__center" />
            <td className="profile__right">
              <h4>{t("profile.contacts")}</h4>
              {info.phoneNumberConfirmed || (
                <Chip type="negative">{t("profile.not-verified")}</Chip>
              )}
            </td>
          </tr>
          <tr className="profile__content">
            <td className="profile__left">
              <span className="profile__stick" />
            </td>
            <td className="profile__center" />
            <td className="profile__right">
              <ProfileField
                label={t("profile.phone-number")}
                value={info.phone}
                name="phone"
                disabled={this.state.disabled}
              />
              <ProfileField
                label={t("profile.email")}
                value={info.email}
                name="phone"
                disabled
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
              {info.documentsConfirmed || (
                <Chip type="negative">{t("profile.not-verified")}</Chip>
              )}
            </td>
          </tr>
          <tr className="profile__content">
            <td className="profile__left">
              <span className="profile__stick" />
            </td>
            <td className="profile__center" />
            <td className="profile__right">
              {!info.firstName &&
                !info.lastName &&
                !info.birthday &&
                !info.country &&
                this.state.disabled && <p>No info</p>}
              <div>
                <ProfileField
                  value={info.firstName}
                  label={t("profile.forename")}
                  name="firstName"
                  disabled={this.state.disabled}
                />
                <ProfileField
                  value={info.lastName}
                  label={t("profile.family-name")}
                  name="lastName"
                  disabled={this.state.disabled}
                />
              </div>
              <div>
                <ProfileField
                  value={
                    info.birthday && moment(info.birthday).format("dd-mm-YYYY")
                  }
                  label={t("profile.birthday")}
                  name="birthday"
                  disabled={this.state.disabled}
                />
                <ProfileField
                  value={info.country}
                  label={t("profile.citizen")}
                  name="country"
                  disabled={this.state.disabled}
                />
              </div>
              <div>
                <UploadButton />
              </div>
            </td>
          </tr>
          <tr className="profile__title">
            <td className="profile__left">
              <h4>03</h4>
            </td>
            <td className="profile__center" />
            <td className="profile__right">
              <h4>{t("profile.residential-address")}</h4>
            </td>
          </tr>
          <tr className="profile__content">
            <td className="profile__left">
              <span className="profile__stick" />
            </td>
            <td className="profile__center" />
            <td className="profile__right">
              {!info.country &&
                !info.city &&
                !info.address &&
                !info.index &&
                this.state.disabled && <p>No info</p>}
              <div className="profile__row">
                <ProfileField
                  value={info.country}
                  label={t("profile.country")}
                  name="country"
                  disabled={this.state.disabled}
                />
                <ProfileField
                  value={info.city}
                  label={t("profile.city")}
                  name="city"
                  disabled={this.state.disabled}
                />
              </div>
              <div className="profile__row">
                <ProfileField
                  value={info.address}
                  label={t("profile.address")}
                  name="address"
                  disabled={this.state.disabled}
                />
              </div>
              <div className="profile__row">
                <ProfileField
                  value={info.index || ""}
                  label={t("profile.index")}
                  name="index"
                  disabled={this.state.disabled}
                />
              </div>
            </td>
          </tr>
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
    documentsConfirmed: PropTypes.bool
  })
};

export default translate()(Profile);
