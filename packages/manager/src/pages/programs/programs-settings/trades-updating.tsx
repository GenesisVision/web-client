import { FormikProps, withFormik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { compose } from "redux";
import GVButton from "shared/components/gv-button";
import SettingsBlock from "shared/components/settings-block/settings-block";
import { SetSubmittingType } from "shared/utils/types";
import GVTextField from "shared/components/gv-text-field";
import Select from "shared/components/select/select";
import GVFormikField from "shared/components/gv-formik-field";
import { ProgramDetailsFullTradesDelayEnum } from "gv-api-web";
import { DELAYS } from "shared/components/programs/program-details/program-history-section/program-open-positions/program-open-positions";

const _TradesUpdating: React.FC<Props> = ({
  values,
  handleSubmit,
  dirty,
  isValid,
  isSubmitting
}) => {
  const [t] = useTranslation();
  return (
    <SettingsBlock
      label={t("manager.program-settings.trades-update.title")}
      content={
        <form id="edit-form" onSubmit={handleSubmit}>
          <div className="program-settings__block-wrapper create-program-settings__row">
            <GVFormikField
              name={FIELDS.tradesDelay}
              component={GVTextField}
              label={t("manager.program-settings.trades-update.select")}
              InputComponent={Select}
            >
              {DELAYS.map(({ label, value }) => (
                <option value={value} key={value}>
                  {label}
                </option>
              ))}
            </GVFormikField>
          </div>
          <p className="program-settings__text">
            {t("manager.program-settings.trades-update.text")}
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
  tradesDelay = "tradesDelay"
}

export interface TradesUpdatingFormValues {
  [FIELDS.tradesDelay]: ProgramDetailsFullTradesDelayEnum;
}

interface Props extends OwnProps, FormikProps<TradesUpdatingFormValues> {}

interface OwnProps {
  tradesDelay: ProgramDetailsFullTradesDelayEnum;
  onSubmit: (
    values: TradesUpdatingFormValues,
    setSubmitting: SetSubmittingType
  ) => void;
}

const TradesUpdating = compose<React.ComponentType<OwnProps>>(
  withFormik<OwnProps, TradesUpdatingFormValues>({
    enableReinitialize: true,
    displayName: "edit-form",
    mapPropsToValues: ({ tradesDelay }) => ({
      [FIELDS.tradesDelay]: tradesDelay
    }),
    handleSubmit: (values, { props, setSubmitting }) => {
      props.onSubmit(values, setSubmitting);
    }
  }),
  React.memo
)(_TradesUpdating);
export default TradesUpdating;
