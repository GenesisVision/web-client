import {
  LevelsParamsInfo,
  ProgramLevelInfo,
  ProgramsLevelsInfo
} from "gv-api-web";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { compose } from "redux";
import CalculatorLevelLine from "shared/components/calculator-level/calculator-level-line/calculator-level-line";
import CalculatorSlider from "shared/components/calculator-level/calculator-slider/calculator-slider";
import { ILevelCalculatorProps } from "shared/components/programs/program-details/program-details.types";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import withLoader, { WithLoaderProps } from "shared/decorators/with-loader";
import { formatCurrencyValue, formatValue } from "shared/utils/formatter";

class _LevelCalculatorPopup extends React.PureComponent<Props, State> {
  getDefaultValues = () => {
    const { programLevelInfo, levelsParams } = this.props;
    return {
      genesisRatio: programLevelInfo.genesisRatio,
      programAge: Math.min(
        programLevelInfo.programAge,
        levelsParams.programAgeMax
      ),
      weightedVolumeScale: programLevelInfo.weightedVolumeScale,
      managerBalance: Math.min(
        programLevelInfo.managerBalance,
        levelsParams.maxAvailableToInvest
      )
    };
  };

  state = this.getDefaultValues();

  lerp = (from: number, to: number, progress: number) =>
    from * (1 - progress) + to * progress;

  calcInvestmentScale = () => {
    const progress =
      Math.min(
        this.state.programAge * this.state.weightedVolumeScale,
        this.props.levelsParams.ageByVolumeMax
      ) / this.props.levelsParams.ageByVolumeMax;
    return this.lerp(
      this.props.levelsParams.investmentScaleMin,
      this.props.levelsParams.investmentScaleMax,
      progress
    );
  };

  calcNewAvailableToInvest = (investmentScale: number) => {
    let newAvailableToInvest = this.state.managerBalance;
    if (this.state.genesisRatio >= this.props.levelsParams.genesisRatioHighRisk)
      newAvailableToInvest *= investmentScale;

    return Math.max(
      Math.min(
        newAvailableToInvest,
        this.props.levelsParams.maxAvailableToInvest
      ),
      this.props.levelsParams.minAvailableToInvest
    );
  };

  calcLevel = (avToInvest: number) => {
    const { levels } = this.props.platformLevels;
    let maxLevelIdx = levels.findIndex(x => x.investmentLimit > avToInvest);
    if (maxLevelIdx === -1) maxLevelIdx = levels.length - 1;
    const minLevelIdx = Math.max(0, maxLevelIdx - 1);
    const progress =
      ((avToInvest - levels[minLevelIdx].investmentLimit) /
        (levels[maxLevelIdx].investmentLimit -
          levels[minLevelIdx].investmentLimit)) *
      100;
    return [levels[minLevelIdx].level, progress];
  };

  handleSliderChange = (name: string, value: number) => {
    this.setState({ [name]: value } as any);
  };

  render() {
    const { title, currency, programLevelInfo, levelsParams } = this.props;
    const {
      genesisRatio,
      programAge,
      weightedVolumeScale,
      managerBalance
    } = this.state;

    const investmentScale = this.calcInvestmentScale();
    const newAvailableToInvest = this.calcNewAvailableToInvest(investmentScale);
    const [level, progress] = this.calcLevel(newAvailableToInvest);

    return (
      <div className="level-calculator-popup">
        <h2>Calculator</h2>
        <div className="level-calculator-popup__program-name">
          <div>Program</div>
          <div>{title}</div>
        </div>
        <div className="level-calculator-popup__controls">
          <CalculatorSlider
            name="genesisRatio"
            className="level-calculator-popup__calculator-slider"
            title="Genesis Ratio"
            defaultValue={genesisRatio}
            min={levelsParams.genesisRatioMin}
            max={levelsParams.genesisRatioMax}
            step={0.1}
            onChange={this.handleSliderChange}
          />
          <CalculatorSlider
            name="programAge"
            className="level-calculator-popup__calculator-slider"
            title="Age"
            defaultValue={programAge}
            min={0}
            max={levelsParams.programAgeMax}
            maxSuffix="+"
            step={1}
            onChange={this.handleSliderChange}
          />
          <CalculatorSlider
            name="weightedVolumeScale"
            className="level-calculator-popup__calculator-slider"
            title="Weighted volume scale"
            defaultValue={weightedVolumeScale}
            min={levelsParams.volumeScaleMin}
            max={levelsParams.volumeScaleMax}
            step={0.1}
            onChange={this.handleSliderChange}
          />
          <CalculatorSlider
            name="managerBalance"
            className="level-calculator-popup__calculator-slider"
            title="Manager balance"
            defaultValue={managerBalance}
            valueSuffix={` ${currency}`}
            min={levelsParams.minAvailableToInvest}
            max={levelsParams.maxAvailableToInvest}
            step={10}
            onChange={this.handleSliderChange}
          />
        </div>

        <div className="level-calculator-popup__controls">
          <StatisticItem
            className="level-calculator-popup__statistic-item"
            label={"Current av.to invest"}
            big
            accent
          >
            <NumberFormat
              value={formatCurrencyValue(
                programLevelInfo.totalAvailableToInvest,
                currency
              )}
              thousandSeparator={" "}
              displayType="text"
              suffix={` ${currency}`}
            />
          </StatisticItem>
          <StatisticItem
            className="level-calculator-popup__statistic-item"
            label={"Investment Scale"}
            big
            accent
          >
            <NumberFormat
              value={formatValue(programLevelInfo.investmentScale, 2)}
              displayType="text"
            />
          </StatisticItem>
          <StatisticItem
            className="level-calculator-popup__statistic-item"
            label={"New Av. to invest"}
            big
            accent
          >
            <NumberFormat
              value={formatCurrencyValue(newAvailableToInvest, currency)}
              thousandSeparator={" "}
              displayType="text"
              suffix={` ${currency}`}
            />
          </StatisticItem>
          <StatisticItem
            className="level-calculator-popup__statistic-item"
            label={"Investment Scale"}
            big
            accent
          >
            <NumberFormat
              value={formatValue(investmentScale, 2)}
              displayType="text"
            />
          </StatisticItem>
        </div>
        <div className="level-calculator-popup__level-progress">
          <CalculatorLevelLine
            start={0}
            end={7}
            level={level}
            levelProgress={progress}
          />
        </div>
      </div>
    );
  }
}

const LevelCalculatorPopup = compose<
  React.ComponentType<OwnProps & WithLoaderProps>
>(
  withLoader,
  translate()
)(_LevelCalculatorPopup);
export default LevelCalculatorPopup;

interface OwnProps extends ILevelCalculatorProps {
  programLevelInfo: ProgramLevelInfo;
  platformLevels: ProgramsLevelsInfo;
  levelsParams: LevelsParamsInfo;
}

interface Props extends OwnProps, InjectedTranslateProps {}

interface State {
  genesisRatio: number;
  programAge: number;
  weightedVolumeScale: number;
  managerBalance: number;
}
