import { InjectedFormikProps, withFormik } from "formik";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import { DialogBottom } from "shared/components/dialog/dialog-bottom";
import { DialogButtons } from "shared/components/dialog/dialog-buttons";
import { DialogTop } from "shared/components/dialog/dialog-top";
import FormError from "shared/components/form/form-error/form-error";
import GVButton from "shared/components/gv-button";
import GVFormikField from "shared/components/gv-formik-field";
import GVTextField from "shared/components/gv-text-field";
import withLoader, { WithLoaderProps } from "shared/decorators/with-loader";
import { SetSubmittingType } from "shared/utils/types";
import { object, string } from "yup";

const _ConfirmForm: React.FC<
  InjectedFormikProps<Props, IConfirmFormValues>
> = ({ t, handleSubmit, serverError, isSubmitting }) => (
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
      <FormError error={errorMessage}/>
      <DialogButtons>
        <GVButton type="submit" id="signUpFormSubmit" disabled={isSubmitting}>
          {t("auth.login.two-factor.verify")}
        </GVButton>
      </DialogButtons>
    </DialogBottom>
  </form>
);

enum FIELDS {
  code = "code"
}

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
