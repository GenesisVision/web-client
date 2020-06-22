import { DialogBottom } from "components/dialog/dialog-bottom";
import { DialogTop } from "components/dialog/dialog-top";
import { SignalingEditFormContainer } from "modules/signaling-edit-form/signaling-edit-form.container";
import * as React from "react";
import { useTranslation } from "react-i18next";

const _ProgramSignalForm: React.FC<Props> = ({
  successFee,
  volumeFee,
  id,
  onApply,
  programName
}) => {
  const [t] = useTranslation();
  return (
    <>
      <DialogTop
        title={t("dashboard-page:trading.actions.make-signal")}
        subtitle={programName}
      />
      <DialogBottom>
        <SignalingEditFormContainer
          inDialog
          id={id}
          onApply={onApply}
          successFee={successFee}
          volumeFee={volumeFee}
        />
      </DialogBottom>
    </>
  );
};

interface Props {
  id: string;
  onApply: VoidFunction;
  programName: string;
  successFee?: number;
  volumeFee?: number;
}

const ProgramSignalForm = React.memo(_ProgramSignalForm);
export default ProgramSignalForm;
