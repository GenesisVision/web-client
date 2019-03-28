import { InjectedFormikProps, withFormik } from "formik";
import { GVButton, GVFormikField, GVTextField } from "gv-react-components";
import React, { ComponentType, PureComponent } from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { compose } from "redux";
import { object, string } from "yup";
import { TranslationFunction } from "i18next";

interface OwnProps {
  onCancel(): void;
  twoFactorEnabled: boolean;
  onSubmit(values: FormValues): void;
  handleSubmit(): void;
}

interface FormValues {
  twoFactorCode?: string;
}

type FormProps = InjectedTranslateProps & OwnProps;

const CloseProgramForm: React.FC<
  InjectedFormikProps<FormProps, FormValues>
> = ({ t, onCancel, twoFactorEnabled, handleSubmit, isSubmitting }) => {
  return (
    <form id="closeProgramForm" onSubmit={handleSubmit} noValidate>
      <div className="dialog__top">
        <h2>{t("program-details-page.description.close-program")}</h2>
        <div className="dialog__text">
          <p>
            {t("program-details-page.description.close-program-notification")}
          </p>
        </div>
        {twoFactorEnabled && (
          <GVFormikField
            type="text"
            name="twoFactorCode"
            label={t("wallet-withdraw.two-factor-code-label")}
            autoComplete="off"
            component={GVTextField}
          />
        )}
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
};

const twoFactorvalidator = (
  t: TranslationFunction,
  twoFactorEnabled: boolean
) => {
  return twoFactorEnabled
    ? string()
        .trim()
        .matches(/^\d{6}$/, t("wallet-withdraw.validation.two-factor-6digits"))
        .required(t("wallet-withdraw.validation.two-factor-required"))
    : string()
        .trim()
        .matches(/^\d{6}$/, t("wallet-withdraw.validation.two-factor-6digits"));
};

export default compose<ComponentType<OwnProps>>(
  translate(),
  withFormik<OwnProps, FormValues>({
    displayName: "close-program",
    mapPropsToValues: () => {
      return { twoFactorCode: "" };
    },
    validationSchema: ({ t, twoFactorEnabled }: FormProps) =>
      object().shape({
        twoFactorCode: twoFactorvalidator(t, twoFactorEnabled)
      }),
    handleSubmit: (values, { props }) => {
      props.onSubmit(values);
    }
  })
)(CloseProgramForm);
