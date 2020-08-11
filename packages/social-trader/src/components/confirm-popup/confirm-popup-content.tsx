import { Button } from "components/button/button";
import { IDialogProps } from "components/dialog/dialog";
import { DialogBottom } from "components/dialog/dialog-bottom";
import { DialogButtons } from "components/dialog/dialog-buttons";
import { DialogTop } from "components/dialog/dialog-top";
import { Row } from "components/row/row";
import { SubmitButton } from "components/submit-button/submit-button";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { HookForm } from "utils/hook-form.helpers";

export interface IConfirmPopupContentProps extends IDialogProps {
  errorMessage?: string;
  onApply: () => void;
  onCancel?: () => void;
  header?: string;
  body?: React.ReactNode;
  applyButtonText?: string;
  cancelButtonText?: string;
  disabled?: boolean;
}

const _ConfirmPopupContent: React.ComponentType<IConfirmPopupContentProps> = ({
  errorMessage,
  onApply,
  onCancel,
  header,
  body,
  applyButtonText,
  cancelButtonText
}) => {
  const [t] = useTranslation();
  const form = useForm();

  return (
    <HookForm form={form} onSubmit={onApply}>
      <DialogTop title={header} />
      <DialogBottom>
        <Row onlyOffset>{body}</Row>
        <DialogButtons>
          <SubmitButton
            checkDirty={false}
            checkValid={false}
            wide={!onCancel}
            isSuccessful={!errorMessage}
          >
            {applyButtonText || t("buttons.apply")}
          </SubmitButton>
          {onCancel && (
            <Button color="secondary" variant="outlined" onClick={onCancel}>
              {cancelButtonText || t("buttons.cancel")}
            </Button>
          )}
        </DialogButtons>
      </DialogBottom>
    </HookForm>
  );
};

const ConfirmPopupContent = React.memo(_ConfirmPopupContent);
export default ConfirmPopupContent;
