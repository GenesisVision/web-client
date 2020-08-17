import { Button } from "components/button/button";
import { IButtonProps } from "components/button/button.types";
import {
  $textAccentColor,
  $textColor
} from "components/gv-styles/gv-colors/gv-colors";
import { $fontSizeParagraph } from "components/gv-styles/gv-sizes";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { Text } from "components/text/text";
import * as React from "react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { localizedDate } from "utils/dates";
import { HandlePeriodChangeType } from "utils/types";

import {
  ChartDefaultPeriod,
  ChartPeriodType,
  ChartPeriodTypeValues,
  getPeriodStartDate,
  TChartPeriod
} from "./chart-period.helpers";

interface Props {
  period: ChartDefaultPeriod;
  onChange: HandlePeriodChangeType;
}

const PeriodButton = styled(Button)<
  IButtonProps & {
    periodType: TChartPeriod;
    period: TChartPeriod;
  }
>`
  font-size: ${$fontSizeParagraph};
  cursor: ${({ periodType, period }) =>
    periodType === period ? "default" : "pointer"};
  color: ${({ periodType, period }) =>
    periodType === period ? $textAccentColor : $textColor};
  ${({ disabled }) => disabled && "opacity: 1;"};
`;

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
    <Row>
      <RowItem wide>
        <Text muted>
          <Row>
            {ChartPeriodTypeValues.map(period => (
              <RowItem>
                <PeriodButton
                  period={period}
                  periodType={type}
                  testId={t(
                    `asset-details:chart-period.${ChartPeriodType[period]}-short`
                  )}
                  noPadding
                  key={period}
                  onClick={handleChangePeriod(period)}
                  variant="text"
                  color="secondary"
                  disabled={type === period}
                >
                  {t(
                    `asset-details:chart-period.${ChartPeriodType[period]}-short`
                  )}
                </PeriodButton>
              </RowItem>
            ))}
          </Row>
        </Text>
      </RowItem>
      <Text muted weight={"bold"} wrap={false}>
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
