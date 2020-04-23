import classNames from "classnames";
import GVProgramPeriod from "components/gv-program-period";
import { Row } from "components/row/row";
import { STATUS } from "constants/constants";
import { PeriodStatus } from "gv-api-web";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { distanceDate } from "utils/dates";

import "./program-period-line.scss";

const _ProgramPeriodLine: React.FC<Props> = ({
  start,
  end,
  className,
  status
}) => {
  const [t] = useTranslation();
  const duration = distanceDate(start, end);
  const timeLeft = distanceDate(end);
  return (
    <div className={classNames("program-period-line", className)}>
      <GVProgramPeriod
        start={start}
        end={end}
        value={new Date()}
        variant="line"
      />
      <Row small className="program-period-line__description">
        <div>
          <b>{duration}</b>
        </div>
        <div>
          <b>
            {status === STATUS.CLOSED
              ? t("program-period.program-closed")
              : timeLeft && `${timeLeft} ${t("program-period.left")}`}
          </b>
        </div>
      </Row>
    </div>
  );
};

interface Props {
  start: number | Date;
  end: number | Date;
  className?: string;
  status: PeriodStatus | string;
}

const ProgramPeriodLine = React.memo(_ProgramPeriodLine);
export default ProgramPeriodLine;
