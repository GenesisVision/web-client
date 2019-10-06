import { FormikProps, withFormik } from "formik";
import { DetachFromSignalProviderModeEnum } from "gv-api-web";
import React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import { DialogTop } from "shared/components/dialog/dialog-top";
import GVButton from "shared/components/gv-button";
import GVFormikField from "shared/components/gv-formik-field";
import GVTextField from "shared/components/gv-text-field";
import Select from "shared/components/select/select";
import Tooltip from "shared/components/tooltip/tooltip";

const _ProgramUnfollowForm: React.FC<Props> = ({
  t,
  onSubmit,
  handleSubmit,
  isSubmitting
}) => (
  <form id="unfollow-form" onSubmit={handleSubmit} noValidate>
    <DialogTop title={t("unfollow-program.title")} />
    <div className="dialog__bottom">
      <GVFormikField
        name={FIELDS.mode}
        component={GVTextField}
        label={t("unfollow-program.type")}
        InputComponent={Select}
      >
        {Object.keys(modes).map((mode: string) => (
          <option value={modes[mode].value} key={modes[mode].value}>
            <Tooltip
              render={() => (
                <div className="tooltip__content">{t(modes[mode].tooltip)}</div>
              )}
            >
              <span>{t(modes[mode].label)}</span>
            </Tooltip>
          </option>
        ))}
      </GVFormikField>
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
  tooltip: string;
  value: DetachFromSignalProviderModeEnum;
};

const modes: { [key: string]: mode } = {
  none: {
    label: "unfollow-program.modes.manual-closing.label",
    tooltip: "unfollow-program.modes.manual-closing.tooltip",
    value: "None"
  },
  closeOnly: {
    label: "unfollow-program.modes.close-only.label",
    tooltip: "unfollow-program.modes.close-only.tooltip",
    value: "ProviderCloseOnly"
  },
  closeAll: {
    label: "unfollow-program.modes.close-all-immediately.label",
    tooltip: "unfollow-program.modes.close-all-immediately.tooltip",
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
  extends WithTranslation,
    OwnProps,
    FormikProps<IProgramUnfollowFormValues> {}
