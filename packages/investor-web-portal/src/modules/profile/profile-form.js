import "./profile.scss";

import Dialog from "shared/components/dialog/dialog";
import FileLabel from "shared/components/file-label/file-label";
import GVDatePicker from "shared/components/gv-datepicker/gv-datepicker";
import VerificationStatus from "shared/components/verification-status/verification-status";
import { withFormik } from "formik";
import { GVButton, GVFormikField, GVTextField } from "gv-react-components";
import PhoneVerification from "modules/phone-verification/phone-verification";
import UploadButton from "modules/upload-button/upload-button";
import moment from "moment";
import PropTypes from "prop-types";
import React, { Component, Fragment } from "react";
import { translate } from "react-i18next";

class Profile extends Component {
  state = {
    file: null,
    isOpenVerify: false
  };
  handleCloseVerify = () => {
    this.setState({ isOpenVerify: false });
  };
  handleOpenVerify = () => {
    this.setState({ isOpenVerify: true });
  };
  handleLoad = file => {
    this.setState({ file }, () =>
      this.props.setFieldValue("documentId", file.id)
    );
  };
  handleDelete = () => {
    this.setState({ file: null }, () => {
      this.props.setFieldValue("documentId", "");
    });
  };
  handleVerify = () => {
    this.props.onVerify();
    this.handleCloseVerify();
  };
  render() {
    const { t, info, handleSubmit } = this.props;
    return (
      <Fragment>
        {info.phone && (
          <Dialog
            open={this.state.isOpenVerify}
            onClose={this.handleCloseVerify}
          >
            <PhoneVerification
              phoneNumber={info.phone}
              onVerify={this.handleVerify}
            />
          </Dialog>
        )}
        <form
          id="profile-form"
          className="profile__container"
          onSubmit={handleSubmit}
        >
          <table className={"profile"}>
            <tbody>
              <tr className="profile__title">
                <td className="profile__left">
                  <h4>01</h4>
                </td>
                <td className="profile__center" />
                <td className="profile__right">
                  <h4>{t("profile.contacts")}</h4>
                  <VerificationStatus checked={info.phoneNumberConfirmed} />
                </td>
              </tr>
              <tr className="profile__content">
                <td className="profile__left">
                  <span className="profile__stick" />
                </td>
                <td className="profile__center" />
                <td className="profile__right">
                  <div className="profile__row">
                    <div className="profile__phone">
                      <GVFormikField
                        label={t("profile.phone-number")}
                        name="phoneNumber"
                        component={GVTextField}
                      />
                      {info.phoneNumberConfirmed ||
                        (info.phone && (
                          <GVButton
                            variant="text"
                            onClick={this.handleOpenVerify}
                          >
                            {t("buttons.verify")}
                          </GVButton>
                        ))}
                    </div>
                    <GVFormikField
                      label={t("profile.email")}
                      value={info.email}
                      component={GVTextField}
                      name="email"
                    />
                  </div>
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
              <tr className="profile__content">
                <td className="profile__left">
                  <span className="profile__stick" />
                </td>
                <td className="profile__center" />
                <td className="profile__right">
                  <div>
                    <GVFormikField
                      label={t("profile.forename")}
                      name="firstName"
                      component={GVTextField}
                    />
                    <GVFormikField
                      label={t("profile.family-name")}
                      name="lastName"
                      component={GVTextField}
                    />
                  </div>
                  <div>
                    <GVFormikField
                      label={t("profile.birthday")}
                      name="birthday"
                      component={GVTextField}
                      InputComponent={GVDatePicker}
                      maxDate={new Date()}
                    />
                    <GVFormikField
                      label={t("profile.citizen")}
                      name="citizenship"
                      component={GVTextField}
                    />
                  </div>
                  {this.state.file && (
                    <FileLabel
                      className="profile__file"
                      file={this.state.file}
                      onClick={this.handleDelete}
                    />
                  )}
                  <div>
                    <GVFormikField
                      name="documentId"
                      component={props => (
                        <input
                          type="hidden"
                          name={props.name}
                          value={props.value}
                        />
                      )}
                    />
                    <UploadButton onLoad={this.handleLoad} />
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
                <td className="profile__left" />
                <td className="profile__center" />
                <td className="profile__right">
                  <div className="profile__row">
                    <GVFormikField
                      label={t("profile.country")}
                      name="country"
                      component={GVTextField}
                    />
                    <GVFormikField
                      label={t("profile.city")}
                      name="city"
                      component={GVTextField}
                    />
                  </div>
                  <div className="profile__row">
                    <GVFormikField
                      label={t("profile.address")}
                      name="address"
                      component={GVTextField}
                    />
                  </div>
                  <div className="profile__row">
                    <GVFormikField
                      label={t("profile.index")}
                      name="index"
                      component={GVTextField}
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td />
                <td />
                <td>
                  <span className="profile__edit-link">
                    <GVButton type="submit">
                      {this.props.t("buttons.save")}
                    </GVButton>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </Fragment>
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

const ProfileForm = withFormik({
  displayName: "profile-form",
  mapPropsToValues: ({ info }) => ({
    firstName: info.firstName || undefined,
    middleName: info.middleName || undefined,
    lastName: info.lastName || undefined,
    birthday: info.birthday ? moment(info.birthday).format() : undefined,
    citizenship: info.citizenship || undefined,
    gender: info.gender || undefined,
    documentId: "",
    phoneNumber: info.phone || undefined,
    country: info.country || undefined,
    city: info.city || undefined,
    address: info.address || undefined,
    index: info.index || undefined
  }),
  handleSubmit: (values, { props }) => {
    props.onSubmit(values);
  }
})(Profile);

export default translate()(ProfileForm);
