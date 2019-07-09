import "./program-period-pie.scss";

import classNames from "classnames";
import moment, { unitOfTime } from "moment";
import * as React from "react";
import {
  InjectedTranslateProps,
  TranslationFunction,
  translate
} from "react-i18next";
import GVProgramPeriod from "shared/components/gv-program-period";
import Tooltip from "shared/components/tooltip/tooltip";
import withLoader from "shared/decorators/with-loader";

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

const _ProgramPeriodPie: React.FC<Props> = ({
  t,
  start,
  end,
  className,
  numberPeriod
}) => (
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
      {numberPeriod && (
        <div className="program-period-pie__number">{numberPeriod}</div>
      )}
    </div>
  </Tooltip>
);

interface Props extends InjectedTranslateProps {
  start: Date;
  end: Date;
  className?: string;
  numberPeriod?: number;
}

const ProgramPeriodPie = withLoader(translate()(React.memo(_ProgramPeriodPie)));
export default ProgramPeriodPie;
