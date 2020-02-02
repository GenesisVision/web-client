import GVButton from "components/gv-button";
import GVFormikField from "components/gv-formik-field";
import GVTextField from "components/gv-text-field";
import { InjectedFormikProps, withFormik } from "formik";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { compose } from "redux";
import { SetSubmittingType } from "utils/types";
import { number, object, string } from "yup";

export const GoogleStep3: React.FC<InjectedFormikProps<
  Props,
  IGoogleActivateStepFormValues
>> = ({
  t,
  handleSubmit,
  errorMessage,
  isSubmitting,
  enablePassword = true
}) => (
  <div className="google-auth__step">
    <div className="google-auth__count">03</div>
    <div className="google-auth__title">{t("2fa-page.enter-code")}</div>
    <form id="google-auth" onSubmit={handleSubmit} autoComplete="off">
      <GVFormikField
        name={FIELDS.code}
        type="tel"
        label={t("2fa-page.google-code")}
        component={GVTextField}
        autoComplete="off"
        autoFocus
        InputComponent={NumberFormat}
        allowNegative={false}
        format="######"
      />
      {enablePassword && (
        <GVFormikField
          name={FIELDS.password}
          type="password"
          label={t("2fa-page.password")}
          component={GVTextField}
          autoComplete="new-password"
        />
      )}
      <div className="form-error">{errorMessage}</div>
      <GVButton
        className="google-auth__button"
        variant="contained"
        color="primary"
        type="submit"
        disabled={isSubmitting}
      >
        {t("buttons.activate")}
      </GVButton>
    </form>
  </div>
);

enum FIELDS {
  code = "code",
  password = "password",
  enablePassword = "enablePassword"
}

interface Props extends OwnProps, WithTranslation {}
interface OwnProps {
  enablePassword?: boolean;
  onSubmit(
    twoFactorCode: IGoogleActivateStepFormValues,
    setSubmitting: SetSubmittingType
  ): void;
  errorMessage?: string;
}
export interface IGoogleActivateStepFormValues {
  [FIELDS.code]: string;
  [FIELDS.password]: string;
  [FIELDS.enablePassword]: boolean;
}

const GoogleActivateStep = compose<React.ComponentType<OwnProps>>(
  translate(),
  withFormik<Props, IGoogleActivateStepFormValues>({
    displayName: "google-auth",
    mapPropsToValues: (props: Props) => ({
      [FIELDS.enablePassword]: props.enablePassword || true,
      [FIELDS.code]: "",
      [FIELDS.password]: ""
    }),
    validationSchema: (props: Props) =>
      object().shape({
        [FIELDS.code]: number().required(props.t("2fa-page.code-required")),
        [FIELDS.password]: string().when(FIELDS.enablePassword, {
          is: true,
          than: string().required(props.t("2fa-page.password-required"))
        })
      }),
    handleSubmit: (values, { props, setSubmitting }) => {
      props.onSubmit(values, setSubmitting);
    }
  }),
  React.memo
)(GoogleStep3);

export default GoogleActivateStep;
