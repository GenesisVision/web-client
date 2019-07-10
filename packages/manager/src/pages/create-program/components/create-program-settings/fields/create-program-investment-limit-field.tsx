import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { NumberFormatValues } from "react-number-format";
import GVCheckbox from "shared/components/gv-checkbox/gv-checkbox";
import GVFormikField from "shared/components/gv-formik-field";
import InputAmountField from "shared/components/input-amount-field/input-amount-field";
import { CurrencyEnum } from "shared/utils/types";

const _CreateProgramInvestmentLimitField: React.FC<Props> = ({
  checkboxName,
  inputName,
  t,
  hasInvestmentLimit,
  isAllow,
  currency
}) => (
  <>
    <div className="create-program-settings__item create-program-settings__item--wider">
      <GVFormikField
        type="checkbox"
        color="primary"
        name={checkboxName}
        label={
          <span>
            {t("manager.create-program-page.settings.fields.investment-limit")}
          </span>
        }
        component={GVCheckbox}
      />
    </div>
    {hasInvestmentLimit && (
      <div className="create-program-settings__item">
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

interface Props extends InjectedTranslateProps {
  checkboxName: string;
  inputName: string;
  isAllow: (values: NumberFormatValues) => boolean;
  currency: CurrencyEnum;
  hasInvestmentLimit: boolean;
}

const CreateProgramInvestmentLimitField = translate()(
  React.memo(_CreateProgramInvestmentLimitField)
);
export default CreateProgramInvestmentLimitField;
