import GVSwitch from "components/gv-selection/gv-switch";
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
        <div className="program-settings__signaling-edit-form-title-block">
          {!isSignalProgram && canMakeSignal && (
            <GVSwitch
              touched={false}
              className="notification-setting__switch"
              name={"isSignal"}
              value={isSignal}
              color="primary"
              onChange={changeIsSignal}
            />
          )}
        </div>
        <SignalingEditFormContainer
          id={id}
          showFields={isSignal}
          onApply={onApply}
          successFee={signalSuccessFee}
          volumeFee={signalVolumeFee}
        />
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
