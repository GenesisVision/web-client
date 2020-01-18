import { ProgramLevelInfo, ProgramsLevelsInfo } from "gv-api-web";
import { ILevelCalculatorProps } from "pages/invest/programs/program-details/program-details.types";
import * as React from "react";
import { useEffect, useState } from "react";

import {
  getPlatformLevels,
  getProgramLevelsInfo
} from "../services/level-calculator.service";
import LevelCalculatorPopup from "./level-calculator-popup";
import LevelCalculatorPopupLoader from "./level-calculator-popup.loader";

const _LevelCalculatorPopupContainer: React.FC<
  ILevelCalculatorProps & { onClose(): void }
> = ({ id, title, currency, levelsParameters, onClose, isKycConfirmed }) => {
  const [programLevelInfo, setProgramLevelInfo] = useState<
    ProgramLevelInfo | undefined
  >(undefined);
  const [platformLevels, setPlatformLevelsInfo] = useState<
    ProgramsLevelsInfo | undefined
  >(undefined);
  useEffect(() => {
    const abortController = new AbortController();
    getProgramLevelsInfo(id, abortController.signal).then(setProgramLevelInfo);
    getPlatformLevels(currency, abortController.signal).then(
      setPlatformLevelsInfo
    );
    return () => abortController.abort();
  }, []);

  const isDataReady = !!programLevelInfo && !!platformLevels;
  return (
    <LevelCalculatorPopup
      condition={isDataReady}
      loader={<LevelCalculatorPopupLoader />}
      id={id}
      title={title}
      currency={currency}
      programLevelInfo={programLevelInfo!}
      levelsParameters={levelsParameters}
      platformLevels={platformLevels!}
      onClose={onClose}
      isKycConfirmed={isKycConfirmed}
    />
  );
};

const LevelCalculatorPopupContainer = React.memo(
  _LevelCalculatorPopupContainer
);
export default LevelCalculatorPopupContainer;
