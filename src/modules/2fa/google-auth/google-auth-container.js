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

const GoogleStep1 = ({ t }) => {
  return (
    <div className="google-auth__step">
      01
      <div className="google-auth__title">{t("2fa.download-app")}</div>
    </div>
  );
};

const GoogleStep2 = ({ t, authenticatorUri, sharedKey }) => {
  return (
    <div className="google-auth__step">
      02
      <div className="google-auth__title">{t("2fa.scan-code")}</div>
      <div className="google-auth__qr">
        <GVqr value={authenticatorUri} size={250} />
      </div>
      <p>{t("2fa.alt-code")}</p>
      <h2>{sharedKey}</h2>
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
      03
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
      <div className="dialog__top">
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
