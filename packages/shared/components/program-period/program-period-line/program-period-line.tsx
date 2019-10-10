import "./program-period-line.scss";

import classNames from "classnames";
import { ProgramDetailsFullStatusEnum } from "gv-api-web";
import * as React from "react";
import { useTranslation } from "react-i18next";
import GVProgramPeriod from "shared/components/gv-program-period";
import { STATUS } from "shared/constants/constants";
import { durationDate } from "shared/utils/dates";

const _ProgramPeriodLine: React.FC<Props> = ({
  start,
  end,
  className,
  status
}) => {
  const [t] = useTranslation();
  const duration = durationDate(start, end);
  const timeLeft = durationDate(end);
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
  status: ProgramDetailsFullStatusEnum;
}

const ProgramPeriodLine = React.memo(_ProgramPeriodLine);
export default ProgramPeriodLine;
