import "./profile.scss";

import { withFormik } from "formik";
import { GVFormikField, GVTextField } from "gv-react-components";
import moment from "moment";
import PropTypes from "prop-types";
import React, { Component, Fragment } from "react";
import Scrollbars from "react-custom-scrollbars";
import { translate } from "react-i18next";
import VerificationStatus from "shared/components/verification-status/verification-status";
import About from "shared/modules/about/about";

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
        <About about={info.about} userName={info.userName} />
        <form
          id="profile-form"
          className="profile__container"
          onSubmit={handleSubmit}
        >
          <Scrollbars autoHeight autoHeightMax={14000}>
            <table className={"profile"}>
              <tbody>
                <tr className="profile__title">
                  <td className="profile__left">
                    <h4 className="profile__subtitle">01</h4>
                  </td>
                  <td className="profile__center" />
                  <td className="profile__right">
                    <h4 className="profile__subtitle">
                      {t("profile.contacts")}
                    </h4>
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
                      <GVFormikField
                        disabled
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
                    <h4 className="profile__subtitle">02</h4>
                  </td>
                  <td className="profile__center" />
                  <td className="profile__right">
                    <h4 className="profile__subtitle">
                      {t("profile.personal-info")}
                    </h4>
                    <VerificationStatus
                      verificationStatus={info.verificationStatus}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </Scrollbars>
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
