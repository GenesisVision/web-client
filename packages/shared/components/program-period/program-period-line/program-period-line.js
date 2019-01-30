import "./program-period-line.scss";

import classnames from "classnames";
import { GVProgramPeriod } from "gv-react-components";
import moment from "moment";
import React from "react";
import { translate } from "react-i18next";
import { STATUS } from "shared/constants/constants";

const calcDuration = (start, end) => {
  const dateStart = moment(start);
  const dateEnd = moment(end);
  if (dateEnd < dateStart) return null;
  return moment.duration(dateEnd.diff(dateStart)).humanize();
};

const ProgramPeriodLine = ({ t, start, end, className, status }) => {
  const duration = calcDuration(start, end);
  const timeLeft = calcDuration(new Date(), end);
  return (
    <div className={classnames("program-period-line", className)}>
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

export default translate()(ProgramPeriodLine);
