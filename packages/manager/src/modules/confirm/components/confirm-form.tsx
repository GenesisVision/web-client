import { InjectedFormikProps, withFormik } from "formik";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { compose } from "redux";
import GVButton from "shared/components/gv-button";
import GVFormikField from "shared/components/gv-formik-field";
import GVTextField from "shared/components/gv-text-field";
import { SetSubmittingType } from "shared/utils/types";
import { object, string } from "yup";

const _ConfirmForm: React.FC<
  InjectedFormikProps<Props, IConfirmFormValues>
> = ({ t, handleSubmit, serverError, isSubmitting }) => {
  return (
    <form id="confirm-form" onSubmit={handleSubmit}>
      <div className="dialog__top">
        <div className="dialog__header">
          <h2>Confirm</h2>
          <p>Confirm</p>
        </div>
      </div>
      <GVFormikField
        disabled={isSubmitting}
        type="text"
        name="code"
        label={t("auth.login.two-factor.input-label")}
        autoComplete="off"
        autoFocus
        component={GVTextField}
      />
      <div className="dialog__bottom">
        <div className="form-error">{serverError}</div>
        <div className="dialog__buttons">
          <GVButton type="submit" id="signUpFormSubmit" disabled={isSubmitting}>
            {t("auth.login.two-factor.verify")}
          </GVButton>
        </div>
      </div>
    </form>
  );
};

interface Props extends OwnProps, IConfirmFormValues, InjectedTranslateProps {}
export interface IConfirmFormValues {
  code: string;
}
interface OwnProps {
  onSubmit(code: IConfirmFormValues, setSubmitting: SetSubmittingType): void;
  serverError: string;
}

const ConfirmForm = compose<React.ComponentType<OwnProps>>(
  React.memo,
  translate(),
  withFormik<Props, IConfirmFormValues>({
    displayName: "confirm-form",
    mapPropsToValues: () => ({
      code: ""
    }),
    validationSchema: (props: Props) =>
      object().shape({
        code: string()
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
  })
)(_ConfirmForm);
export default ConfirmForm;
