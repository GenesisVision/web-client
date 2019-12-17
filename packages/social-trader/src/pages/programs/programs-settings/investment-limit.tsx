import InvestmentLimitField from "components/assets/fields/investment-limit-field";
import GVButton from "components/gv-button";
import SettingsBlock from "components/settings-block/settings-block";
import { FormikProps, withFormik } from "formik";
import React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import { CurrencyEnum, SetSubmittingType } from "utils/types";
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
  return (
    <SettingsBlock
      label={t("create-program-page.settings.fields.investment-limit")}
    >
      <form id="edit-form" onSubmit={handleSubmit}>
        <InvestmentLimitField
          checkboxName={FIELDS.hasInvestmentLimit}
          inputName={FIELDS.investmentLimit}
          hasInvestmentLimit={values.hasInvestmentLimit}
          currency={currency}
        />
        <GVButton
          color="primary"
          type={"submit"}
          className="invest-form__submit-button"
          disabled={!dirty || !isValid || isSubmitting}
        >
          {t("program-settings.buttons.save")}
        </GVButton>
      </form>
    </SettingsBlock>
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
    WithTranslation,
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
              t("create-program-page.settings.validation.investment-limit-min")
            )
            .lessThan(
              10000000000,
              "Investment Limit must be less than 10000000000"
            )
            .required(
              t(
                "create-program-page.settings.validation.investment-limit-required"
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
