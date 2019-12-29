import { ProgramLevelInfo, ProgramsLevelsInfo } from "gv-api-web";
import * as React from "react";
import { useEffect, useState } from "react";
import { ILevelCalculatorProps } from "shared/components/programs/program-details/program-details.types";

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
    const getProgramLevelsInfoPromise = getProgramLevelsInfo(id).then(
      setProgramLevelInfo
    );
    const getPlatformLevelsPromise = getPlatformLevels(currency).then(
      setPlatformLevelsInfo
    );
    return () => {
      getProgramLevelsInfoPromise.cancel();
      getPlatformLevelsPromise.cancel();
    };
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
