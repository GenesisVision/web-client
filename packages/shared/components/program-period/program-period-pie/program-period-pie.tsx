import "./program-period-pie.scss";

import classNames from "classnames";
import { GVProgramPeriod } from "gv-react-components";
import moment, { unitOfTime } from "moment";
import * as React from "react";
import {
  InjectedTranslateProps,
  TranslationFunction,
  translate
} from "react-i18next";
import Tooltip from "shared/components/tooltip/tooltip";

import ProgramPeriodTooltip from "../program-period-tooltip/program-period-tooltip";

const renderDurationText = (t: TranslationFunction, start: Date, end: Date) => {
  const dateStart = moment(start);
  const dateEnd = moment(end);
  const durations = ["day", "hour", "minute", "second"];
  for (const duration of durations) {
    const count = dateEnd.diff(dateStart, `${duration}s` as unitOfTime.Diff);
    if (count > 0)
      return `${count} ${t(`program-period.${duration}`, {
        count
      })}`;
  }
};

const _ProgramPeriodPie: React.FC<Props> = ({ t, start, end, className }) => (
  <Tooltip render={() => <ProgramPeriodTooltip end={end} />}>
    <div className={classNames("program-period-pie", className)}>
      <GVProgramPeriod
        start={start}
        end={end}
        value={new Date()}
        variant="pie"
      />
      <div className="program-period-pie__text">
        {renderDurationText(t, start, end)}
      </div>
    </div>
  </Tooltip>
);

interface Props extends InjectedTranslateProps {
  start: Date;
  end: Date;
  className?: string;
}

const ProgramPeriodPie = React.memo(translate()(_ProgramPeriodPie));
export default ProgramPeriodPie;
