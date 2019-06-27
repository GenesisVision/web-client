import {
  LevelsParamsInfo,
  ProgramLevelInfo,
  ProgramsLevelsInfo
} from "gv-api-web";
import { CancelablePromise } from "gv-api-web";
import * as React from "react";
import { ILevelCalculatorProps } from "shared/components/programs/program-details/program-details.types";

import {
  getPlatformLevels,
  getPlatformLevelsParams,
  getProgramLevelsInfo
} from "../../service/level-calculator.service";
import LevelCalculatorPopup from "./level-calculator-popup";
import LevelCalculatorPopupLoader from "./level-calculator-popup.loader";

class LevelCalculatorPopupContainer extends React.PureComponent<
  ILevelCalculatorProps & { onClose(): void },
  State
> {
  programLevelsPromise?: CancelablePromise<void>;
  platformLevelsPromise?: CancelablePromise<void>;
  levelsParamsPromise?: CancelablePromise<void>;

  state: State = {
    programLevelInfo: undefined,
    platformLevels: undefined,
    levelsParams: undefined
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
    this.platformLevelsPromise = getPlatformLevelsParams(
      this.props.currency
    ).then(levelsParams => {
      this.setState({ levelsParams });
    });
  }

  componentWillUnmount() {
    if (this.programLevelsPromise) {
      this.programLevelsPromise.cancel();
    }
    if (this.platformLevelsPromise) {
      this.platformLevelsPromise.cancel();
    }
    if (this.levelsParamsPromise) {
      this.levelsParamsPromise.cancel();
    }
  }

  render() {
    const { id, title, currency, onClose } = this.props;
    const { programLevelInfo, levelsParams, platformLevels } = this.state;
    const isDataReady =
      !!programLevelInfo && !!levelsParams && !!platformLevels;
    return (
      <LevelCalculatorPopup
        condition={isDataReady}
        loader={<LevelCalculatorPopupLoader />}
        id={id}
        title={title}
        currency={currency}
        programLevelInfo={programLevelInfo!}
        levelsParams={levelsParams!}
        platformLevels={platformLevels!}
        onClose={onClose}
      />
    );
  }
}

export default LevelCalculatorPopupContainer;

interface State {
  programLevelInfo?: ProgramLevelInfo;
  platformLevels?: ProgramsLevelsInfo;
  levelsParams?: LevelsParamsInfo;
}
