import { FormikProps, withFormik } from "formik";
import { ProgramsInfo } from "gv-api-web";
import React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import FeesSettings from "shared/components/fields/fees-settings";
import GVButton from "shared/components/gv-button";
import SettingsBlock from "shared/components/settings-block/settings-block";
import { ASSET } from "shared/constants/constants";
import { SetSubmittingType } from "shared/utils/types";
import {
  entryFeeShape,
  exitFeeShape,
  successFeeShape
} from "shared/utils/validators/validators";
import { object } from "yup";

const _InvestmentFees: React.FC<Props> = ({
  asset,
  programsInfo: { managerMaxEntryFee, managerMaxExitFee },
  t,
  values,
  handleSubmit,
  dirty,
  isValid,
  isSubmitting
}) => {
  return (
    <SettingsBlock
      label={t("manager.create-program-page.settings.investment-program-fees")}
      content={
        <form id="edit-form" onSubmit={handleSubmit}>
          {asset === ASSET.PROGRAM && (
            <FeesSettings
              entryFeeName={FIELDS.entryFee}
              entryFeeDescription={t(
                "manager.create-program-page.settings.hints.entry-fee-description"
              )}
              secondFeeName={FIELDS.successFee}
              secondFeeLabel={t(
                "manager.create-program-page.settings.fields.success-fee"
              )}
              secondFeeUnderText={t(
                "manager.create-program-page.settings.hints.success-fee"
              )}
              secondFeeDescription={t(
                "manager.create-program-page.settings.hints.success-fee-description"
              )}
            />
          )}
          {asset === ASSET.FUND && (
            <FeesSettings
              entryFeeName={FIELDS.entryFee}
              entryFeeDescription={t(
                "manager.create-fund-page.settings.hints.entry-fee-description",
                { maxFee: managerMaxEntryFee }
              )}
              secondFeeName={FIELDS.exitFee}
              secondFeeLabel={t(
                "manager.create-fund-page.settings.fields.exit-fee"
              )}
              secondFeeUnderText={t(
                "manager.create-fund-page.settings.hints.exit-fee"
              )}
              secondFeeDescription={t(
                "manager.create-fund-page.settings.hints.exit-fee-description",
                {
                  maxFee: managerMaxExitFee
                }
              )}
            />
          )}
          <GVButton
            color="primary"
            type={"submit"}
            className="invest-form__submit-button"
            disabled={!dirty || !isValid || isSubmitting}
          >
            {t("manager.program-settings.buttons.save")}
          </GVButton>
        </form>
      }
    />
  );
};

enum FIELDS {
  exitFee = "exitFee",
  entryFee = "entryFee",
  successFee = "successFee"
}

export interface InvesmentLimitFormValues {
  [FIELDS.exitFee]?: number;
  [FIELDS.entryFee]: number;
  [FIELDS.successFee]?: number;
}

interface Props
  extends OwnProps,
    WithTranslation,
    FormikProps<InvesmentLimitFormValues> {}

interface OwnProps {
  asset: ASSET;
  programsInfo: ProgramsInfo;
  exitFee?: number;
  entryFee: number;
  successFee?: number;
  onSubmit: (
    values: InvesmentLimitFormValues,
    setSubmitting: SetSubmittingType
  ) => void;
}

const InvestmentFees = compose<React.ComponentType<OwnProps>>(
  translate(),
  withFormik<OwnProps, InvesmentLimitFormValues>({
    enableReinitialize: true,
    displayName: "edit-form",
    mapPropsToValues: ({ entryFee, successFee, exitFee }) => ({
      [FIELDS.exitFee]: exitFee,
      [FIELDS.entryFee]: entryFee,
      [FIELDS.successFee]: successFee
    }),
    validationSchema: ({ programsInfo, t }: Props) =>
      object().shape({
        [FIELDS.exitFee]: exitFeeShape(t, programsInfo.managerMaxExitFee),
        [FIELDS.entryFee]: entryFeeShape(t, programsInfo.managerMaxEntryFee),
        [FIELDS.successFee]: successFeeShape(
          t,
          programsInfo.managerMaxSuccessFee
        )
      }),
    handleSubmit: (values, { props, setSubmitting }) => {
      props.onSubmit(values, setSubmitting);
    }
  }),
  React.memo
)(_InvestmentFees);
export default InvestmentFees;
