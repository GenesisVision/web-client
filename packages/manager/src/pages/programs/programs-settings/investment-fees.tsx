import { FormikProps, withFormik } from "formik";
import { ProgramsInfo } from "gv-api-web";
import React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import FeesSettings from "shared/components/fields/fees-settings";
import GVButton from "shared/components/gv-button";
import SettingsBlock from "shared/components/settings-block/settings-block";
import { SetSubmittingType } from "shared/utils/types";
import {
  entryFeeShape,
  successFeeShape
} from "shared/utils/validators/validators";
import { object } from "yup";

const _InvestmentFees: React.FC<Props> = ({
  t,
  values,
  handleSubmit,
  dirty,
  isValid,
  isSubmitting
}) => {
  return (
    <SettingsBlock
      label={t("manager.create-program-page.settings.fields.investment-limit")}
      content={
        <form id="edit-form" onSubmit={handleSubmit}>
          <FeesSettings
            title={t(
              "manager.create-program-page.settings.investment-program-fees"
            )}
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
          <p className="program-settings__text">
            {t("manager.program-settings.investment-limit.text")}
          </p>
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
  entryFee = "entryFee",
  successFee = "successFee"
}

export interface InvesmentLimitFormValues {
  [FIELDS.entryFee]: number;
  [FIELDS.successFee]: number;
}

interface Props
  extends OwnProps,
    WithTranslation,
    FormikProps<InvesmentLimitFormValues> {}

interface OwnProps {
  programsInfo: ProgramsInfo;
  entryFee: number;
  successFee: number;
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
    mapPropsToValues: ({ entryFee, successFee }) => ({
      [FIELDS.entryFee]: entryFee,
      [FIELDS.successFee]: successFee
    }),
    validationSchema: ({ programsInfo, t }: Props) =>
      object().shape({
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
