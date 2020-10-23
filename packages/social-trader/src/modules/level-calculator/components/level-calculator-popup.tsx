import { Button } from "components/button/button";
import { Center } from "components/center/center";
import { CloseIcon } from "components/icon/close-icon";
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
import {
  LevelCalculatorPopupCloseButton,
  LevelCalculatorPopupControls,
  LevelCalculatorPopupHeader,
  LevelCalculatorPopupHeading,
  LevelCalculatorPopupKYCDisclaimer,
  LevelCalculatorPopupProgramLabel,
  LevelCalculatorPopupProgramName,
  LevelCalculatorPopupProgramTitle,
  LevelCalculatorPopupVerifyButton
} from "modules/level-calculator/components/level-calculator-popup.styles";
import { ILevelCalculatorProps } from "pages/invest/programs/program-details/program-details.types";
import * as React from "react";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import styled from "styled-components";
import { formatCurrencyValue, formatValue } from "utils/formatter";
import { mediaBreakpointLandscapePhone } from "utils/style/media";
import { adaptiveMargin } from "utils/style/mixins";
import { $paddingSmall } from "utils/style/sizes";

import CalculatorLevelLine from "../components/calculator-level-line/calculator-level-line";
import CalculatorOutput from "../components/calculator-output/calculator-output";
import CalculatorSlider from "../components/calculator-slider/calculator-slider";
import {
  calcInvestmentScale,
  calcLevel,
  calcNewAvailableToInvest
} from "../services/level-calculator.helper";
import CalculatorLogarithmicSlider from "./calculator-slider/calculator-logarithmic-slider";

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

const SliderWrapper = styled.div`
  ${adaptiveMargin("bottom", $paddingSmall)};
  width: 100%;
  ${mediaBreakpointLandscapePhone(`max-width: 255px;`)};
`;

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
      <LevelCalculatorPopupHeader>
        <LevelCalculatorPopupHeading>
          {t("program-details-page:level-calculator.title")}
        </LevelCalculatorPopupHeading>
        <Center>
          <RowItem>
            <Button
              size={"small"}
              color={"secondary"}
              onClick={handleResetForm}
            >
              <Text muted>{t("buttons.reset")}</Text>
            </Button>
          </RowItem>
          <LevelCalculatorPopupCloseButton>
            <Button
              noPadding
              variant="text"
              color="secondary"
              onClick={onClose}
            >
              <CloseIcon />
            </Button>
          </LevelCalculatorPopupCloseButton>
        </Center>
      </LevelCalculatorPopupHeader>

      <LevelCalculatorPopupProgramName>
        <LevelCalculatorPopupProgramLabel>
          {t("program-details-page:level-calculator.program")}
        </LevelCalculatorPopupProgramLabel>
        <LevelCalculatorPopupProgramTitle>
          {title}
        </LevelCalculatorPopupProgramTitle>
      </LevelCalculatorPopupProgramName>
      <LevelCalculatorPopupControls>
        <SliderWrapper>
          <CalculatorSlider
            name="genesisRatio"
            title={t("program-details-page:level-calculator.genesis-ratio")}
            tooltipContent={t(
              "program-details-page:level-calculator.genesis-ratio-tooltip"
            )}
            value={genesisRatio}
            editableValue
            min={levelsParameters.genesisRatioMin}
            max={levelsParameters.genesisRatioMax}
            step={0.01}
            onChange={handleSliderChange}
          />
        </SliderWrapper>
        <SliderWrapper>
          <CalculatorSlider
            name="programAge"
            title={t("program-details-page:level-calculator.age")}
            tooltipContent={t(
              "program-details-page:level-calculator.age-tooltip"
            )}
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
          />{" "}
        </SliderWrapper>
        <SliderWrapper>
          <CalculatorSlider
            name="weightedVolumeScale"
            title={t(
              "program-details-page:level-calculator.weighted-volume-scale"
            )}
            tooltipContent={t(
              "program-details-page:level-calculator.weighted-volume-scale-tooltip"
            )}
            value={weightedVolumeScale}
            editableValue
            min={levelsParameters.volumeScaleMin}
            max={levelsParameters.volumeScaleMax}
            step={0.01}
            onChange={handleSliderChange}
          />
        </SliderWrapper>
        <SliderWrapper>
          <CalculatorLogarithmicSlider
            name="managerBalance"
            title={t("program-details-page:level-calculator.manager-balance")}
            tooltipContent={t(
              "program-details-page:level-calculator.manager-balance-tooltip"
            )}
            value={+formatValue(managerBalance, 2)}
            valueAdornment={` ${currency}`}
            max={levelsParameters.maxAvailableToInvest}
            onChange={handleSliderChange}
          />
        </SliderWrapper>
      </LevelCalculatorPopupControls>
      <LevelCalculatorPopupControls>
        <CalculatorOutput
          label={t(
            "program-details-page:level-calculator.current-av-to-invest"
          )}
          tooltipContent={t(
            "program-details-page:level-calculator.current-av-to-invest-tooltip"
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
          label={t(
            "program-details-page:level-calculator.current-investment-scale"
          )}
          tooltipContent={t(
            "program-details-page:level-calculator.current-investment-scale-tooltip"
          )}
          value={
            <NumberFormat
              value={formatValue(programLevelInfo.investmentScale, 2)}
              displayType="text"
            />
          }
        />
        <CalculatorOutput
          label={t("program-details-page:level-calculator.new-av-to-invest")}
          tooltipContent={t(
            "program-details-page:level-calculator.new-av-to-invest-tooltip"
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
          label={t(
            "program-details-page:level-calculator.new-investment-scale"
          )}
          tooltipContent={t(
            "program-details-page:level-calculator.new-investment-scale-tooltip"
          )}
          value={
            <NumberFormat
              value={formatValue(newInvestmentScale, 2)}
              displayType="text"
            />
          }
        />
      </LevelCalculatorPopupControls>
      <CalculatorLevelLine
        start={1}
        end={7}
        level={level}
        levelProgress={progress}
      />
      {!isKycConfirmed && (
        <>
          <LevelCalculatorPopupKYCDisclaimer>
            <Text muted size={"small"}>
              {t("program-details-page:level-calculator.kyc-disclaimer")}
            </Text>
          </LevelCalculatorPopupKYCDisclaimer>
          <LevelCalculatorPopupVerifyButton to={linkCreator(KYC_ROUTE, title)}>
            <Button color="primary" variant="outlined">
              {t("buttons.verify")}
            </Button>
          </LevelCalculatorPopupVerifyButton>
        </>
      )}
    </div>
  );
};

const LevelCalculatorPopup = withLoader(
  React.memo(Crashable(_LevelCalculatorPopup))
);
export default LevelCalculatorPopup;
