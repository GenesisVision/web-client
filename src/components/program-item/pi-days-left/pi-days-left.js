import React from "react";
import PropTypes from "prop-types";
import DaysLeftWidget from "../../days-left-widget/days-left-widget";

const propTypes = {
  isEnabled: PropTypes.bool.isRequired,
  startOfPeriod: PropTypes.instanceOf(Date).isRequired,
  periodDuration: PropTypes.number.isRequired,
  className: PropTypes.string
};

const defaultProps = {
  className: ""
};

const DaysLeft = props => {
  const { isEnabled, startOfPeriod, periodDuration, className } = props;
  if (isEnabled) {
    return (
      <DaysLeftWidget
        className={className}
        start={startOfPeriod}
        duration={periodDuration}
      />
    );
  }

  return <div>The program is not enabled</div>;
};

DaysLeft.propTypes = propTypes;
DaysLeft.defaultProps = defaultProps;
export default DaysLeft;
