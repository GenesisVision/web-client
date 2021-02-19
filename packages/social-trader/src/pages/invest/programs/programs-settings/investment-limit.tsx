import InvestmentLimitField from "components/assets/fields/investment-limit-field";
import { Row } from "components/row/row";
import SettingsBlock from "components/settings-block/settings-block";
import { SubmitButton } from "components/submit-button/submit-button";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { HookForm } from "utils/hook-form.helpers";
import { CurrencyEnum } from "utils/types";

enum FIELDS {
  hasInvestmentLimit = "hasInvestmentLimit",
  investmentLimit = "investmentLimit"
}

const _InvestmentLimit: React.FC<Props> = ({
  editError,
  onSubmit,
  investmentLimit,
  currency
}) => {
  const [t] = useTranslation();

  const [hasInvestmentLimit, setHasInvestmentLimit] = useState(
    investmentLimit !== undefined
  );

  const form = useForm<InvesmentLimitFormValues>({
    defaultValues: {
      [FIELDS.investmentLimit]: investmentLimit
    },
    mode: "onChange"
  });

  const { setValue } = form;

  useEffect(() => {
    if (!hasInvestmentLimit) setValue(FIELDS.investmentLimit, undefined, true);
    else setValue(FIELDS.investmentLimit, investmentLimit, true);
  }, [hasInvestmentLimit]);

  const handleSubmit = useCallback(
    (values: InvesmentLimitFormValues) =>
      onSubmit({ ...values, hasInvestmentLimit }),
    [onSubmit, hasInvestmentLimit]
  );

  return (
    <SettingsBlock label={t("asset-settings:fields.investment-limit")}>
      <HookForm resetOnSuccess form={form} onSubmit={handleSubmit}>
        <InvestmentLimitField
          wide={false}
          setHasInvestmentLimit={setHasInvestmentLimit}
          checkboxName={"hasInvestmentLimit"}
          inputName={FIELDS.investmentLimit}
          hasInvestmentLimit={hasInvestmentLimit}
          currency={currency}
        />
        <Row size={"large"}>
          <SubmitButton isSuccessful={!editError}>
            {t("asset-settings:buttons.save")}
          </SubmitButton>
        </Row>
      </HookForm>
    </SettingsBlock>
  );
};

export interface InvesmentLimitFormValues {
  [FIELDS.hasInvestmentLimit]: boolean;
  [FIELDS.investmentLimit]?: number;
}

interface Props {
  editError?: boolean;
  currency: CurrencyEnum;
  investmentLimit?: number;
  onSubmit: (values: InvesmentLimitFormValues) => void;
}

const InvestmentLimit = React.memo(_InvestmentLimit);
export default InvestmentLimit;
