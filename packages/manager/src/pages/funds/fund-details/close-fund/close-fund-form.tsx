import { InjectedFormikProps, withFormik } from "formik";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { compose } from "redux";
import GVButton from "shared/components/gv-button";
import GVFormikField from "shared/components/gv-formik-field";
import GVTextField from "shared/components/gv-text-field";
import withLoader, { WithLoaderProps } from "shared/decorators/with-loader";
import { SetSubmittingType } from "shared/utils/types";
import { object, string } from "yup";

const _CloseFundForm: React.FC<
  InjectedFormikProps<Props, ICloseFundFormValues>
> = ({
  t,
  onCancel,
  twoFactorEnabled,
  handleSubmit,
  isSubmitting,
  errorMessage
}) => (
  <form id="closeFundForm" onSubmit={handleSubmit} noValidate>
    <div className="dialog__top">
      <h2>{t("fund-details-page.description.close-fund")}</h2>
      <div className="dialog__text">
        <p>{t("fund-details-page.description.close-fund-notification")}</p>
      </div>
      {twoFactorEnabled && (
        <GVFormikField
          type="text"
          name={FIELDS.twoFactorCode}
          label={t("wallet-withdraw.two-factor-code-label")}
          autoComplete="off"
          component={GVTextField}
        />
      )}
      {errorMessage && <div className="form-error">{errorMessage}</div>}
      <div className="dialog__buttons">
        <GVButton type="submit" disabled={isSubmitting}>
          {t("buttons.confirm")}
        </GVButton>
        <GVButton
          color="secondary"
          variant="outlined"
          disabled={isSubmitting}
          onClick={onCancel}
        >
          {t("buttons.cancel")}
        </GVButton>
      </div>
    </div>
  </form>
);

enum FIELDS {
  twoFactorCode = "twoFactorCode"
}

interface Props extends OwnProps, InjectedTranslateProps {}

interface OwnProps {
  twoFactorEnabled: boolean;
  onSubmit: (
    values: ICloseFundFormValues,
    setSubmitting: SetSubmittingType
  ) => void;
  onCancel: () => void;
  errorMessage: string;
}

export interface ICloseFundFormValues {
  [FIELDS.twoFactorCode]: string;
}

const tfaValidator = (t: (msg: string) => string) =>
  string()
    .trim()
    .matches(/^\d{6}$/, t("wallet-withdraw.validation.two-factor-6digits"));

const CloseFundForm = compose<React.ComponentType<OwnProps & WithLoaderProps>>(
  React.memo,
  withLoader,
  translate(),
  withFormik<Props, ICloseFundFormValues>({
    displayName: "close-fund",
    mapPropsToValues: () => ({ [FIELDS.twoFactorCode]: "" }),
    validationSchema: ({ t, twoFactorEnabled }: Props) =>
      object().shape({
        [FIELDS.twoFactorCode]: twoFactorEnabled
          ? tfaValidator(t).required(
              t("wallet-withdraw.validation.two-factor-required")
            )
          : tfaValidator(t)
      }),
    handleSubmit: (values, { props, setSubmitting }) => {
      props.onSubmit(values, setSubmitting);
    }
  })
)(_CloseFundForm);
export default CloseFundForm;
