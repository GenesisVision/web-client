import GVSwitch from "components/gv-switch";
import { Row } from "components/row/row";
import SettingsBlock from "components/settings-block/settings-block";
import { SignalingEditFormContainer } from "modules/signaling-edit-form/signaling-edit-form.container";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

const _SignalingEdit: React.FC<Props> = ({
  canMakeSignal,
  onApply,
  signalSuccessFee,
  signalVolumeFee,
  id,
  isSignalProgram
}) => {
  const [t] = useTranslation();
  const [isSignal, setIsSignal] = useState<boolean>(isSignalProgram);
  const changeIsSignal = useCallback(() => setIsSignal(!isSignal), [isSignal]);
  return (
    <SettingsBlock label={t("program-settings.signaling-program.title")}>
      <div>
        {!isSignalProgram && canMakeSignal && (
          <GVSwitch
            touched={false}
            name={"isSignal"}
            value={isSignal}
            color="primary"
            onChange={changeIsSignal}
          />
        )}
        <Row>
          <SignalingEditFormContainer
            id={id}
            showFields={isSignal}
            onApply={onApply}
            successFee={signalSuccessFee}
            volumeFee={signalVolumeFee}
          />
        </Row>
      </div>
    </SettingsBlock>
  );
};

interface Props {
  canMakeSignal?: boolean;
  id: string;
  onApply: VoidFunction;
  isSignalProgram: boolean;
  signalSuccessFee?: number;
  signalVolumeFee?: number;
}

const SignalingEdit = React.memo(_SignalingEdit);
export default SignalingEdit;
