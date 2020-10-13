import GVProgramPeriod from "components/gv-program-period";
import {
  CalculatorLevelLineContainer,
  CalculatorLevelLineLabel,
  CalculatorLevelLineMark,
  CalculatorLevelLineMarks,
  CalculatorLevelLineValue
} from "modules/level-calculator/components/calculator-level-line/calculator-level-line.styles";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { $mainColor } from "utils/style/colors";

interface Props {
  start: number;
  end: number;
  level: number;
  levelProgress?: number;
}

const getMarks = (start: number, end: number, value: number) =>
  new Array(end - start + 1).fill(start).reduce((acc, curr, idx) => {
    const mark = curr + idx;
    const positionMark = (((mark - start) / (end - start)) * 100).toFixed(2);
    acc[mark] = { positionMark, active: value >= mark };
    return acc;
  }, {});

const calcProgressValue = (level: number, levelProgress: number) => {
  return level + levelProgress / 100;
};

const _CalculatorLevelLine: React.FC<Props> = ({
  start,
  end,
  level,
  levelProgress = 0
}) => {
  const [t] = useTranslation();
  const value = calcProgressValue(level, levelProgress);
  const marksItems = getMarks(start, end, value);
  const marks = Object.keys(marksItems);
  return (
    <CalculatorLevelLineContainer>
      <CalculatorLevelLineLabel>
        <span>{t("program-details-page:calculator.level")}</span>
        <CalculatorLevelLineValue>{level}</CalculatorLevelLineValue>
      </CalculatorLevelLineLabel>
      <GVProgramPeriod
        bgColor={`${$mainColor}10`}
        start={start}
        end={end}
        value={value}
        variant="line"
      />
      <CalculatorLevelLineMarks>
        {marks.map(mark => {
          return (
            <CalculatorLevelLineMark
              active={marksItems[mark].active}
              left={marksItems[mark].positionMark}
              key={mark}
            >
              {mark}
            </CalculatorLevelLineMark>
          );
        })}
      </CalculatorLevelLineMarks>
    </CalculatorLevelLineContainer>
  );
};

const CalculatorLevelLine = React.memo(_CalculatorLevelLine);
export default CalculatorLevelLine;
