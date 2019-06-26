import {
  LevelsParamsInfo,
  ProgramLevelInfo,
  ProgramsLevelsInfo
} from "gv-api-web";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { compose } from "redux";
import { ILevelCalculatorProps } from "shared/components/programs/program-details/program-details.types";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import withLoader, { WithLoaderProps } from "shared/decorators/with-loader";
import { formatCurrencyValue } from "shared/utils/formatter";

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
    return (
      <div className="level-calculator-popup">
        <h2>Calculator</h2>
        <div className="level-calculator-popup__program-name">
          <div>Program</div>
          <div>{title}</div>
        </div>
        <div className="level-calculator-popup__controls">
          <div>
            Genesis Ratio: {genesisRatio} from: {levelsParams.genesisRatioMin}{" "}
            to:{levelsParams.genesisRatioMax}
          </div>
          <div>
            Age: {programAge} from {0} to {levelsParams.programAgeMax}
          </div>
          <div>
            Weighted volume scale: {weightedVolumeScale} from{" "}
            {levelsParams.volumeScaleMin} to {levelsParams.volumeScaleMax}
          </div>
          <div>
            Manager balance: {managerBalance} from{" "}
            {levelsParams.minAvailableToInvest} to{" "}
            {levelsParams.maxAvailableToInvest}
          </div>
        </div>
        <hr />
        <div className="level-calculator-popup__controls">
          <StatisticItem label={"Current av.to invest"} big accent>
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
          <StatisticItem label={"Investment Scale"} big accent>
            <NumberFormat
              value={programLevelInfo.investmentScale}
              displayType="text"
            />
          </StatisticItem>
          <StatisticItem label={"Investment Scale"} big accent>
            <NumberFormat value={investmentScale} displayType="text" />
          </StatisticItem>
          <StatisticItem label={"New Av. to invest"} big accent>
            <NumberFormat
              value={formatCurrencyValue(newAvailableToInvest, currency)}
              thousandSeparator={" "}
              displayType="text"
              suffix={` ${currency}`}
            />
          </StatisticItem>
        </div>
        <div className="level-calculator-popup__level-progress">3</div>
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
}
