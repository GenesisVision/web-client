import { Button } from "components/button/button";
import { IButtonProps } from "components/button/button.types";
import { Center } from "components/center/center";
import { Row } from "components/row/row";
import { RowItem } from "components/row-item/row-item";
import {
  DATA_RANGE_FILTER_TYPES,
  DATE_RANGE_MAX_FILTER_NAME,
  DATE_RANGE_MIN_FILTER_NAME,
  IDataRangeFilterValue
} from "components/table/components/filtering/date-range-filter/date-range-filter.constants";
import DateRangeFilterCustom from "components/table/components/filtering/date-range-filter/date-range-filter-custom";
import { Text } from "components/text/text";
import dayjs from "dayjs";
import * as React from "react";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { localizedDate } from "utils/dates";
import { $textAccentColor, $textColor } from "utils/style/colors";
import { adaptiveMargin } from "utils/style/mixins";
import { $fontSizeParagraph, $paddingXsmall } from "utils/style/sizes";
import { HandlePeriodChangeType } from "utils/types";

import {
  ChartDefaultPeriod,
  ChartPeriodType,
  ChartPeriodTypeValues,
  getPeriodStartDate,
  TChartPeriod
} from "./chart-period.helpers";

interface Props {
  creationDate?: Date;
  period: ChartDefaultPeriod;
  onChange: HandlePeriodChangeType;
}

const PeriodButton = styled(Button) <
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

const Container = styled(Center)`
  justify-content: space-between;
  ${adaptiveMargin("bottom", -$paddingXsmall)};
`;

const _ChartPeriod: React.FC<Props> = ({ period, onChange, creationDate }) => {
  const { type, start, end } = period;
  const [customDatesTouched, setCustomDatesTouched] = useState<boolean>(false);
  const [customDates, setCustomDates] = useState<{
    [DATE_RANGE_MIN_FILTER_NAME]: string;
    [DATE_RANGE_MAX_FILTER_NAME]: string;
  }>({
    [DATE_RANGE_MIN_FILTER_NAME]: dayjs(period.start).toISOString(),
    [DATE_RANGE_MAX_FILTER_NAME]: dayjs().toISOString()
  });
  const { t } = useTranslation();
  const handleChangePeriod = useCallback(
    (newPeriodType: TChartPeriod) => () => {
      let start = getPeriodStartDate(newPeriodType);
      let end = new Date();
      if (newPeriodType === DATA_RANGE_FILTER_TYPES.CUSTOM) {
        start = new Date(customDates[DATE_RANGE_MIN_FILTER_NAME]);
        end = new Date(customDates[DATE_RANGE_MAX_FILTER_NAME]);
      } else if (!customDatesTouched) {
        if (newPeriodType !== "all") {
          setCustomDates(prevCustomDates => ({
            ...prevCustomDates,
            [DATE_RANGE_MIN_FILTER_NAME]: dayjs(start).toISOString()
          }));
        }
      }
      onChange({ type: newPeriodType, start, end });
    },
    [customDates]
  );

  const handleChangeDate = useCallback(
    (type: keyof IDataRangeFilterValue, date: string) => {
      setCustomDates(prevCustomDates => ({ ...prevCustomDates, [type]: date }));
      setCustomDatesTouched(true);
    },
    [customDates]
  );

  return (
    <Row onlyOffset>
      <Container wrap>
        <RowItem bottomOffset>
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
                    {period === "custom" ? (
                      <DateRangeFilterCustom
                        {...customDates}
                        minDate={creationDate}
                        handleSubmit={handleChangePeriod(period)}
                        handleChangeDate={handleChangeDate}
                      >
                        {t(
                          `asset-details:chart-period.${ChartPeriodType[period]}-short`
                        )}
                      </DateRangeFilterCustom>
                    ) : (
                        t(
                          `asset-details:chart-period.${ChartPeriodType[period]}-short`
                        )
                      )}
                  </PeriodButton>
                </RowItem>
              ))}
            </Row>
          </Text>
        </RowItem>
        <RowItem bottomOffset>
          <Text muted weight={"bold"} wrap={false}>
            {type !== ChartPeriodType.all && (
              <ChartPeriodDateLabel start={start!} end={end!} />
            )}
          </Text>
        </RowItem>
      </Container>
    </Row>
  );
};

const ChartPeriodDateLabel: React.FC<{ start: Date; end: Date }> = ({
  start,
  end
}) => {
  return (
    <span>
      {localizedDate(start)} - {localizedDate(end)}
    </span>
  );
};

const ChartPeriod = React.memo(_ChartPeriod);
export default ChartPeriod;
