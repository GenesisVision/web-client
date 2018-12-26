import { withFormik } from "formik";
import { GVButton, GVFormikField, GVTextField } from "gv-react-components";
import PropTypes from "prop-types";
import React from "react";
import Scrollbars from "react-custom-scrollbars";
import { translate } from "react-i18next";
import { compose } from "redux";

import styles from "./About.module.scss";

const AboutForm = ({
  t,
  handleSubmit,
  disabled,
  errorMessage,
  isValid,
  dirty
}) => {
  return (
    <form id="about-manager" onSubmit={handleSubmit} className={styles.about}>
      <Scrollbars autoHeight autoHeightMax={14000}>
        <table className={"profile"}>
          <tbody>
            <tr className="profile__content">
              <td className="profile__left" />
              <td className="profile__center" />
              <td className="profile__right">
                <div className="profile__row">
                  <GVFormikField
                    label={t("profile-page.login")}
                    component={GVTextField}
                    name="userName"
                    autoFocus
                  />
                </div>
                <div className="profile__row">
                  <GVFormikField
                    label={t("profile-page.about")}
                    component={GVTextField}
                    type="textarea"
                    name="about"
                  />
                </div>
                <div className="form-error">{errorMessage}</div>
              </td>
            </tr>
            <tr className="profile__content">
              <td />
              <td />
              <td className="profile__right">
                <div className="profile__row">
                  <GVButton
                    type="submit"
                    disabled={disabled || !isValid || !dirty}
                  >
                    {t("buttons.save")}
                  </GVButton>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </Scrollbars>
    </form>
  );
};

AboutForm.propTypes = {
  userName: PropTypes.string,
  about: PropTypes.string,
  onSubmit: PropTypes.func,
  errorMessage: PropTypes.string,
  disabled: PropTypes.bool
};

export default compose(
  translate(),
  withFormik({
    displayName: "about-manager",
    mapPropsToValues: props => ({
      userName: props.userName || "",
      about: props.about || ""
    }),
    handleSubmit: (values, { props }) => {
      props.onSubmit(values);
    }
  })
)(AboutForm);
