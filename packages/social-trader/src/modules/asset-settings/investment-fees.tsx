import FeesSettings from "components/assets/fields/fees-settings";
import { Row } from "components/row/row";
import SettingsBlock from "components/settings-block/settings-block";
import { SubmitButton } from "components/submit-button/submit-button";
import { ASSET } from "constants/constants";
import { TFunction } from "i18next";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { HookForm } from "utils/hook-form.helpers";
import { entryFeeRules, exitFeeRules, successFeeRules } from "utils/validators/validators";

enum FIELDS {
  exitFee = "exitFee",
  entryFee = "entryFee",
  successFee = "successFee"
}

export interface InvestmentLimitFormValues {
  [FIELDS.exitFee]?: number;
  [FIELDS.entryFee]: number;
  [FIELDS.successFee]?: number;
}

interface Props {
  isExchange?: boolean;
  editError?: boolean;
  asset: ASSET;
  maxExitFee?: number;
  maxEntryFee?: number;
  maxSuccessFee?: number;
  exitFee?: number;
  entryFee: number;
  successFee?: number;
  onSubmit: (values: InvestmentLimitFormValues) => void;
}

const getFirstDescription = ({
  t,
  maxFee,
  asset,
  isExchange
}: {
  t: TFunction;
  asset: ASSET;
  maxFee?: number;
  isExchange?: boolean;
}) => {
  switch (asset) {
    case ASSET.FOLLOW:
    case ASSET.PROGRAM:
      return isExchange
        ? t("create-account:settings.hints.exchange-management-fee-description")
        : t("create-account:settings.hints.management-fee-description");
    case ASSET.FUND:
      return t("create-fund-page:settings.hints.entry-fee-description", {
        maxFee
      });
  }
};

const getSecondDescription = ({
  t,
  maxFee,
  asset,
  isExchange
}: {
  t: TFunction;
  asset: ASSET;
  maxFee: number;
  isExchange?: boolean;
}) => {
  switch (asset) {
    case ASSET.FOLLOW:
    case ASSET.PROGRAM:
      return isExchange
        ? t("create-account:settings.hints.exchange-success-fee-description")
        : t("create-account:settings.hints.success-fee-description");
    case ASSET.FUND:
      return t("create-fund-page:settings.hints.exit-fee-description", {
        maxFee
      });
  }
};

const _InvestmentFees: React.FC<Props> = ({
  isExchange,
  onSubmit,
  editError,
  entryFee,
  successFee,
  exitFee,
  maxSuccessFee = 0,
  maxEntryFee = 0,
  maxExitFee = 0,
  asset
}) => {
  const [t] = useTranslation();

  const form = useForm<InvestmentLimitFormValues>({
    defaultValues: {
      [FIELDS.exitFee]: exitFee,
      [FIELDS.entryFee]: entryFee,
      [FIELDS.successFee]: successFee
    },
    mode: "onBlur"
  });

  return (
    <SettingsBlock
      label={t(
        `create-${asset.toLowerCase()}-page:settings.investment-${asset.toLowerCase()}-fees`
      )}
    >
      <HookForm resetOnSuccess form={form} onSubmit={onSubmit}>
        {asset === ASSET.PROGRAM && (
          <FeesSettings
            firstFeeLabel={t("asset-settings:fields.management-fee")}
            firstFeeUnderText={t(
              "create-account:settings.hints.management-fee"
            )}
            firstFeeName={FIELDS.entryFee}
            firstFeeDescription={getFirstDescription({
              isExchange,
              t,
              asset: ASSET.PROGRAM
            })}
            firstFeeRules={entryFeeRules(t, maxEntryFee)}
            secondFeeName={FIELDS.successFee}
            secondFeeLabel={t("asset-settings:fields.success-fee")}
            secondFeeUnderText={t("create-account:settings.hints.success-fee")}
            secondFeeDescription={getSecondDescription({
              maxFee: maxSuccessFee,
              isExchange,
              t,
              asset: ASSET.PROGRAM
            })}
            secondFeeRules={successFeeRules(t, maxSuccessFee)}
          />
        )}
        {asset === ASSET.FUND && (
          <FeesSettings
            firstFeeLabel={t("asset-settings:fields.entry-fee")}
            firstFeeUnderText={t("create-fund-page:settings.hints.entry-fee")}
            firstFeeName={FIELDS.entryFee}
            firstFeeDescription={getFirstDescription({
              t,
              asset: ASSET.FUND,
              maxFee: maxEntryFee
            })}
            firstFeeRules={entryFeeRules(t, maxEntryFee)}
            secondFeeName={FIELDS.exitFee}
            secondFeeLabel={t("create-fund-page:settings.fields.exit-fee")}
            secondFeeUnderText={t("create-fund-page:settings.hints.exit-fee")}
            secondFeeDescription={getSecondDescription({
              t,
              asset: ASSET.FUND,
              maxFee: maxExitFee
            })}
            secondFeeRules={exitFeeRules(t, maxExitFee)}
          />
        )}
        <Row size={"large"}>
          <SubmitButton isSuccessful={!editError}>
            {t("asset-settings:buttons.save")}
          </SubmitButton>
        </Row>
      </HookForm>
    </SettingsBlock>
  );
};

const InvestmentFees = React.memo(_InvestmentFees);
export default InvestmentFees;
