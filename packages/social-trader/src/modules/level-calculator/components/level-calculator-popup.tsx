import { Center } from "components/center/center";
import GVButton, { GV_BTN_SIZE } from "components/gv-button";
import { CloseIcon } from "components/icon/close-icon";
import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import { KYC_ROUTE } from "components/profile/profile.constants";
import { RowItem } from "components/row-item/row-item";
import { Text } from "components/text/text";
import Crashable from "decorators/crashable";
import withLoader from "decorators/with-loader";
import {
  LevelsParamsInfo,
  ProgramLevelInfo,
  ProgramsLevelsInfo
} from "gv-api-web";
import { ILevelCalculatorProps } from "pages/invest/programs/program-details/program-details.types";
import * as React from "react";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import { formatCurrencyValue, formatValue } from "utils/formatter";

import CalculatorLevelLine from "../components/calculator-level-line/calculator-level-line";
import CalculatorOutput from "../components/calculator-output/calculator-output";
import CalculatorSlider from "../components/calculator-slider/calculator-slider";
import {
  calcInvestmentScale,
  calcLevel,
  calcNewAvailableToInvest
} from "../services/level-calculator.helper";
import CalculatorLogarithmicSlider from "./calculator-slider/calculator-logarithmic-slider";
import styles from "./level-calculator.module.scss";

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
  const { linkCreator } = useToLink();
  const [t] = useTranslation();

  const [values, setValues] = useState<TValues>(
    getDefaultValues(programLevelInfo, levelsParameters)
  );

  const handleSliderChange = useCallback(
    (name: string, value: number) => {
      setValues({ ...values, [name]: value });
    },
    [setValues, values]
  );
  const handleResetForm = useCallback(() => {
    setValues(getDefaultValues(programLevelInfo, levelsParameters));
  }, [programLevelInfo, levelsParameters, setValues]);

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
      <Center className={styles["level-calculator-popup__header"]}>
        <h2 className={styles["level-calculator-popup__heading"]}>
          {t("level-calculator.title")}
        </h2>
        <Center>
          <RowItem>
            <GVButton
              size={GV_BTN_SIZE.SMALL}
              color={"secondary"}
              onClick={handleResetForm}
            >
              <span
                className={styles["level-calculator-popup__reset-button-text"]}
              >
                {t("buttons.reset")}
              </span>
            </GVButton>
          </RowItem>
          <GVButton
            className={styles["level-calculator-popup__close-button"]}
            noPadding
            variant="text"
            color="secondary"
            onClick={onClose}
          >
            <CloseIcon />
          </GVButton>
        </Center>
      </Center>

      <div className={styles["level-calculator-popup__program-name"]}>
        <div className={styles["level-calculator-popup__program-label"]}>
          {t("level-calculator.program")}
        </div>
        <div className={styles["level-calculator-popup__program-title"]}>
          {title}
        </div>
      </div>
      <div className={styles["level-calculator-popup__controls"]}>
        <CalculatorSlider
          name="genesisRatio"
          className={styles["level-calculator-popup__calculator-slider"]}
          valueClassName={
            styles["level-calculator-popup__calculator-slider-value"]
          }
          title={t("level-calculator.genesis-ratio")}
          tooltipContent={t("level-calculator.genesis-ratio-tooltip")}
          value={genesisRatio}
          editableValue
          min={levelsParameters.genesisRatioMin}
          max={levelsParameters.genesisRatioMax}
          step={0.01}
          onChange={handleSliderChange}
        />
        <CalculatorSlider
          name="programAge"
          className={styles["level-calculator-popup__calculator-slider"]}
          valueClassName={
            styles["level-calculator-popup__calculator-slider-value"]
          }
          title={t("level-calculator.age")}
          tooltipContent={t("level-calculator.age-tooltip")}
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
          className={styles["level-calculator-popup__calculator-slider"]}
          valueClassName={
            styles["level-calculator-popup__calculator-slider-value"]
          }
          title={t("level-calculator.weighted-volume-scale")}
          tooltipContent={t("level-calculator.weighted-volume-scale-tooltip")}
          value={weightedVolumeScale}
          editableValue
          min={levelsParameters.volumeScaleMin}
          max={levelsParameters.volumeScaleMax}
          step={0.01}
          onChange={handleSliderChange}
        />
        <CalculatorLogarithmicSlider
          name="managerBalance"
          className={styles["level-calculator-popup__calculator-slider"]}
          title={t("level-calculator.manager-balance")}
          tooltipContent={t("level-calculator.manager-balance-tooltip")}
          value={+formatValue(managerBalance, 2)}
          valueAdornment={` ${currency}`}
          max={levelsParameters.maxAvailableToInvest}
          onChange={handleSliderChange}
        />
      </div>

      <div className={styles["level-calculator-popup__controls"]}>
        <CalculatorOutput
          className={styles["level-calculator-popup__statistic-item"]}
          label={t("level-calculator.current-av-to-invest")}
          tooltipContent={t("level-calculator.current-av-to-invest-tooltip")}
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
          className={styles["level-calculator-popup__statistic-item"]}
          label={t("level-calculator.current-investment-scale")}
          tooltipContent={t(
            "level-calculator.current-investment-scale-tooltip"
          )}
          value={
            <NumberFormat
              value={formatValue(programLevelInfo.investmentScale, 2)}
              displayType="text"
            />
          }
        />
        <CalculatorOutput
          className={styles["level-calculator-popup__statistic-item"]}
          label={t("level-calculator.new-av-to-invest")}
          tooltipContent={t("level-calculator.new-av-to-invest-tooltip")}
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
          className={styles["level-calculator-popup__statistic-item"]}
          label={t("level-calculator.new-investment-scale")}
          tooltipContent={t("level-calculator.new-investment-scale-tooltip")}
          value={
            <NumberFormat
              value={formatValue(newInvestmentScale, 2)}
              displayType="text"
            />
          }
        />
      </div>
      <div className={styles["level-calculator-popup__level-progress"]}>
        <CalculatorLevelLine
          start={1}
          end={7}
          level={level}
          levelProgress={progress}
        />
      </div>
      {!isKycConfirmed && (
        <>
          <div className={styles["level-calculator-popup__kyc-disclaimer"]}>
            <Text muted size={"small"}>
              {t("level-calculator.kyc-disclaimer")}
            </Text>
          </div>
          <Link
            className={styles["level-calculator-popup__btn-verify"]}
            to={linkCreator(KYC_ROUTE, title)}
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

const LevelCalculatorPopup = withLoader(
  React.memo(Crashable(_LevelCalculatorPopup))
);
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
