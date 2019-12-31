import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import { distanceDate } from "utils/dates";

export const _PeriodTimeLeft: React.FC<Props> = ({
  t,
  periodEnds,
  className
}) => {
  const renderTimeLeft = () => {
    const now = new Date().getTime();
    const periodEndsMoment = new Date(periodEnds).getTime();
    if (!periodEnds) {
      return null;
    }
    if (now > periodEndsMoment) {
      return t("program-period.period-is-over");
    }
    return distanceDate(now, periodEndsMoment);
  };

  return <div className={className}>{renderTimeLeft()}</div>;
};

interface Props extends WithTranslation, OwnProps {}
interface OwnProps {
  className?: string;
  periodEnds: Date;
}

const PeriodTimeLeft = compose<React.ComponentType<OwnProps>>(
  translate(),
  React.memo
)(_PeriodTimeLeft);
export default PeriodTimeLeft;
