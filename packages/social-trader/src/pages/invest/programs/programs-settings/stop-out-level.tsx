import StopOutField from "components/assets/fields/stop-out-field";
import { Row } from "components/row/row";
import SettingsBlock from "components/settings-block/settings-block";
import { SubmitButton } from "components/submit-button/submit-button";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { HookForm } from "utils/hook-form.helpers";

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
    mode: "onBlur"
  });

  return (
    <SettingsBlock label={t("asset-settings:fields.stop-out-level")}>
      <HookForm resetOnSuccess form={form} onSubmit={onSubmit}>
        <StopOutField currentValue={stopOutLevel} name={FIELDS.stopOutLevel} />
        <Row size={"large"}>
          <SubmitButton isSuccessful={!editError}>
            {t("asset-settings:buttons.save")}
          </SubmitButton>
        </Row>
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
