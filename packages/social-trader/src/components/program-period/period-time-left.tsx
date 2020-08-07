import * as React from "react";
import { useTranslation } from "react-i18next";
import { distanceDate } from "utils/dates";

interface Props {
  className?: string;
  periodEnds: Date;
}

export const _PeriodTimeLeft: React.FC<Props> = ({ periodEnds, className }) => {
  const [t] = useTranslation();
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

const PeriodTimeLeft = React.memo(_PeriodTimeLeft);
export default PeriodTimeLeft;
