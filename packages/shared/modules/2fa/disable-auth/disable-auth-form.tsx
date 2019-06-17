import { InjectedFormikProps, withFormik } from "formik";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { compose } from "redux";
import GVButton from "shared/components/gv-button";
import GVFormikField from "shared/components/gv-formik-field";
import GVTextField from "shared/components/gv-text-field";
import { SetSubmittingType } from "shared/utils/types";
import { number, object, string } from "yup";

const DisableAuth: React.FC<
  InjectedFormikProps<Props, IDisableAuthFormFormValues>
> = ({ t, handleSubmit, errorMessage, isSubmitting }) => (
  <form
    id="disable-auth"
    onSubmit={handleSubmit}
    className="dialog__top"
    autoComplete="off"
  >
    <div className="dialog__title">{t("2fa-page.disable.title")}</div>
    <GVFormikField
      name={FIELDS.twoFactorCode}
      type="text"
      label={t("2fa-page.google-code")}
      component={GVTextField}
      autoComplete="off"
      InputComponent={NumberFormat}
      allowNegative={false}
      format="######"
    />
    <GVFormikField
      name={FIELDS.password}
      type="password"
      label={t("2fa-page.password")}
      component={GVTextField}
      autoComplete="new-password"
    />
    <div className="form-error">{errorMessage}</div>
    <div className="dialog__buttons">
      <GVButton
        className="google-auth__button"
        variant="contained"
        color="primary"
        type="submit"
        disabled={isSubmitting}
      >
        {t("buttons.disable")}
      </GVButton>
    </div>
  </form>
);

const DisableAuthForm = compose<React.ComponentType<OwnProps>>(
  translate(),
  withFormik<Props, IDisableAuthFormFormValues>({
    displayName: "disable-auth",
    mapPropsToValues: () => ({
      [FIELDS.twoFactorCode]: "",
      [FIELDS.password]: ""
    }),
    validationSchema: (props: Props) =>
      object().shape({
        [FIELDS.twoFactorCode]: number().required(
          props.t("2fa-page.code-required")
        ),
        [FIELDS.password]: string().required(
          props.t("2fa-page.password-required")
        )
      }),
    handleSubmit: (values, { props, setSubmitting }) => {
      props.onSubmit(values, setSubmitting);
    }
  })
)(DisableAuth);

enum FIELDS {
  twoFactorCode = "twoFactorCode",
  password = "password"
}

interface Props extends InjectedTranslateProps, OwnProps {}
interface OwnProps {
  errorMessage?: string;
  onSubmit(
    twoFactorCode: IDisableAuthFormFormValues,
    setSubmitting: SetSubmittingType
  ): void;
}

export interface IDisableAuthFormFormValues {
  [FIELDS.twoFactorCode]: string;
  [FIELDS.password]: string;
}

export default DisableAuthForm;
