import FeesSettings from "components/assets/fields/fees-settings";
import GVButton from "components/gv-button";
import SettingsBlock from "components/settings-block/settings-block";
import { ASSET } from "constants/constants";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { HookForm } from "utils/hook-form.helpers";
import {
  entryFeeShape,
  exitFeeShape,
  successFeeShape
} from "utils/validators/validators";
import { number, object } from "yup";

enum FIELDS {
  exitFee = "exitFee",
  entryFee = "entryFee",
  successFee = "successFee"
}

const _InvestmentFees: React.FC<Props> = ({
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

  const form = useForm<InvesmentLimitFormValues>({
    defaultValues: {
      [FIELDS.exitFee]: exitFee,
      [FIELDS.entryFee]: entryFee,
      [FIELDS.successFee]: successFee
    },
    validationSchema: object().shape({
      [FIELDS.entryFee]: entryFeeShape(t, maxEntryFee),
      [FIELDS.exitFee]:
        asset === ASSET.FUND ? exitFeeShape(t, maxExitFee) : number(),
      [FIELDS.successFee]:
        asset === ASSET.PROGRAM ? successFeeShape(t, maxSuccessFee) : number()
    }),
    mode: "onBlur"
  });
  const {
    formState: { isValid, dirty, isSubmitting, isSubmitted }
  } = form;

  const isSuccessful = isSubmitted && !editError;
  const disabled = !isValid || !dirty || isSubmitting || isSuccessful;
  return (
    <SettingsBlock
      label={t(
        `create-${asset.toLowerCase()}-page.settings.investment-${asset.toLowerCase()}-fees`
      )}
    >
      <HookForm resetOnSuccess form={form} onSubmit={onSubmit}>
        {asset === ASSET.PROGRAM && (
          <FeesSettings
            entryFeeName={FIELDS.entryFee}
            entryFeeDescription={t(
              "create-program-page.settings.hints.entry-fee-description"
            )}
            secondFeeName={FIELDS.successFee}
            secondFeeLabel={t(
              "create-program-page.settings.fields.success-fee"
            )}
            secondFeeUnderText={t(
              "create-program-page.settings.hints.success-fee"
            )}
            secondFeeDescription={t(
              "create-program-page.settings.hints.success-fee-description"
            )}
          />
        )}
        {asset === ASSET.FUND && (
          <FeesSettings
            entryFeeName={FIELDS.entryFee}
            entryFeeDescription={t(
              "create-fund-page.settings.hints.entry-fee-description",
              { maxFee: maxEntryFee }
            )}
            secondFeeName={FIELDS.exitFee}
            secondFeeLabel={t("create-fund-page.settings.fields.exit-fee")}
            secondFeeUnderText={t("create-fund-page.settings.hints.exit-fee")}
            secondFeeDescription={t(
              "create-fund-page.settings.hints.exit-fee-description",
              {
                maxFee: maxExitFee
              }
            )}
          />
        )}
        <GVButton
          color="primary"
          type={"submit"}
          className="invest-form__submit-button"
          isPending={isSubmitting}
          isSuccessful={isSuccessful}
          disabled={disabled}
        >
          {t("program-settings.buttons.save")}
        </GVButton>
      </HookForm>
    </SettingsBlock>
  );
};

export interface InvesmentLimitFormValues {
  [FIELDS.exitFee]?: number;
  [FIELDS.entryFee]: number;
  [FIELDS.successFee]?: number;
}

interface Props {
  editError?: boolean;
  asset: ASSET;
  maxExitFee?: number;
  maxEntryFee?: number;
  maxSuccessFee?: number;
  exitFee?: number;
  entryFee: number;
  successFee?: number;
  onSubmit: (values: InvesmentLimitFormValues) => void;
}

const InvestmentFees = React.memo(_InvestmentFees);
export default InvestmentFees;
