import StopOutField from "components/assets/fields/stop-out-field";
import GVButton from "components/gv-button";
import SettingsBlock from "components/settings-block/settings-block";
import { FormikProps, withFormik } from "formik";
import React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import { SetSubmittingType } from "utils/types";
import { number, object } from "yup";

const _StopOutLevel: React.FC<Props> = ({
  t,
  handleSubmit,
  dirty,
  isValid,
  isSubmitting
}) => (
  <SettingsBlock
    label={t("create-program-page.settings.fields.stop-out-level")}
  >
    <form id="edit-form" onSubmit={handleSubmit}>
      <div className="program-settings__block-wrapper">
        <StopOutField name={FIELDS.stopOutLevel} />
      </div>
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

enum FIELDS {
  stopOutLevel = "stopOutLevel"
}

export interface StopOutLevelFormValues {
  [FIELDS.stopOutLevel]: number;
}

interface Props
  extends OwnProps,
    WithTranslation,
    FormikProps<StopOutLevelFormValues> {}

interface OwnProps {
  stopOutLevel: number;
  onSubmit: (
    values: StopOutLevelFormValues,
    setSubmitting: SetSubmittingType
  ) => void;
}

const StopOutLevel = compose<React.ComponentType<OwnProps>>(
  translate(),
  withFormik<OwnProps, StopOutLevelFormValues>({
    enableReinitialize: true,
    displayName: "edit-form",
    mapPropsToValues: ({ stopOutLevel }) => ({
      [FIELDS.stopOutLevel]: stopOutLevel || 100
    }),
    validationSchema: ({ t, stopOutLevel }: Props) =>
      object().shape({
        [FIELDS.stopOutLevel]: number()
          .min(
            10,
            t("create-program-page.settings.validation.stop-out-less-ten")
          )
          .max(
            stopOutLevel || 100,
            t("create-program-page.settings.validation.stop-out-more-current")
          )
      }),
    handleSubmit: (values, { props, setSubmitting }) => {
      props.onSubmit(values, setSubmitting);
    }
  }),
  React.memo
)(_StopOutLevel);
export default StopOutLevel;
