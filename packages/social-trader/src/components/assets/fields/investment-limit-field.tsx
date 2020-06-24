import FormTextField from "components/assets/fields/form-text-field";
import GVCheckbox from "components/gv-checkbox/gv-checkbox";
import InputAmountField from "components/input-amount-field/hook-form-amount-field";
import { Row } from "components/row/row";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { NumberFormatValues } from "react-number-format";
import { validateFraction } from "utils/formatter";
import { CurrencyEnum } from "utils/types";

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
      <Row wide large>
        <GVCheckbox
          value={hasInvestmentLimit}
          setFieldValue={(_, value) => setHasInvestmentLimit(value)}
          color="primary"
          name={checkboxName}
          label={t("create-program-page.settings.fields.investment-limit")}
        />
      </Row>
      {hasInvestmentLimit && (
        <InputAmountField
          showCorrect
          wide={wide}
          autoFocus={false}
          isAllowed={isAmountAllow(currency)}
          name={inputName}
          label={t("create-program-page.settings.fields.enter-correct-amount")}
          currency={currency}
        />
      )}
      <Row wide large>
        <FormTextField>
          {t("program-settings.investment-limit.text")}
        </FormTextField>
      </Row>
    </>
  );
};

interface Props {
  wide?: boolean;
  setHasInvestmentLimit: (value: boolean) => void;
  checkboxName: string;
  inputName: string;
  currency: CurrencyEnum;
  hasInvestmentLimit: boolean;
}

const InvestmentLimitField = React.memo(_InvestmentLimitField);
export default InvestmentLimitField;
