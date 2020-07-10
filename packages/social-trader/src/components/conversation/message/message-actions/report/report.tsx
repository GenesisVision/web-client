import { DialogButtons } from "components/dialog/dialog-buttons";
import { GVHookFormField } from "components/gv-hook-form-field";
import { RadioButton } from "components/radio-button/radio-button";
import { Row } from "components/row/row";
import { SimpleTextField } from "components/simple-fields/simple-text-field";
import { SubmitButton } from "components/submit-button/submit-button";
import { Text } from "components/text/text";
import { API_REQUEST_STATUS } from "hooks/api-request.hook";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { HookForm } from "utils/hook-form.helpers";

enum FIELDS {
  reason = "reason",
  text = "text"
}

interface IReportFormFormValues {
  [FIELDS.reason]?: string;
  [FIELDS.text]?: string;
}

interface Props {
  errorMessage?: string;
  onSubmit: (values: IReportFormFormValues) => void;
  status: API_REQUEST_STATUS;
}

const ReportReasonFields = [
  "spam",
  "adult-content",
  "misleading-information",
  "fraud",
  "non-original-content",
  "false-news",
  "hate-speech",
  "terrorism"
];

const _Report: React.FC<Props> = ({ errorMessage, onSubmit, status }) => {
  const [t] = useTranslation();

  const form = useForm<IReportFormFormValues>({
    defaultValues: {},
    mode: "onChange"
  });

  const { watch, setValue } = form;
  const { reason, text } = watch();

  const handleClickButton = useCallback(
    (reason: string) => () => {
      setValue(FIELDS.reason, reason, true);
    },
    []
  );

  const disableButton = !reason && !text;

  return (
    <HookForm form={form} onSubmit={onSubmit}>
      <Row>
        <Text muted>
          {t("You can report the post after selecting a problem.")}
        </Text>
      </Row>
      <Row onlyOffset>
        <Row hide>
          <GVHookFormField component={SimpleTextField} name={FIELDS.reason} />
        </Row>
        {ReportReasonFields.map(reasonField => (
          <Row id={reasonField}>
            <RadioButton
              selected={reason === reasonField}
              onClick={handleClickButton(reasonField)}
              label={t(`conversation:report.reasons.${reasonField}`)}
            />
          </Row>
        ))}
      </Row>
      <Row size={"large"}>
        <Text weight={"bold"}>{t("Comment for moderator")}</Text>
      </Row>
      <Row>
        <GVHookFormField
          showCorrect
          wide
          type={"textarea"}
          name={FIELDS.text}
          label={t("Describe the problem in more detail")}
          autoComplete="off"
          component={SimpleTextField}
        />
      </Row>
      <DialogButtons>
        <SubmitButton
          disabled={disableButton}
          wide
          isSuccessful={!errorMessage}
        >
          {t("buttons.confirm")}
        </SubmitButton>
      </DialogButtons>
    </HookForm>
  );
};

export const Report = React.memo(_Report);
