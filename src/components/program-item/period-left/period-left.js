import React from "react";
import PropTypes from "prop-types";
import TimeLeftWidget from "components/time-left-widget/time-left-widget";

const propTypes = {
  isEnabled: PropTypes.bool.isRequired,
  startOfPeriod: PropTypes.instanceOf(Date).isRequired,
  endOfPeriod: PropTypes.instanceOf(Date).isRequired,
  className: PropTypes.string
};

const defaultProps = {
  className: ""
};

const PeriodLeft = props => {
  const { isEnabled, startOfPeriod, endOfPeriod, className } = props;
  if (isEnabled) {
    return (
      <TimeLeftWidget
        className={className}
        start={startOfPeriod}
        end={endOfPeriod}
      />
    );
  }

  return <div>The program is not enabled</div>;
};

PeriodLeft.propTypes = propTypes;
PeriodLeft.defaultProps = defaultProps;
export default PeriodLeft;
