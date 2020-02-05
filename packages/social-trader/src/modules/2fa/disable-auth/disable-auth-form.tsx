import { DialogBottom } from "components/dialog/dialog-bottom";
import { DialogButtons } from "components/dialog/dialog-buttons";
import { DialogError } from "components/dialog/dialog-error";
import { DialogTop } from "components/dialog/dialog-top";
import GVButton from "components/gv-button";
import GVFormikField from "components/gv-formik-field";
import GVTextField from "components/gv-text-field";
import { InjectedFormikProps, withFormik } from "formik";
import * as React from "react";
import { WithTranslation, withTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import { compose } from "redux";
import { SetSubmittingType } from "utils/types";
import { number, object, string } from "yup";

const DisableAuth: React.FC<InjectedFormikProps<
  Props,
  IDisableAuthFormFormValues
>> = ({ t, handleSubmit, errorMessage, isSubmitting }) => (
  <form id="disable-auth" onSubmit={handleSubmit} autoComplete="off">
    <DialogTop title={t("2fa-page.disable.title")} />
    <DialogBottom>
      <GVFormikField
        name={FIELDS.twoFactorCode}
        type="tel"
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
      <DialogError error={errorMessage} />
      <DialogButtons>
        <GVButton
          wide
          className="google-auth__button"
          variant="contained"
          color="primary"
          type="submit"
          disabled={isSubmitting}
        >
          {t("buttons.disable")}
        </GVButton>
      </DialogButtons>
    </DialogBottom>
  </form>
);

const DisableAuthForm = compose<React.ComponentType<OwnProps>>(
  withTranslation(),
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

interface Props extends WithTranslation, OwnProps {}
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
