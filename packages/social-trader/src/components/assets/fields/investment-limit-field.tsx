import FormTextField from "components/assets/fields/form-text-field";
import GVCheckbox from "components/gv-checkbox/gv-checkbox";
import InputAmountField from "components/input-amount-field/hook-form-amount-field";
import { Row } from "components/row/row";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { NumberFormatValues } from "react-number-format";
import { validateFraction } from "utils/formatter";
import { CurrencyEnum } from "utils/types";

interface Props {
  wide?: boolean;
  setHasInvestmentLimit: (value: boolean) => void;
  checkboxName: string;
  inputName: string;
  currency: CurrencyEnum;
  hasInvestmentLimit: boolean;
}

const isAmountAllow = (currency: CurrencyEnum) => ({
  value
}: NumberFormatValues) => validateFraction(value, currency);

const _InvestmentLimitField: React.FC<Props> = ({
  wide,
  setHasInvestmentLimit,
  checkboxName,
  inputName,
  hasInvestmentLimit,
  currency
}) => {
  const { t } = useTranslation();
  return (
    <>
      <Row wide size={"large"}>
        <GVCheckbox
          value={hasInvestmentLimit}
          setFieldValue={(_, value) => setHasInvestmentLimit(value)}
          color="primary"
          name={checkboxName}
          label={t("asset-settings:fields.investment-limit")}
        />
      </Row>
      <InputAmountField
        hide={!hasInvestmentLimit}
        showCorrect
        wide={wide}
        autoFocus={false}
        isAllowed={isAmountAllow(currency)}
        name={inputName}
        label={t("asset-settings:fields.enter-correct-amount")}
        currency={currency}
        rules={
          hasInvestmentLimit
            ? {
                required: t("validations.investment-limit-required"),
                min: {
                  value: 0,
                  message: t("validations.investment-limit-min")
                },
                max: {
                  value: 10000000000,
                  message: "Investment Limit must be less than 10000000000"
                }
              }
            : undefined
        }
      />
      <Row wide size={"large"}>
        <FormTextField>
          {t("asset-settings:investment-limit.text")}
        </FormTextField>
      </Row>
    </>
  );
};

const InvestmentLimitField = React.memo(_InvestmentLimitField);
export default InvestmentLimitField;
