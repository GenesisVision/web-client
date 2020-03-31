import useApiRequest from "hooks/api-request.hook";
import SignalingEdit, {
  IProgramSignalFormValues
} from "modules/signaling-edit-form/signaling-edit";
import { editSignal } from "modules/signaling-edit-form/signaling-edit-form.service";
import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { createFollowInfoSelector } from "reducers/platform-reducer";

const _SignalingEditFormContainer: React.FC<Props> = ({
  inDialog,
  id,
  onApply = () => {},
  showFields = true,
  successFee,
  volumeFee
}) => {
  const followInfo = useSelector(createFollowInfoSelector);
  const { sendRequest: editSignalRequest, errorMessage } = useApiRequest({
    middleware: [onApply],
    request: editSignal,
    successMessage: "program-edit-signal.success-alert-message"
  });
  const changeSignaling = useCallback(
    ({ volumeFee, successFee }: IProgramSignalFormValues) =>
      editSignalRequest({
        id,
        successFee,
        volumeFee
      }),
    [id]
  );
  return (
    <SignalingEdit
      editError={!!errorMessage}
      followInfo={followInfo}
      inDialog={inDialog}
      showFields={showFields}
      successFee={successFee}
      volumeFee={volumeFee}
      onSubmit={changeSignaling}
    />
  );
};

interface Props {
  inDialog?: boolean;
  id: string;
  showFields?: boolean;
  successFee?: number;
  volumeFee?: number;
  onApply?: VoidFunction;
}

export const SignalingEditFormContainer = React.memo(
  _SignalingEditFormContainer
);
