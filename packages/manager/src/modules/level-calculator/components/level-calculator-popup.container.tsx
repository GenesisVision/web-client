import { ProgramLevelInfo, ProgramsLevelsInfo } from "gv-api-web";
import * as React from "react";
import { ILevelCalculatorProps } from "shared/components/programs/program-details/program-details.types";

import {
  getPlatformLevels,
  getProgramLevelsInfo
} from "../services/level-calculator.service";
import LevelCalculatorPopup from "./level-calculator-popup";
import LevelCalculatorPopupLoader from "./level-calculator-popup.loader";

class LevelCalculatorPopupContainer extends React.PureComponent<
  ILevelCalculatorProps & { onClose(): void },
  State
> {
  programLevelsPromise?: Promise<void>;
  platformLevelsPromise?: Promise<void>;

  state: State = {
    programLevelInfo: undefined,
    platformLevels: undefined
  };

  componentDidMount() {
    this.programLevelsPromise = getProgramLevelsInfo(this.props.id).then(
      programLevelInfo => {
        this.setState({ programLevelInfo });
      }
    );
    this.platformLevelsPromise = getPlatformLevels(this.props.currency).then(
      platformLevels => {
        this.setState({ platformLevels });
      }
    );
  }

  render() {
    const {
      id,
      title,
      currency,
      levelsParameters,
      onClose,
      isKycConfirmed
    } = this.props;
    const { programLevelInfo, platformLevels } = this.state;
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
  }
}

export default LevelCalculatorPopupContainer;

interface State {
  programLevelInfo?: ProgramLevelInfo;
  platformLevels?: ProgramsLevelsInfo;
}
