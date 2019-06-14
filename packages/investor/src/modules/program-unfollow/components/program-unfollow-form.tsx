import { FormikProps, withFormik } from "formik";
import { DetachFromSignalProviderModeEnum } from "gv-api-web";
import React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { compose } from "redux";
import GVButton from "shared/components/gv-button";
import GVFormikField from "shared/components/gv-formik-field";
import GVTextField from "shared/components/gv-text-field";
import Select from "shared/components/select/select";

const _ProgramUnfollowForm: React.FC<Props> = ({
  t,
  onSubmit,
  handleSubmit,
  isSubmitting
}) => (
  <form id="unfollow-form" onSubmit={handleSubmit} noValidate>
    <div className="dialog__top">
      <h2>{t("unfollow-program.title")}</h2>
      <div className="dialog-field">
        <GVFormikField
          name={FIELDS.mode}
          component={GVTextField}
          label={t("unfollow-program.type")}
          InputComponent={Select}
        >
          {Object.keys(modes).map((mode: string) => (
            <option value={modes[mode].value} key={modes[mode].value}>
              {t(modes[mode].label)}
            </option>
          ))}
        </GVFormikField>
      </div>
      <div className="dialog__buttons">
        <GVButton
          type="submit"
          className="invest-form__submit-button"
          disabled={isSubmitting}
        >
          {t("unfollow-program.submit")}
        </GVButton>
      </div>
    </div>
  </form>
);

const ProgramUnfollowForm = compose<React.ComponentType<OwnProps>>(
  translate(),
  withFormik<OwnProps, IProgramUnfollowFormValues>({
    displayName: "confirm-form",
    mapPropsToValues: () => ({
      [FIELDS.mode]: modes.none.value as DetachFromSignalProviderModeEnum
    }),
    handleSubmit: (values, { props }) => {
      props.onSubmit(values);
    }
  }),
  React.memo
)(_ProgramUnfollowForm);

export default ProgramUnfollowForm;

enum FIELDS {
  mode = "mode"
}

type mode = {
  label: string;
  value: DetachFromSignalProviderModeEnum;
};

const modes: { [key: string]: mode } = {
  none: { label: "unfollow-program.modes.manual-closing", value: "None" },
  closeOnly: {
    label: "unfollow-program.modes.close-only",
    value: "ProviderCloseOnly"
  },
  closeAll: {
    label: "unfollow-program.modes.close-all-immediately",
    value: "CloseAllImmediately"
  }
};

interface OwnProps {
  onSubmit: (values: IProgramUnfollowFormValues) => void;
}

export interface IProgramUnfollowFormValues {
  [FIELDS.mode]: DetachFromSignalProviderModeEnum;
}

interface Props
  extends InjectedTranslateProps,
    OwnProps,
    FormikProps<IProgramUnfollowFormValues> {}
