import StopOutField from "components/assets/fields/stop-out-field";
import GVButton from "components/gv-button";
import SettingsBlock from "components/settings-block/settings-block";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { HookForm } from "utils/hook-form.helpers";
import { number, object } from "yup";

enum FIELDS {
  stopOutLevel = "stopOutLevel"
}

const _StopOutLevel: React.FC<Props> = ({
  stopOutLevel,
  editError,
  onSubmit
}) => {
  const [t] = useTranslation();

  const form = useForm<StopOutLevelFormValues>({
    defaultValues: {
      [FIELDS.stopOutLevel]: stopOutLevel || 100
    },
    validationSchema: object().shape({
      [FIELDS.stopOutLevel]: number()
        .min(10, t("create-program-page.settings.validation.stop-out-less-ten"))
        .max(
          stopOutLevel || 100,
          t("create-program-page.settings.validation.stop-out-more-current")
        )
    }),
    mode: "onBlur"
  });
  const {
    formState: { isValid, dirty, isSubmitting, isSubmitted }
  } = form;

  const isSuccessful = isSubmitted && !editError;
  const disabled = !isValid || !dirty || isSubmitting || isSuccessful;
  return (
    <SettingsBlock
      label={t("create-program-page.settings.fields.stop-out-level")}
    >
      <HookForm form={form} onSubmit={onSubmit}>
        <div className="program-settings__block-wrapper">
          <StopOutField name={FIELDS.stopOutLevel} />
        </div>
        <GVButton
          color="primary"
          type={"submit"}
          className="invest-form__submit-button"
          isPending={isSubmitting}
          isSuccessful={isSuccessful}
          disabled={disabled}
        >
          {t("program-settings.buttons.save")}
        </GVButton>
      </HookForm>
    </SettingsBlock>
  );
};

export interface StopOutLevelFormValues {
  [FIELDS.stopOutLevel]: number;
}

interface Props {
  editError?: boolean;
  stopOutLevel: number;
  onSubmit: (values: StopOutLevelFormValues) => void;
}

const StopOutLevel = React.memo(_StopOutLevel);
export default StopOutLevel;
