import React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";

import CloseProgramPeriod from "./close-period/close-program-period";
import CloseProgram from "./close-program/close-program";
import SettingsBlock from "./settings-block";

const _PeriodAndClosing: React.FC<Props> = ({
  t,
  id,
  canClosePeriod,
  canCloseProgram,
  closePeriod,
  closeProgram
}) => (
  <SettingsBlock
    label={t("manager.program-settings.period-and-closing.title")}
    content={
      <>
        <CloseProgramPeriod
          canClose={canClosePeriod}
          onApply={closePeriod}
          id={id}
        />
        <CloseProgram
          canClose={canCloseProgram}
          onApply={closeProgram}
          id={id}
        />
      </>
    }
  />
);

interface Props extends WithTranslation {
  id: string;
  canClosePeriod: boolean;
  canCloseProgram: boolean;
  closePeriod: () => void;
  closeProgram: () => void;
}

const PeriodAndClosing = translate()(React.memo(_PeriodAndClosing));
export default PeriodAndClosing;
