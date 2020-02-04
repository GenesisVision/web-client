import { DialogBottom } from "components/dialog/dialog-bottom";
import { DialogButtons } from "components/dialog/dialog-buttons";
import { DialogTop } from "components/dialog/dialog-top";
import GVButton from "components/gv-button";
import GVFormikField from "components/gv-formik-field";
import GVTextField from "components/gv-text-field";
import Select from "components/select/select";
import Tooltip from "components/tooltip/tooltip";
import { TooltipContent } from "components/tooltip/tooltip-content";
import { FormikProps, withFormik } from "formik";
import { SignalDetachMode } from "gv-api-web";
import React from "react";
import { useTranslation } from "react-i18next";
import { compose } from "redux";

const _UnfollowForm: React.FC<Props> = ({
  isExternal,
  handleSubmit,
  isSubmitting
}) => {
  const [t] = useTranslation();
  const modesList = (isExternal && [MODE_NONE]) || Object.keys(modes);
  return (
    <form id="unfollow-form" onSubmit={handleSubmit} noValidate>
      <DialogTop title={t("unfollow-program.title")} />
      <DialogBottom>
        <GVFormikField
          disableIfSingle
          name={FIELDS.mode}
          component={GVTextField}
          label={t("unfollow-program.type")}
          InputComponent={Select}
        >
          {modesList.map((mode: string) => (
            <option
              value={String(modes[mode].value as string)}
              key={String(modes[mode].value)}
            >
              <Tooltip
                render={() => (
                  <TooltipContent>{t(modes[mode].tooltip)}</TooltipContent>
                )}
              >
                <span>{t(modes[mode].label)}</span>
              </Tooltip>
            </option>
          ))}
        </GVFormikField>
        <DialogButtons>
          <GVButton
            wide
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

export const MODE_NONE = "none";
export const MODE_CLOSE_ONLY = "closeOnly";
export const MODE_CLOSE_ALL = "closeAll";

const modes: { [key: string]: mode } = {
  [MODE_NONE]: {
    label: "unfollow-program.modes.manual-closing.label",
    tooltip: "unfollow-program.modes.manual-closing.tooltip",
    value: "None"
  },
  [MODE_CLOSE_ONLY]: {
    label: "unfollow-program.modes.close-only.label",
    tooltip: "unfollow-program.modes.close-only.tooltip",
    value: "ProviderCloseOnly"
  },
  [MODE_CLOSE_ALL]: {
    label: "unfollow-program.modes.close-all-immediately.label",
    tooltip: "unfollow-program.modes.close-all-immediately.tooltip",
    value: "CloseAllImmediately"
  }
};

interface OwnProps {
  isExternal: boolean;
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
