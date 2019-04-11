import { InjectedFormikProps, withFormik } from "formik";
import { object, string } from "yup";
import { GVButton, GVFormikField, GVTextField } from "gv-react-components";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { compose } from "redux";
import { SetSubmittingType } from "shared/utils/types";

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
        name="twoFactorCode"
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
  twoFactorCode: string;
}
interface OwnProps {
  onSubmit(
    twoFactorCode: IConfirmFormValues,
    setSubmitting: SetSubmittingType
  ): void;
  serverError: string;
}

const ConfirmForm = compose<React.FunctionComponent<OwnProps>>(
  React.memo,
  translate(),
  withFormik<Props, IConfirmFormValues>({
    displayName: "confirm-form",
    mapPropsToValues: () => ({
      twoFactorCode: ""
    }),
    validationSchema: (props: Props) =>
      object().shape({
        twoFactorCode: string()
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
