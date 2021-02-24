import { DialogBottom } from "components/dialog/dialog-bottom";
import { DialogButtons } from "components/dialog/dialog-buttons";
import { DialogTop } from "components/dialog/dialog-top";
import { GVHookFormField } from "components/gv-hook-form-field";
import Select from "components/select/select";
import { SimpleTextField } from "components/simple-fields/simple-text-field";
import { SubmitButton } from "components/submit-button/submit-button";
import Tooltip from "components/tooltip/tooltip";
import { TooltipContent } from "components/tooltip/tooltip-content";
import { SignalDetachMode } from "gv-api-web";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { HookForm } from "utils/hook-form.helpers";

enum FIELDS {
  mode = "mode"
}

const _UnfollowForm: React.FC<Props> = ({
  onSubmit,
  errorMessage,
  isExternal
}) => {
  const [t] = useTranslation();
  const form = useForm<IProgramUnfollowFormValues>({
    defaultValues: {
      [FIELDS.mode]: modes.none.value as SignalDetachMode
    },
    mode: "onBlur"
  });

  const modesList = (isExternal && [MODE_NONE]) || Object.keys(modes);
  return (
    <HookForm form={form} onSubmit={onSubmit}>
      {/* <DialogTop title={t("unfollow-program.title")} /> */}
      <GVHookFormField
        wide
        disableIfSingle
        name={FIELDS.mode}
        component={SimpleTextField}
        label={t("unfollow-program.type")}
        InputComponent={Select}
      >
        {modesList.map((mode: string) => (
          <option value={modes[mode].value} key={modes[mode].value}>
            <Tooltip
              render={() => (
                <TooltipContent>{t(modes[mode].tooltip)}</TooltipContent>
              )}
            >
              <span>{t(modes[mode].label)}</span>
            </Tooltip>
          </option>
        ))}
      </GVHookFormField>
      <DialogButtons>
        <SubmitButton wide checkDirty={false} isSuccessful={!errorMessage}>
          {t("unfollow-program.submit")}
        </SubmitButton>
      </DialogButtons>
    </HookForm>
  );
};

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

interface Props {
  errorMessage?: string;
  isExternal: boolean;
  onSubmit: (values: IProgramUnfollowFormValues) => void;
}

export interface IProgramUnfollowFormValues {
  [FIELDS.mode]: SignalDetachMode;
}

const UnfollowForm = React.memo(_UnfollowForm);
export default UnfollowForm;
