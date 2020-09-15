import Processing from "components/assets/fields/processing";
import { Row } from "components/row/row";
import SettingsBlock from "components/settings-block/settings-block";
import { SubmitButton } from "components/submit-button/submit-button";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { HookForm } from "utils/hook-form.helpers";

enum FIELDS {
  isProcessingRealTime = "isProcessingRealTime",
  hourProcessing = "hourProcessing"
}

interface IChangeProcessingFormFields {
  [FIELDS.isProcessingRealTime]?: boolean;
  [FIELDS.hourProcessing]?: number;
}

export interface IChangeProcessingProps {
  editError?: boolean;
  isProcessingRealTimeCurrent?: boolean;
  onSubmit: (data: IChangeProcessingFormFields) => void;
}

const _ChangeProcessing: React.FC<IChangeProcessingProps> = ({
  editError,
  onSubmit,
  isProcessingRealTimeCurrent
}) => {
  const [t] = useTranslation();
  const form = useForm<IChangeProcessingFormFields>({
    defaultValues: {
      [FIELDS.hourProcessing]: 0,
      [FIELDS.isProcessingRealTime]: isProcessingRealTimeCurrent
    },
    mode: "onChange"
  });
  const { isProcessingRealTime } = form.watch();
  return (
    <SettingsBlock label={t("asset-settings:fields.processing")}>
      <HookForm resetOnSuccess form={form} onSubmit={onSubmit}>
        <Processing
          wide={false}
          realtimeValue={isProcessingRealTime}
          checkboxName={FIELDS.isProcessingRealTime}
          selectName={FIELDS.hourProcessing}
        />
        <Row size={"large"}>
          <SubmitButton isSuccessful={!editError}>
            {t("asset-settings:buttons.save")}
          </SubmitButton>
        </Row>
      </HookForm>
    </SettingsBlock>
  );
};

export const ChangeProcessing = React.memo(_ChangeProcessing);
