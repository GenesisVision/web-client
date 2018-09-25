import "./program-period-line.scss";

import classnames from "classnames";
import { GVProgramPeriod } from "gv-react-components";
import moment from "moment";
import React from "react";

const calcDuration = (start, end) => {
  const dateStart = moment(start);
  const dateEnd = moment(end);
  if (dateEnd < dateStart) return null;
  return moment.duration(dateEnd.diff(dateStart)).humanize();
};

const ProgramPeriodLine = ({ t, start, end, className }) => {
  return (
    <div className={classnames("program-period-line", className)}>
      <GVProgramPeriod
        start={start}
        end={end}
        value={new Date()}
        variant="line"
      />
      <div className="program-period-line__description">
        {calcDuration(start, end)}
        {calcDuration(new Date(), end)}
      </div>
    </div>
  );
};

export default ProgramPeriodLine;
