import GVProgramPeriod from "components/gv-program-period";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { Text } from "components/text/text";
import { STATUS } from "constants/constants";
import { PeriodStatus } from "gv-api-web";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { distanceDate } from "utils/dates";

interface Props {
  start: number | Date;
  end: number | Date;
  status: PeriodStatus | string;
}

const _ProgramPeriodLine: React.FC<Props> = ({ start, end, status }) => {
  const [t] = useTranslation();
  const duration = distanceDate(start, end);
  const timeLeft = distanceDate(end);
  return (
    <div>
      <GVProgramPeriod
        start={start}
        end={end}
        value={new Date()}
        variant="line"
      />
      <Row size={"small"}>
        <RowItem wide>
          <Text weight={"bold"} size={"small"}>
            {duration}
          </Text>
        </RowItem>
        <RowItem>
          <Text weight={"bold"} size={"small"} wrap={false}>
            {status === STATUS.CLOSED
              ? t("program-period.program-closed")
              : timeLeft && `${timeLeft} ${t("program-period.left")}`}
          </Text>
        </RowItem>
      </Row>
    </div>
  );
};

const ProgramPeriodLine = React.memo(_ProgramPeriodLine);
export default ProgramPeriodLine;
