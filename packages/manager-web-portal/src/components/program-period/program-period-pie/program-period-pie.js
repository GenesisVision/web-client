import "./program-period-pie.scss";

import classnames from "classnames";
import Tooltip from "shared/components/tooltip/tooltip";
import { GVProgramPeriod } from "gv-react-components";
import moment from "moment";
import PropTypes from "prop-types";
import React from "react";
import { translate } from "react-i18next";

import ProgramPeriodTooltip from "../program-period-tooltip/program-period-tooltip";

const renderDurationText = (t, start, end) => {
  const dateStart = moment(start);
  const dateEnd = moment(end);
  const daysDuration = dateEnd.diff(dateStart, "days");
  if (daysDuration > 0)
    return `${daysDuration} ${t("program-period.day", {
      count: daysDuration
    })}`;

  const hoursDuration = dateEnd.diff(dateStart, "hours");
  if (hoursDuration > 0)
    return `${hoursDuration} ${t("program-period.hour", {
      count: hoursDuration
    })}`;

  const minutesDuration = dateEnd.diff(dateStart, "minutes");
  if (minutesDuration > 0)
    return `${minutesDuration} ${t("program-period.minute", {
      count: minutesDuration
    })}`;

  const secondsDuration = dateEnd.diff(dateStart, "seconds");
  return `${secondsDuration} ${t("program-period.second", {
    count: secondsDuration
  })}`;
};

const ProgramPeriodPie = ({ t, start, end, className }) => {
  return (
    <Tooltip render={() => <ProgramPeriodTooltip start={start} end={end} />}>
      <div className={classnames("program-period-pie", className)}>
        <GVProgramPeriod start={start} end={end} value={new Date()} />
        <div className="program-period-pie__text">
          {renderDurationText(t, start, end)}
        </div>
      </div>
    </Tooltip>
  );
};

ProgramPeriodPie.propTypes = {
  start: PropTypes.instanceOf(Date).isRequired,
  end: PropTypes.instanceOf(Date).isRequired,
  t: PropTypes.func.isRequired,
  className: PropTypes.string
};

export default translate()(ProgramPeriodPie);
