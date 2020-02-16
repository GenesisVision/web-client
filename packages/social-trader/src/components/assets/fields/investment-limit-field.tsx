import AssetField from "components/assets/asset-fields/asset-field";
import FormTextField from "components/assets/fields/form-text-field";
import GVCheckbox from "components/gv-checkbox/gv-checkbox";
import InputAmountField from "components/input-amount-field/hook-form-amount-field";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { NumberFormatValues } from "react-number-format";
import { validateFraction } from "utils/formatter";
import { CurrencyEnum } from "utils/types";

const isAmountAllow = (currency: CurrencyEnum) => ({
  value
}: NumberFormatValues) => validateFraction(value, currency);

const _InvestmentLimitField: React.FC<Props> = ({
  setHasInvestmentLimit,
  checkboxName,
  inputName,
  hasInvestmentLimit,
  currency
}) => {
  const { t } = useTranslation();
  return (
    <>
      <AssetField wide>
        <GVCheckbox
          value={hasInvestmentLimit}
          setFieldValue={(_, value) => setHasInvestmentLimit(value)}
          color="primary"
          name={checkboxName}
          label={t("create-program-page.settings.fields.investment-limit")}
        />
      </AssetField>
      {hasInvestmentLimit && (
        <AssetField>
          <InputAmountField
            showCorrect
            wide
            autoFocus={false}
            isAllow={isAmountAllow(currency)}
            name={inputName}
            label={t(
              "create-program-page.settings.fields.enter-correct-amount"
            )}
            currency={currency}
          />
        </AssetField>
      )}
      <AssetField wide>
        <FormTextField>
          {t("program-settings.investment-limit.text")}
        </FormTextField>
      </AssetField>
    </>
  );
};

interface Props {
  setHasInvestmentLimit: (value: boolean) => void;
  checkboxName: string;
  inputName: string;
  currency: CurrencyEnum;
  hasInvestmentLimit: boolean;
}

const InvestmentLimitField = React.memo(_InvestmentLimitField);
export default InvestmentLimitField;
