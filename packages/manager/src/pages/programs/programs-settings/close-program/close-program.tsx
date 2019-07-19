import React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import GVButton from "shared/components/gv-button";
import useIsOpen from "shared/hooks/is-open.hook";

import ConfirmCloseProgramContainer from "./confirm-close-program-container";

const _CloseProgram: React.FC<Props> = ({ id, t, onApply, canClose }) => {
  const [
    isCloseProgramOpen,
    setCloseProgramOpen,
    setCloseProgramClose
  ] = useIsOpen();
  return (
    <>
      <div className="program-edit__block-wrapper">
        <p className="program-edit__text">
          {t("manager.program-settings.period-and-closing.text-program")}
        </p>
        <GVButton
          color="primary"
          disabled={!canClose}
          onClick={setCloseProgramOpen}
        >
          {t("program-details-page.description.close-program")}
        </GVButton>
      </div>
      <ConfirmCloseProgramContainer
        open={isCloseProgramOpen}
        onClose={setCloseProgramClose}
        onApply={onApply}
        id={id}
      />
    </>
  );
};

interface Props extends OwnProps, WithTranslation {}

interface OwnProps {
  canClose: boolean;
  onApply: () => void;
  id: string;
}

const CloseProgram = compose<React.ComponentType<OwnProps>>(
  translate(),
  React.memo
)(_CloseProgram);
export default CloseProgram;
