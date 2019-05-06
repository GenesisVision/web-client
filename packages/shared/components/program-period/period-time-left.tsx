import moment from "moment";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { compose } from "redux";

export const _PeriodTimeLeft: React.FC<Props> = ({
  t,
  periodEnds,
  className
}) => {
  const renderTimeLeft = () => {
    const now = moment();
    const periodEndsMoment = moment(periodEnds);
    if (!periodEnds) {
      return null;
    }
    if (now.isAfter(periodEndsMoment)) {
      return t("program-period.period-is-over");
    }
    return periodEndsMoment.from(now, true);
  };

  return <div className={className}>{renderTimeLeft()}</div>;
};

interface Props extends InjectedTranslateProps, OwnProps {}
interface OwnProps {
  className?: string;
  periodEnds: Date;
}

const PeriodTimeLeft = compose<React.ComponentType<OwnProps>>(
  React.memo,
  translate()
)(_PeriodTimeLeft);
export default PeriodTimeLeft;
