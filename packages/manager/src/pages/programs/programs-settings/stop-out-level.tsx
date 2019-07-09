import { FormikProps, withFormik } from "formik";
import React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import GVButton from "shared/components/gv-button";
import GVFormikField from "shared/components/gv-formik-field";
import GVTextField from "shared/components/gv-text-field";
import { SetSubmittingType } from "shared/utils/types";
import { number, object } from "yup";

const _StopOutLevel: React.FC<Props> = ({
  t,
  values,
  handleSubmit,
  dirty,
  isValid,
  isSubmitting
}) => (
  <form id="edit-form" onSubmit={handleSubmit}>
    <div className="program-edit__block-wrapper">
      <h3>{t("manager.create-program-page.settings.fields.stop-out-level")}</h3>
      <div className="create-program-settings__item">
        <GVFormikField
          name={FIELDS.stopOutLevel}
          label={t(
            "manager.create-program-page.settings.fields.stop-out-level"
          )}
          adornment="%"
          component={GVTextField}
          type="number"
          autoComplete="off"
          decimalScale={4}
        />
      </div>
      <GVButton
        color="primary"
        type={"submit"}
        className="invest-form__submit-button"
        disabled={!dirty || !isValid || isSubmitting}
      >
        {t("manager.program-settings.buttons.save")}
      </GVButton>
    </div>
  </form>
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
            t(
              "manager.create-program-page.settings.validation.stop-out-less-ten"
            )
          )
          .max(
            stopOutLevel || 100,
            t(
              "manager.create-program-page.settings.validation.stop-out-more-current"
            )
          )
      }),
    handleSubmit: (values, { props, setSubmitting }) => {
      props.onSubmit(values, setSubmitting);
    }
  }),
  React.memo
)(_StopOutLevel);
export default StopOutLevel;
