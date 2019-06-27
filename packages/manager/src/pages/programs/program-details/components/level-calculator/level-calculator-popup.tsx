import { ProgramLevelInfo, ProgramsLevelsInfo } from "gv-api-web";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { compose } from "redux";
import CalculatorLevelLine from "shared/components/calculator-level/calculator-level-line/calculator-level-line";
import CalculatorOutput from "shared/components/calculator-level/calculator-output/calculator-output";
import CalculatorSlider from "shared/components/calculator-level/calculator-slider/calculator-slider";
import GVButton from "shared/components/gv-button";
import { CloseIcon } from "shared/components/icon/close-icon";
import { ILevelCalculatorProps } from "shared/components/programs/program-details/program-details.types";
import withLoader, { WithLoaderProps } from "shared/decorators/with-loader";
import { formatCurrencyValue, formatValue } from "shared/utils/formatter";

class _LevelCalculatorPopup extends React.PureComponent<Props, State> {
  getDefaultValues = () => {
    const { programLevelInfo, levelsParameters } = this.props;
    return {
      genesisRatio: programLevelInfo.genesisRatio,
      programAge: Math.min(
        programLevelInfo.programAge,
        levelsParameters.programAgeMax
      ),
      weightedVolumeScale: programLevelInfo.weightedVolumeScale,
      managerBalance: Math.min(
        programLevelInfo.managerBalance,
        levelsParameters.maxAvailableToInvest
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
        this.props.levelsParameters.ageByVolumeMax
      ) / this.props.levelsParameters.ageByVolumeMax;
    return this.lerp(
      this.props.levelsParameters.investmentScaleMin,
      this.props.levelsParameters.investmentScaleMax,
      progress
    );
  };

  calcNewAvailableToInvest = (investmentScale: number) => {
    let newAvailableToInvest = this.state.managerBalance;
    if (
      this.state.genesisRatio >=
      this.props.levelsParameters.genesisRatioHighRisk
    )
      newAvailableToInvest *= investmentScale;

    return Math.max(
      Math.min(
        newAvailableToInvest,
        this.props.levelsParameters.maxAvailableToInvest
      ),
      this.props.levelsParameters.minAvailableToInvest
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

  handleResetForm = () => {
    this.setState(this.getDefaultValues());
  };

  render() {
    const {
      t,
      title,
      currency,
      programLevelInfo,
      levelsParameters,
      onClose,
      isKycConfirmed
    } = this.props;
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
        <div className="level-calculator-popup__header">
          <h2 className="level-calculator-popup__heading">
            {t("manager.level-calculator.title")}
          </h2>
          <div>
            <GVButton
              onClick={this.handleResetForm}
              className="level-calculator-popup__reset-button"
            >
              <span className="level-calculator-popup__reset-button-text">
                {t("buttons.reset")}
              </span>
            </GVButton>
            <GVButton
              className="level-calculator-popup__close-button"
              variant="text"
              color="secondary"
              onClick={onClose}
            >
              <CloseIcon />
            </GVButton>
          </div>
        </div>

        <div className="level-calculator-popup__program-name">
          <div className="level-calculator-popup__program-label">
            {t("manager.level-calculator.program")}
          </div>
          <div className="level-calculator-popup__program-title">{title}</div>
        </div>
        <div className="level-calculator-popup__controls">
          <CalculatorSlider
            name="genesisRatio"
            className="level-calculator-popup__calculator-slider"
            label={t("manager.level-calculator.genesis-ratio")}
            value={genesisRatio}
            min={levelsParameters.genesisRatioMin}
            max={levelsParameters.genesisRatioMax}
            step={0.1}
            onChange={this.handleSliderChange}
          />
          <CalculatorSlider
            name="programAge"
            className="level-calculator-popup__calculator-slider"
            label={t("manager.level-calculator.age")}
            value={programAge}
            min={0}
            max={levelsParameters.programAgeMax}
            maxSuffix="+"
            step={1}
            onChange={this.handleSliderChange}
          />
          <CalculatorSlider
            name="weightedVolumeScale"
            className="level-calculator-popup__calculator-slider"
            label={t("manager.level-calculator.weighted-volume-scale")}
            tooltipContent={t(
              "manager.level-calculator.weighted-volume-scale-tooltip"
            )}
            value={weightedVolumeScale}
            min={levelsParameters.volumeScaleMin}
            max={levelsParameters.volumeScaleMax}
            step={0.1}
            onChange={this.handleSliderChange}
          />
          <CalculatorSlider
            name="managerBalance"
            className="level-calculator-popup__calculator-slider"
            label={t("manager.level-calculator.manager-balance")}
            tooltipContent={t(
              "manager.level-calculator.manager-balance-tooltip"
            )}
            value={+formatValue(managerBalance, 4)}
            valueSuffix={` ${currency}`}
            min={levelsParameters.minAvailableToInvest}
            max={levelsParameters.maxAvailableToInvest}
            step={10}
            onChange={this.handleSliderChange}
          />
        </div>

        <div className="level-calculator-popup__controls">
          <CalculatorOutput
            className="level-calculator-popup__statistic-item"
            label={t("manager.level-calculator.current-av-to-invest")}
            tooltipContent={t(
              "manager.level-calculator.current-av-to-invest-tooltip"
            )}
            value={
              <NumberFormat
                value={formatCurrencyValue(
                  programLevelInfo.totalAvailableToInvest,
                  currency
                )}
                thousandSeparator={" "}
                displayType="text"
                suffix={` ${currency}`}
              />
            }
          />

          <CalculatorOutput
            className="level-calculator-popup__statistic-item"
            label={t("manager.level-calculator.investment-scale")}
            tooltipContent={t(
              "manager.level-calculator.investment-scale-tooltip"
            )}
            value={
              <NumberFormat
                value={formatValue(programLevelInfo.investmentScale, 2)}
                displayType="text"
              />
            }
          />
          <CalculatorOutput
            className="level-calculator-popup__statistic-item"
            label={t("manager.level-calculator.new-av-to-invest")}
            tooltipContent={t(
              "manager.level-calculator.new-av-to-invest-tooltip"
            )}
            value={
              <NumberFormat
                value={formatCurrencyValue(newAvailableToInvest, currency)}
                thousandSeparator={" "}
                displayType="text"
                suffix={` ${currency}`}
              />
            }
          />
          <CalculatorOutput
            className="level-calculator-popup__statistic-item"
            label={t("manager.level-calculator.investment-scale")}
            tooltipContent={t(
              "manager.level-calculator.investment-scale-tooltip"
            )}
            value={
              <NumberFormat
                value={formatValue(investmentScale, 2)}
                displayType="text"
              />
            }
          />
        </div>
        <div className="level-calculator-popup__level-progress">
          <CalculatorLevelLine
            start={1}
            end={7}
            level={level}
            levelProgress={progress}
          />
        </div>
        {!isKycConfirmed && (
          <div>{t("manager.level-calculator.kyc-notification")}</div>
        )}
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
  onClose(): void;
}

interface Props extends OwnProps, InjectedTranslateProps {}

interface State {
  genesisRatio: number;
  programAge: number;
  weightedVolumeScale: number;
  managerBalance: number;
}
