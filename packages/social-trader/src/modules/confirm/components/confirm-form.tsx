import { DialogBottom } from "components/dialog/dialog-bottom";
import { DialogButtons } from "components/dialog/dialog-buttons";
import { DialogError } from "components/dialog/dialog-error";
import { DialogTop } from "components/dialog/dialog-top";
import GVButton from "components/gv-button";
import GVFormikField from "components/gv-formik-field";
import GVTextField from "components/gv-text-field";
import withLoader, { WithLoaderProps } from "decorators/with-loader";
import { InjectedFormikProps, withFormik } from "formik";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import { SetSubmittingType } from "utils/types";
import { object, string } from "yup";

enum FIELDS {
  code = "code"
}

const _ConfirmForm: React.FC<InjectedFormikProps<
  Props,
  IConfirmFormValues
>> = ({ t, handleSubmit, serverError, isSubmitting }) => (
  <form id="confirm-form" onSubmit={handleSubmit}>
    <DialogTop title={"Confirm"} />
    <DialogBottom>
      <GVFormikField
        disabled={isSubmitting}
        type="text"
        name={FIELDS.code}
        label={t("auth.login.two-factor.input-label")}
        autoComplete="off"
        autoFocus
        component={GVTextField}
      />
      <DialogError error={serverError} />
      <DialogButtons>
        <GVButton
          wide
          type="submit"
          id="signUpFormSubmit"
          disabled={isSubmitting}
        >
          {t("auth.login.two-factor.verify")}
        </GVButton>
      </DialogButtons>
    </DialogBottom>
  </form>
);

interface Props extends OwnProps, IConfirmFormValues, WithTranslation {}
export interface IConfirmFormValues {
  [FIELDS.code]: string;
}
interface OwnProps {
  onSubmit(code: IConfirmFormValues, setSubmitting: SetSubmittingType): void;
  serverError: string;
}

const ConfirmForm = compose<React.ComponentType<OwnProps & WithLoaderProps>>(
  withLoader,
  translate(),
  withFormik<Props, IConfirmFormValues>({
    displayName: "confirm-form",
    mapPropsToValues: () => ({
      [FIELDS.code]: ""
    }),
    validationSchema: (props: Props) =>
      object().shape({
        [FIELDS.code]: string()
          .trim()
          .matches(
            /^\d{6}$/,
            props.t("auth.login.two-factor.validation.two-factor-6digits")
          )
          .required(
            props.t("auth.login.two-factor.validation.two-factor-required")
          )
      }),
    handleSubmit: (values, { props, setSubmitting }) => {
      return props.onSubmit(values, setSubmitting);
    }
  }),
  React.memo
)(_ConfirmForm);
export default ConfirmForm;
