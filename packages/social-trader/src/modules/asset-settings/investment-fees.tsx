import FeesSettings from "components/create-asset/fields/fees-settings";
import { FormikProps, withFormik } from "formik";
import { ProgramsInfoOld } from "gv-api-web";
import React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import GVButton from "shared/components/gv-button";
import SettingsBlock from "shared/components/settings-block/settings-block";
import { ASSET } from "shared/constants/constants";
import { SetSubmittingType } from "shared/utils/types";
import {
  entryFeeShape,
  exitFeeShape,
  successFeeShape
} from "shared/utils/validators/validators";
import { number, object } from "yup";

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
      label={t(
        `create-${asset.toLowerCase()}-page.settings.investment-${asset.toLowerCase()}-fees`
      )}
    >
      <form id="edit-form" onSubmit={handleSubmit}>
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
              { maxFee: managerMaxEntryFee }
            )}
            secondFeeName={FIELDS.exitFee}
            secondFeeLabel={t(
              "create-fund-page.settings.fields.exit-fee"
            )}
            secondFeeUnderText={t(
              "create-fund-page.settings.hints.exit-fee"
            )}
            secondFeeDescription={t(
              "create-fund-page.settings.hints.exit-fee-description",
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
          {t("program-settings.buttons.save")}
        </GVButton>
      </form>
    </SettingsBlock>
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
  programsInfo: ProgramsInfoOld;
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
    validationSchema: ({ programsInfo, t, asset }: Props) => {
      const exitFee =
        asset === ASSET.FUND
          ? exitFeeShape(t, programsInfo.managerMaxExitFee)
          : number();
      const successFee =
        asset === ASSET.PROGRAM
          ? successFeeShape(t, programsInfo.managerMaxSuccessFee)
          : number();
      return object().shape({
        [FIELDS.entryFee]: entryFeeShape(t, programsInfo.managerMaxEntryFee),
        [FIELDS.exitFee]: exitFee,
        [FIELDS.successFee]: successFee
      });
    },
    handleSubmit: (values, { props, setSubmitting }) => {
      props.onSubmit(values, setSubmitting);
    }
  }),
  React.memo
)(_InvestmentFees);
export default InvestmentFees;
