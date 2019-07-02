import { FormikProps, withFormik } from "formik";
import React, { useCallback } from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { NumberFormatValues } from "react-number-format";
import { compose } from "redux";
import GVButton from "shared/components/gv-button";
import GVCheckbox from "shared/components/gv-checkbox/gv-checkbox";
import GVFormikField from "shared/components/gv-formik-field";
import InputAmountField from "shared/components/input-amount-field/input-amount-field";
import { validateFraction } from "shared/utils/formatter";
import { CurrencyEnum, SetSubmittingType } from "shared/utils/types";
import { boolean, mixed, number, object } from "yup";

const _InvestmentLimit: React.FC<Props> = ({
  t,
  values,
  handleSubmit,
  dirty,
  isValid,
  isSubmitting,
  currency
}) => {
  const isAmountAllow = useCallback(
    (currency: CurrencyEnum) => ({ value }: NumberFormatValues) =>
      validateFraction(value, currency),
    []
  );
  return (
    <form id="edit-form" onSubmit={handleSubmit}>
      <div className="program-edit__block-wrapper">
        <h3>
          {t("manager.create-program-page.settings.fields.investment-limit")}
        </h3>
        <GVFormikField
          type="checkbox"
          color="primary"
          name={FIELDS.hasInvestmentLimit}
          label={
            <span>
              {t(
                "manager.create-program-page.settings.fields.investment-limit"
              )}
            </span>
          }
          component={GVCheckbox}
        />
        {values.hasInvestmentLimit && (
          <div className="create-program-settings__item">
            <InputAmountField
              autoFocus={false}
              isAllow={isAmountAllow(currency)}
              name={FIELDS.investmentLimit}
              label={t(
                "manager.create-program-page.settings.fields.enter-correct-amount"
              )}
              currency={currency ? currency : ""}
            />
          </div>
        )}
        <p className="program-edit__text">
          {t("manager.program-settings.investment-limit.text")}
        </p>
        <GVButton
          color="primary"
          type={"submit"}
          className="invest-form__submit-button"
          disabled={!dirty || !isValid || isSubmitting}
        >
          {t("manager.program-settings.buttons.save")}
        </GVButton>
      </div>
    </form>
  );
};

enum FIELDS {
  hasInvestmentLimit = "hasInvestmentLimit",
  investmentLimit = "investmentLimit"
}

export interface InvesmentLimitFormValues {
  [FIELDS.hasInvestmentLimit]: boolean;
  [FIELDS.investmentLimit]: number;
}

interface Props
  extends OwnProps,
    InjectedTranslateProps,
    FormikProps<InvesmentLimitFormValues> {}

interface OwnProps {
  currency: CurrencyEnum;
  investmentLimit: number;
  onSubmit: (
    values: InvesmentLimitFormValues,
    setSubmitting: SetSubmittingType
  ) => void;
}

const InvestmentLimit = compose<React.ComponentType<OwnProps>>(
  translate(),
  withFormik<OwnProps, InvesmentLimitFormValues>({
    enableReinitialize: true,
    displayName: "edit-form",
    mapPropsToValues: ({ investmentLimit }) => ({
      [FIELDS.hasInvestmentLimit]: investmentLimit !== null,
      [FIELDS.investmentLimit]: investmentLimit
    }),
    validationSchema: ({ t }: Props) =>
      object().shape({
        [FIELDS.hasInvestmentLimit]: boolean(),
        [FIELDS.investmentLimit]: mixed().when(FIELDS.hasInvestmentLimit, {
          is: true,
          then: number()
            .min(
              0,
              t(
                "manager.create-program-page.settings.validation.investment-limit-min"
              )
            )
            .lessThan(
              10000000000,
              "Investment Limit must be less than 10000000000"
            )
            .required(
              t(
                "manager.create-program-page.settings.validation.investment-limit-required"
              )
            )
        })
      }),
    handleSubmit: (values, { props, setSubmitting }) => {
      props.onSubmit(values, setSubmitting);
    }
  }),
  React.memo
)(_InvestmentLimit);
export default InvestmentLimit;
