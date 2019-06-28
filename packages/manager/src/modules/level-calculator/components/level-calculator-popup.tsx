import { ProgramLevelInfo, ProgramsLevelsInfo } from "gv-api-web";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { compose } from "redux";
import GVButton from "shared/components/gv-button";
import { CloseIcon } from "shared/components/icon/close-icon";
import { ILevelCalculatorProps } from "shared/components/programs/program-details/program-details.types";
import withLoader, { WithLoaderProps } from "shared/decorators/with-loader";
import { formatCurrencyValue, formatValue } from "shared/utils/formatter";

import CalculatorLevelLine from "../components/calculator-level-line/calculator-level-line";
import CalculatorOutput from "../components/calculator-output/calculator-output";
import CalculatorSlider from "../components/calculator-slider/calculator-slider";
import {
  calcInvestmentScale,
  calcLevel,
  calcNewAvailableToInvest
} from "../services/level-calculator.helper";

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
      platformLevels,
      onClose,
      isKycConfirmed
    } = this.props;
    const {
      genesisRatio,
      programAge,
      weightedVolumeScale,
      managerBalance
    } = this.state;

    const investmentScale = calcInvestmentScale(
      programAge,
      genesisRatio,
      weightedVolumeScale,
      levelsParameters
    );
    const newAvailableToInvest = calcNewAvailableToInvest(
      investmentScale,
      managerBalance,
      genesisRatio,
      levelsParameters
    );
    const [level, progress] = calcLevel(
      newAvailableToInvest,
      platformLevels.levels
    );

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
            step={0.01}
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
            step={0.01}
            onChange={this.handleSliderChange}
          />
          <CalculatorSlider
            name="managerBalance"
            className="level-calculator-popup__calculator-slider"
            label={t("manager.level-calculator.manager-balance")}
            tooltipContent={t(
              "manager.level-calculator.manager-balance-tooltip"
            )}
            value={+formatValue(managerBalance, 2)}
            valueSuffix={` ${currency}`}
            min={0}
            max={levelsParameters.maxAvailableToInvest}
            step={0.01}
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
          <div className="level-calculator-popup__kyc-disclaimer">
            {t("manager.level-calculator.kyc-disclaimer")}
          </div>
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
