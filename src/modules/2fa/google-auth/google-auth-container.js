import "./google-auth-popup.scss";

import GVqr from "components/gv-qr/gv-qr";
import { withFormik } from "formik";
import { GVButton, GVFormikField, GVTextField } from "gv-react-components";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { compose } from "redux";
import { authApiProxy } from "services/api-client/auth-api";
import authService from "services/auth-service";
import { number, object, string } from "yup";
import GooglePlay from "shared/media/badge-android.png";
import AppStore from "shared/media/badge-ios.png";
const AuthAndroidLink =
  "https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2";
const AuthIosLink =
  "https://itunes.apple.com/app/google-authenticator/id388497605";
const GoogleStep1 = ({ t }) => {
  return (
    <div className="google-auth__step">
      <div className="google-auth__count">01</div>
      <div className="google-auth__title">{t("2fa.download-app")}</div>
      <a href={AuthAndroidLink} className="google-auth__link">
        <img src={GooglePlay} alt={"link to android market"} />
      </a>
      <a href={AuthIosLink} className="google-auth__link">
        <img src={AppStore} alt={"link to app store"} />
      </a>
    </div>
  );
};

const GoogleStep2 = ({ t, authenticatorUri, sharedKey }) => {
  return (
    <div className="google-auth__step google-auth__step--2">
      <div className="google-auth__count">02</div>
      <div className="google-auth__title">{t("2fa.scan-code")}</div>
      <div className="google-auth__qr">
        <GVqr value={authenticatorUri} size={250} />
      </div>
      <p className="google-auth__alt-text">{t("2fa.alt-code")}</p>
      <h2 className="google-auth__alt-code">{sharedKey}</h2>
    </div>
  );
};

GoogleStep2.propTypes = {
  authenticatorUri: PropTypes.string.isRequired,
  sharedKey: PropTypes.string.isRequired
};

const GoogleStep3 = ({ t, handleSubmit, errorMessage, disabled }) => {
  return (
    <div className="google-auth__step">
      <div className="google-auth__count">03</div>
      <div className="google-auth__title">{t("2fa.enter-code")}</div>
      <form id="google-auth" onSubmit={handleSubmit}>
        <GVFormikField
          name="code"
          label={t("2fa.google-code")}
          component={GVTextField}
          autoComplete="off"
          InputComponent={NumberFormat}
          allowNegative={false}
          format="######"
        />
        <GVFormikField
          name="password"
          type="password"
          label={t("2fa.password")}
          component={GVTextField}
          autoComplete="off"
        />
        {errorMessage}
        <GVButton
          className="google-auth__activate"
          variant="contained"
          color="primary"
          type="submit"
          disabled={disabled}
        >
          {t("buttons.activate")}
        </GVButton>
      </form>
    </div>
  );
};

const GoogleStepForm = compose(
  translate(),
  withFormik({
    displayName: "google-auth",
    mapPropsToValues: () => ({
      code: "",
      password: ""
    }),
    validationSchema: ({ t }) =>
      object().shape({
        code: number().required(t("2fa.code-required")),
        password: string().required(t("2fa.password-required"))
      }),
    handleSubmit: (values, { props }) => {
      props.onSubmit(values);
    }
  })
)(GoogleStep3);

GoogleStepForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  errorMessage: PropTypes.string
};

class GoogleAuthContainer extends Component {
  state = {
    isPending: false,
    data: null,
    errorMessage: null
  };

  componentDidMount() {
    this.setState({ isPending: true });
    authApiProxy.v10Auth2faCreatePost(authService.getAuthArg()).then(data => {
      this.setState({ ...data });
    });
  }

  handleSubmit = values => {
    if (!this.state.data) return;
    const { sharedKey } = this.state.data;

    this.setState({ isPending: true });
    authApiProxy
      .v10Auth2faConfirmPost(authService.getAuthArg(), {
        model: {
          ...values,
          sharedKey
        }
      })
      .then(data => this.setState({ ...data }, this.props.onSubmit));
  };

  render() {
    if (!this.state.data) return null;
    const { authenticatorUri, sharedKey, codes } = this.state.data;
    const { t } = this.props;
    return !codes ? (
      <div className="dialog google-auth">
          <div className="dialog__header">
            <h2>{t("2fa.title")}</h2>
            <p>{t("2fa.google")}</p>
          </div>
          <div className="google-auth__steps">
            <GoogleStep1 t={t} />
            <GoogleStep2
              t={t}
              authenticatorUri={authenticatorUri}
              sharedKey={sharedKey}
            />
            <GoogleStepForm
              onSubmit={this.handleSubmit}
              disabled={this.state.isPending}
              errorMessage={this.state.errorMessage}
            />
          </div>
        </div>
    ) : (
      <div className="dialog__top">
        <ul>
          {codes.map(({ code }) => (
            <li key={code}>{code}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default translate()(GoogleAuthContainer);


