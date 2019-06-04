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

export const GoogleStep3: React.FC<
  InjectedFormikProps<Props, IGoogleActivateStepFormValues>
> = ({
  t,
  handleSubmit,
  errorMessage,
  isSubmitting,
  enablePassword = true
}) => {
  console.log(enablePassword);
  return (
    <div className="google-auth__step">
      <div className="google-auth__count">03</div>
      <div className="google-auth__title">{t("2fa-page.enter-code")}</div>
      <form id="google-auth" onSubmit={handleSubmit} autoComplete="off">
        <GVFormikField
          name="code"
          type="text"
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
            name="password"
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
};

interface Props extends OwnProps, InjectedTranslateProps {}
interface OwnProps {
  enablePassword?: boolean;
  onSubmit(
    twoFactorCode: IGoogleActivateStepFormValues,
    setSubmitting: SetSubmittingType
  ): void;
  errorMessage?: string;
}
export interface IGoogleActivateStepFormValues {
  code: string;
  password: string;
  enablePassword: boolean;
}

const GoogleActivateStep = compose<React.ComponentType<OwnProps>>(
  React.memo,
  translate(),
  withFormik<Props, IGoogleActivateStepFormValues>({
    displayName: "google-auth",
    mapPropsToValues: (props: Props) => ({
      enablePassword: props.enablePassword || true,
      code: "",
      password: ""
    }),
    validationSchema: (props: Props) =>
      object().shape({
        code: number().required(props.t("2fa-page.code-required")),
        password: string().when("enablePassword", {
          is: true,
          than: string().required(props.t("2fa-page.password-required"))
        })
      }),
    handleSubmit: (values, { props, setSubmitting }) => {
      props.onSubmit(values, setSubmitting);
    }
  })
)(GoogleStep3);

export default GoogleActivateStep;
