import AssetField from "components/assets/asset-fields/asset-field";
import FormTextField from "components/assets/fields/form-text-field";
import GVCheckbox from "components/gv-checkbox/gv-checkbox";
import GVFormikField from "components/gv-formik-field";
import InputAmountField from "components/input-amount-field/input-amount-field";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { NumberFormatValues } from "react-number-format";
import { validateFraction } from "utils/formatter";
import { CurrencyEnum } from "utils/types";

const isAmountAllow = (currency: CurrencyEnum) => ({
  value
}: NumberFormatValues) => validateFraction(value, currency);

const _InvestmentLimitField: React.FC<Props> = ({
  checkboxName,
  inputName,
  hasInvestmentLimit,
  currency
}) => {
  const { t } = useTranslation();
  return (
    <>
      <AssetField wide>
        <GVFormikField
          wide
          type="checkbox"
          color="primary"
          name={checkboxName}
          label={
            <span>
              {t("create-program-page.settings.fields.investment-limit")}
            </span>
          }
          component={GVCheckbox}
        />
      </AssetField>
      {hasInvestmentLimit && (
        <AssetField>
          <InputAmountField
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
  checkboxName: string;
  inputName: string;
  currency: CurrencyEnum;
  hasInvestmentLimit: boolean;
}

const InvestmentLimitField = React.memo(_InvestmentLimitField);
export default InvestmentLimitField;
