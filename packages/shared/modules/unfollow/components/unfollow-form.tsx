import { FormikProps, withFormik } from "formik";
import { SignalDetachMode } from "gv-api-web";
import React from "react";
import { useTranslation } from "react-i18next";
import { compose } from "redux";
import { DialogBottom } from "shared/components/dialog/dialog-bottom";
import { DialogButtons } from "shared/components/dialog/dialog-buttons";
import { DialogTop } from "shared/components/dialog/dialog-top";
import GVButton from "shared/components/gv-button";
import GVFormikField from "shared/components/gv-formik-field";
import GVTextField from "shared/components/gv-text-field";
import Select from "shared/components/select/select";
import Tooltip from "shared/components/tooltip/tooltip";

const _UnfollowForm: React.FC<Props> = ({
  onSubmit,
  handleSubmit,
  isSubmitting
}) => {
  const [t] = useTranslation();
  return (
    <form id="unfollow-form" onSubmit={handleSubmit} noValidate>
      <DialogTop title={t("unfollow-program.title")} />
      <DialogBottom>
        <GVFormikField
          name={FIELDS.mode}
          component={GVTextField}
          label={t("unfollow-program.type")}
          InputComponent={Select}
        >
          {Object.keys(modes).map((mode: string) => (
            <option
              value={String(modes[mode].value as string)}
              key={String(modes[mode].value)}
            >
              <Tooltip
                render={() => (
                  <div className="tooltip__content">
                    {t(modes[mode].tooltip)}
                  </div>
                )}
              >
                <span>{t(modes[mode].label)}</span>
              </Tooltip>
            </option>
          ))}
        </GVFormikField>
        <DialogButtons>
          <GVButton
            type="submit"
            className="invest-form__submit-button"
            disabled={isSubmitting}
          >
            {t("unfollow-program.submit")}
          </GVButton>
        </DialogButtons>
      </DialogBottom>
    </form>
  );
};

enum FIELDS {
  mode = "mode"
}

type mode = {
  label: string;
  tooltip: string;
  value: SignalDetachMode;
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
  [FIELDS.mode]: SignalDetachMode;
}

interface Props extends OwnProps, FormikProps<IProgramUnfollowFormValues> {}

const UnfollowForm = compose<React.ComponentType<OwnProps>>(
  withFormik<OwnProps, IProgramUnfollowFormValues>({
    displayName: "confirm-form",
    mapPropsToValues: () => ({
      [FIELDS.mode]: modes.none.value as SignalDetachMode
    }),
    handleSubmit: (values, { props }) => {
      props.onSubmit(values);
    }
  }),
  React.memo
)(_UnfollowForm);
export default UnfollowForm;
