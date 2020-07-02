import clsx from "clsx";
import GVProgramPeriod from "components/gv-program-period";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";

import styles from "./calculator-level-line.module.scss";

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

const _CalculatorLevelLine: React.FC<Props & WithTranslation> = ({
  t,
  start,
  end,
  className,
  level,
  levelProgress = 0
}) => {
  const value = calcProgressValue(level, levelProgress);
  const marksItems = getMarks(start, end, value);
  const marks = Object.keys(marksItems);
  return (
    <div className={clsx(styles["calculator-level-line"], className)}>
      <div className={styles["calculator-level-line__label"]}>
        <span className={styles["calculator-level-line__title"]}>
          {t("program-details-page:calculator.level")}
        </span>
        <span className={styles["calculator-level-line__value"]}>{level}</span>
      </div>
      <GVProgramPeriod
        className={styles["calculator-level-line__substrate"]}
        start={start}
        end={end}
        value={value}
        variant="line"
      />
      <div className={styles["calculator-level-line__marks"]}>
        {marks.map(mark => {
          return (
            <span
              className={clsx(styles["calculator-level-line__mark"], {
                [styles["calculator-level-line__mark--active"]]:
                  marksItems[mark].active
              })}
              key={mark}
              style={{ left: `${marksItems[mark].positionMark}%` }}
            >
              {mark}
            </span>
          );
        })}
      </div>
    </div>
  );
};

interface Props {
  start: number;
  end: number;
  level: number;
  levelProgress?: number;
  className?: string;
}

const CalculatorLevelLine = translate()(React.memo(_CalculatorLevelLine));
export default CalculatorLevelLine;
