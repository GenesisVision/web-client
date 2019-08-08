import * as React from "react";
import { useTranslation } from "react-i18next";
import { NumberFormatValues } from "react-number-format";
import GVCheckbox from "shared/components/gv-checkbox/gv-checkbox";
import GVFormikField from "shared/components/gv-formik-field";
import InputAmountField from "shared/components/input-amount-field/input-amount-field";
import { CurrencyEnum } from "shared/utils/types";

const _InvestmentLimitField: React.FC<Props> = ({
  checkboxName,
  inputName,
  hasInvestmentLimit,
  isAllow,
  currency
}) => {
  const { t } = useTranslation();
  return (
    <>
      <div className="create-program-settings__field create-program-settings__field--wider">
        <GVFormikField
          type="checkbox"
          color="primary"
          name={checkboxName}
          label={
            <span>
              {t(
                "manager.create-program-page.settings.fields.investment-limit"
              )}
            </span>
          }
          component={GVCheckbox}
        />
      </div>
      {hasInvestmentLimit && (
        <div className="create-program-settings__field">
          <InputAmountField
            autoFocus={false}
            isAllow={isAllow}
            name={inputName}
            label={t(
              "manager.create-program-page.settings.fields.enter-correct-amount"
            )}
            currency={currency}
          />
        </div>
      )}
    </>
  );
};

interface Props {
  checkboxName: string;
  inputName: string;
  isAllow: (values: NumberFormatValues) => boolean;
  currency: CurrencyEnum;
  hasInvestmentLimit: boolean;
}

const InvestmentLimitField = React.memo(_InvestmentLimitField);
export default InvestmentLimitField;
