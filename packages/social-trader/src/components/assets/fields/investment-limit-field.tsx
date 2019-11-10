import AssetField from "components/assets/asset-fields/asset-field";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { NumberFormatValues } from "react-number-format";
import GVCheckbox from "shared/components/gv-checkbox/gv-checkbox";
import GVFormikField from "shared/components/gv-formik-field";
import InputAmountField from "shared/components/input-amount-field/input-amount-field";
import { validateFraction } from "shared/utils/formatter";
import { CurrencyEnum } from "shared/utils/types";

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
