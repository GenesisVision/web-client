import "./profile.scss";

import Chip from "components/chip/chip";
import { GVTextField } from "gv-react-components";
import moment from "moment";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { translate } from "react-i18next";

class Profile extends Component {
  render() {
    const { t, info } = this.props;
    return (
      <div className="profile">
        <div className="profile__section">
          <div className="profile__title">
            <div className="profile__left">
              <h4>01</h4>
            </div>
            <div className="profile__center" />
            <div className="profile__right">
              <h4>{t("profile.contacts")}</h4>
              <Chip type="negative">{t("profile.not-verified")}</Chip>
            </div>
          </div>
          <div className="profile__content">
            <div className="profile__left">
              <span className="profile__stick" />
            </div>
            <div className="profile__center" />
            <div className="profile__right">
              <GVTextField
                value={info.phone}
                label={t("profile.phone-number")}
                disabled
              />
              <GVTextField
                value={info.email}
                label={t("profile.email")}
                disabled
              />
            </div>
          </div>
        </div>
        <div className="profile__section">
          <div className="profile__title">
            <div className="profile__left">
              <h4>02</h4>
            </div>
            <div className="profile__center" />
            <div className="profile__right">
              <h4>{t("profile.personal-info")}</h4>
              <Chip type="negative">{t("profile.not-verified")}</Chip>
            </div>
          </div>
          <div className="profile__content">
            <div className="profile__left">
              <span className="profile__stick" />
            </div>
            <div className="profile__center" />
            <div className="profile__right">
              <div>
                <GVTextField
                  value={info.firstName}
                  label={t("profile.forename")}
                  disabled
                />
                <GVTextField
                  value={info.lastName}
                  label={t("profile.family-name")}
                  disabled
                />
              </div>
              <div>
                <GVTextField
                  value={moment(info.birthday).format("dd-mm-YYYY")}
                  label={t("profile.birthday")}
                  disabled
                />
                <GVTextField
                  value={info.country}
                  label={t("profile.citizen")}
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
        <div className="profile__section">
          <div className="profile__title">
            <div className="profile__left">
              <h4>03</h4>
            </div>
            <div className="profile__center" />
            <div className="profile__right">
              <h4>{t("profile.residential-address")}</h4>
              <Chip type="negative">{t("profile.not-verified")}</Chip>
            </div>
          </div>
          <div className="profile__content">
            <div className="profile__left">
              <span className="profile__stick" />
            </div>
            <div className="profile__center" />
            <div className="profile__right">
              <div className="profile__row">
                <GVTextField
                  value={info.country}
                  label={t("profile.country")}
                  disabled
                />
                <GVTextField
                  value={info.city}
                  label={t("profile.city")}
                  disabled
                />
              </div>
              <div className="profile__row">
                <GVTextField
                  value={info.address}
                  label={t("profile.address")}
                  disabled
                />
              </div>
              <div className="profile__row">
                <GVTextField
                  value={info.index || ""}
                  label={t("profile.index")}
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
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
