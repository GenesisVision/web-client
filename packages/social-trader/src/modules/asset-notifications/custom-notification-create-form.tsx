import { DialogBottom } from "components/dialog/dialog-bottom";
import { DialogButtons } from "components/dialog/dialog-buttons";
import { DialogError } from "components/dialog/dialog-error";
import { DialogTop } from "components/dialog/dialog-top";
import { GVHookFormField } from "components/gv-hook-form-field";
import { Row } from "components/row/row";
import Select from "components/select/select";
import { SimpleNumberField } from "components/simple-fields/simple-number-field";
import { SimpleTextField } from "components/simple-fields/simple-text-field";
import { SubmitButton } from "components/submit-button/submit-button";
import {
  NotificationSettingConditionType,
  NotificationType,
  ProgramNotificationSettingList
} from "gv-api-web";
import * as React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { NumberFormatValues } from "react-number-format";
import { HookForm } from "utils/hook-form.helpers";

enum FIELDS {
  type = "type",
  conditionType = "conditionType",
  conditionAmount = "conditionAmount"
}

enum CONDITION_TYPE_VALUES {
  Profit = "Profit",
  Level = "Level",
  AvailableToInvest = "AvailableToInvest"
}

interface Props {
  asset: ProgramNotificationSettingList;
  onSubmit: (values: ICustomNotificationCreateFormValues) => void;
  errorMessage?: string;
}

export interface ICustomNotificationCreateFormValues {
  [FIELDS.type]: NotificationType;
  [FIELDS.conditionType]: NotificationSettingConditionType;
  [FIELDS.conditionAmount]?: number;
}

const _CustomNotificationCreateForm: React.FC<Props> = ({
  onSubmit,
  errorMessage,
  asset
}) => {
  const [t] = useTranslation();
  const form = useForm<ICustomNotificationCreateFormValues>({
    defaultValues: {
      [FIELDS.type]: "ProgramCondition",
      [FIELDS.conditionType]: CONDITION_TYPE_VALUES.Profit,
      [FIELDS.conditionAmount]: undefined
    },
    mode: "onChange"
  });

  const { watch } = form;

  const { conditionType } = watch();

  const isProfit = conditionType === CONDITION_TYPE_VALUES.Profit;
  const isLevel = conditionType === CONDITION_TYPE_VALUES.Level;
  return (
    <>
      <DialogTop
        title={t("notifications-page:create.title")}
        subtitle={asset.title}
      />
      <DialogBottom>
        <HookForm form={form} onSubmit={onSubmit}>
          <Row size={"large"}>
            <GVHookFormField
              wide
              name={FIELDS.conditionType}
              component={SimpleTextField}
              label={t("notifications-page:create.type-label")}
              InputComponent={Select}
            >
              <option value={CONDITION_TYPE_VALUES.Profit}>
                {t("notifications-page:create.Profit.title")}
              </option>
              <option value={CONDITION_TYPE_VALUES.Level}>
                {t("notifications-page:create.Level.title")}
              </option>
              <option value={CONDITION_TYPE_VALUES.AvailableToInvest}>
                {t("notifications-page:create.AvailableToInvest.title")}
              </option>
            </GVHookFormField>
          </Row>
          <Row>
            <GVHookFormField
              wide
              name={FIELDS.conditionAmount}
              label={t("notifications-page:create.amount-label")}
              component={SimpleNumberField}
              adornment={isProfit ? "%" : null}
              autoComplete="off"
              isAllowed={(values: NumberFormatValues) => {
                const { floatValue, formattedValue } = values;
                if (isProfit) {
                  return (
                    formattedValue === "" ||
                    (floatValue > 0 && floatValue <= 1000)
                  );
                }
                if (isLevel) {
                  return (
                    formattedValue === "" || (floatValue > 0 && floatValue <= 7)
                  );
                }
                return true;
              }}
              rules={{
                required: t("notifications-page:create.amount-required")
              }}
            />
          </Row>
          <DialogError error={errorMessage} />
          <DialogButtons>
            <SubmitButton wide isSuccessful={!errorMessage}>
              {t("buttons.create")}
            </SubmitButton>
          </DialogButtons>
        </HookForm>
      </DialogBottom>
    </>
  );
};

const CustomNotificationCreateForm = React.memo(_CustomNotificationCreateForm);
export default CustomNotificationCreateForm;
