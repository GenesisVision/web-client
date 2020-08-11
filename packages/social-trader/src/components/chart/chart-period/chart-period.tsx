import clsx from "clsx";
import { Button } from "components/button/button";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { Text } from "components/text/text";
import * as React from "react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { localizedDate } from "utils/dates";
import { HandlePeriodChangeType } from "utils/types";

import {
  ChartDefaultPeriod,
  ChartPeriodType,
  ChartPeriodTypeValues,
  getPeriodStartDate,
  TChartPeriod
} from "./chart-period.helpers";
import styles from "./chart-period.module.scss";

interface Props {
  period: ChartDefaultPeriod;
  onChange: HandlePeriodChangeType;
}

const _ChartPeriod: React.FC<Props> = ({ period, onChange }) => {
  const { type, start } = period;
  const { t } = useTranslation();
  const handleChangePeriod = useCallback(
    (newPeriodType: TChartPeriod) => () => {
      const start = getPeriodStartDate(newPeriodType);
      onChange({ type: newPeriodType, start });
    },
    []
  );
  return (
    <Row className={styles["chart-period"]}>
      <Text muted>
        <Row>
          {ChartPeriodTypeValues.map(period => (
            <RowItem>
              <Button
                testId={t(
                  `asset-details:chart-period.${ChartPeriodType[period]}-short`
                )}
                noPadding
                key={period}
                className={clsx(styles["chart-period__period-item"], {
                  [styles["chart-period__period-item--active"]]: type === period
                })}
                onClick={handleChangePeriod(period)}
                variant="text"
                color="secondary"
                disabled={type === period}
              >
                {t(
                  `asset-details:chart-period.${ChartPeriodType[period]}-short`
                )}
              </Button>
            </RowItem>
          ))}
        </Row>
      </Text>
      <Text muted weight={"bold"}>
        {type !== ChartPeriodType.all && (
          <ChartPeriodDateLabel start={start!} />
        )}
      </Text>
    </Row>
  );
};

const ChartPeriodDateLabel: React.FC<{ start: Date }> = ({ start }) => {
  return (
    <span>
      {localizedDate(start)} - {localizedDate(new Date())}
    </span>
  );
};

const ChartPeriod = React.memo(_ChartPeriod);
export default ChartPeriod;
