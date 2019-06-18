import "./program-period-line.scss";

import classNames from "classnames";
import moment from "moment";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import GVProgramPeriod from "shared/components/gv-program-period";
import { STATUS } from "shared/constants/constants";

const calcDuration = (start: number | Date, end: number | Date): string => {
  const dateStart = moment(start);
  const dateEnd = moment(end);
  if (dateEnd < dateStart) return "";
  return moment.duration(dateEnd.diff(dateStart)).humanize();
};

const ProgramPeriodLine: React.FC<Props & InjectedTranslateProps> = ({
  t,
  start,
  end,
  className,
  status
}) => {
  const duration = calcDuration(start, end);
  const timeLeft = calcDuration(new Date(), end);
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
  status: STATUS;
}

export default translate()(React.memo(ProgramPeriodLine));
