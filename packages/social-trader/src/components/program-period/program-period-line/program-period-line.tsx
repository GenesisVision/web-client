import "./program-period-line.scss";

import classNames from "classnames";
import GVProgramPeriod from "components/gv-program-period";
import { STATUS } from "constants/constants";
import { PeriodStatus } from "gv-api-web";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { distanceDate } from "utils/dates";

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
      <div className="program-period-line__description">
        <div>{duration}</div>
        <div>
          {status === STATUS.CLOSED
            ? t("program-period.program-closed")
            : timeLeft && `${timeLeft} ${t("program-period.left")}`}{" "}
        </div>
      </div>
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
