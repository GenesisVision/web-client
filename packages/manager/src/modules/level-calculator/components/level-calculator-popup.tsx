import {
  LevelsParamsInfo,
  ProgramLevelInfo,
  ProgramsLevelsInfo
} from "gv-api-web";
import * as React from "react";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";
import GVButton from "shared/components/gv-button";
import { CloseIcon } from "shared/components/icon/close-icon";
import { KYC_ROUTE } from "shared/components/profile/profile.constants";
import { ILevelCalculatorProps } from "shared/components/programs/program-details/program-details.types";
import withLoader from "shared/decorators/with-loader";
import { formatCurrencyValue, formatValue } from "shared/utils/formatter";

import CalculatorLevelLine from "../components/calculator-level-line/calculator-level-line";
import CalculatorOutput from "../components/calculator-output/calculator-output";
import CalculatorSlider from "../components/calculator-slider/calculator-slider";
import {
  calcInvestmentScale,
  calcLevel,
  calcNewAvailableToInvest
} from "../services/level-calculator.helper";
import CalculatorLogarithmicSlider from "./calculator-slider/calculator-logarithmic-slider";

const getDefaultValues = (
  programLevelInfo: ProgramLevelInfo,
  levelsParameters: LevelsParamsInfo
) => {
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

const _LevelCalculatorPopup: React.FC<Props> = ({
  title,
  currency,
  programLevelInfo,
  levelsParameters,
  platformLevels,
  onClose,
  isKycConfirmed
}) => {
  const [t] = useTranslation();

  const [values, setValues] = useState<TValues>(
    getDefaultValues(programLevelInfo, levelsParameters)
  );

  const handleSliderChange = useCallback(
    (name: string, value: number) => {
      setValues({ ...values, [name]: value });
    },
    [values]
  );
  const handleResetForm = useCallback(() => {
    setValues(getDefaultValues(programLevelInfo, levelsParameters));
  }, [programLevelInfo, levelsParameters]);

  const {
    genesisRatio,
    programAge,
    weightedVolumeScale,
    managerBalance
  } = values;

  const newInvestmentScale = calcInvestmentScale(
    programAge,
    genesisRatio,
    weightedVolumeScale,
    levelsParameters
  );
  const newAvailableToInvest = calcNewAvailableToInvest(
    newInvestmentScale,
    managerBalance,
    levelsParameters
  );
  const [level, progress] = calcLevel(
    newAvailableToInvest,
    platformLevels.levels
  );

  return (
    <div>
      <div className="level-calculator-popup__header">
        <h2 className="level-calculator-popup__heading">
          {t("manager.level-calculator.title")}
        </h2>
        <div>
          <GVButton
            onClick={handleResetForm}
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
          valueClassName="level-calculator-popup__calculator-slider-value"
          title={t("manager.level-calculator.genesis-ratio")}
          tooltipContent={t("manager.level-calculator.genesis-ratio-tooltip")}
          value={genesisRatio}
          editableValue
          min={levelsParameters.genesisRatioMin}
          max={levelsParameters.genesisRatioMax}
          step={0.01}
          onChange={handleSliderChange}
        />
        <CalculatorSlider
          name="programAge"
          className="level-calculator-popup__calculator-slider"
          valueClassName="level-calculator-popup__calculator-slider-value"
          title={t("manager.level-calculator.age")}
          tooltipContent={t("manager.level-calculator.age-tooltip")}
          value={programAge}
          editableValue
          min={0}
          max={levelsParameters.programAgeMax}
          maxLabel={
            <NumberFormat
              value={levelsParameters.programAgeMax}
              displayType="text"
              suffix="+"
            />
          }
          step={1}
          onChange={handleSliderChange}
        />
        <CalculatorSlider
          name="weightedVolumeScale"
          className="level-calculator-popup__calculator-slider"
          valueClassName="level-calculator-popup__calculator-slider-value"
          title={t("manager.level-calculator.weighted-volume-scale")}
          tooltipContent={t(
            "manager.level-calculator.weighted-volume-scale-tooltip"
          )}
          value={weightedVolumeScale}
          editableValue
          min={levelsParameters.volumeScaleMin}
          max={levelsParameters.volumeScaleMax}
          step={0.01}
          onChange={handleSliderChange}
        />
        <CalculatorLogarithmicSlider
          name="managerBalance"
          className="level-calculator-popup__calculator-slider"
          title={t("manager.level-calculator.manager-balance")}
          tooltipContent={t("manager.level-calculator.manager-balance-tooltip")}
          value={+formatValue(managerBalance, 2)}
          valueAdornment={` ${currency}`}
          max={levelsParameters.maxAvailableToInvest}
          onChange={handleSliderChange}
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
          label={t("manager.level-calculator.current-investment-scale")}
          tooltipContent={t(
            "manager.level-calculator.current-investment-scale-tooltip"
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
          label={t("manager.level-calculator.new-investment-scale")}
          tooltipContent={t(
            "manager.level-calculator.new-investment-scale-tooltip"
          )}
          value={
            <NumberFormat
              value={formatValue(newInvestmentScale, 2)}
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
        <>
          <div className="level-calculator-popup__kyc-disclaimer">
            {t("manager.level-calculator.kyc-disclaimer")}
          </div>
          <Link
            className="level-calculator-popup__btn-verify"
            to={{
              pathname: KYC_ROUTE,
              state: title
            }}
          >
            <GVButton color="primary" variant="outlined">
              {t("buttons.verify")}
            </GVButton>
          </Link>
        </>
      )}
    </div>
  );
};

const LevelCalculatorPopup = withLoader(React.memo(_LevelCalculatorPopup));
export default LevelCalculatorPopup;

interface Props extends ILevelCalculatorProps {
  programLevelInfo: ProgramLevelInfo;
  platformLevels: ProgramsLevelsInfo;
  onClose: () => void;
}

type TValues = {
  genesisRatio: number;
  programAge: number;
  weightedVolumeScale: number;
  managerBalance: number;
};
