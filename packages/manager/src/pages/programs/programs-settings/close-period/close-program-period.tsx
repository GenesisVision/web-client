import React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import GVButton from "shared/components/gv-button";
import useIsOpen from "shared/hooks/is-open.hook";

import ConfirmClosePeriodContainer from "./confirm-close-period-container";

const _CloseProgramPeriod: React.FC<Props> = ({ id, t, onApply, canClose }) => {
  const [
    isClosePeriodOpen,
    setClosePeriodOpen,
    setClosePeriodClose
  ] = useIsOpen();
  return (
    <>
      <div className="program-settings__block-wrapper">
        <p className="program-settings__text">
          {t("manager.program-settings.period-and-closing.text-period")}
        </p>
        <GVButton
          color="primary"
          disabled={!canClose}
          onClick={setClosePeriodOpen}
        >
          {t("program-details-page.close-period.title")}
        </GVButton>
      </div>
      <ConfirmClosePeriodContainer
        open={isClosePeriodOpen}
        onClose={setClosePeriodClose}
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

const CloseProgramPeriod = compose<React.ComponentType<OwnProps>>(
  translate(),
  React.memo
)(_CloseProgramPeriod);
export default CloseProgramPeriod;
