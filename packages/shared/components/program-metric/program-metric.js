import PropTypes from "prop-types";
import React from "react";

import MetricWithId from "../metric/metric-with-id";

import "./program-metric.css";

const ProgramMetric = props => (
  <MetricWithId className="program-metric" {...props} />
);

ProgramMetric.propTypes = {
  value: PropTypes.any.isRequired,
  description: PropTypes.string.isRequired,
  tooltip: PropTypes.string.isRequired,
  bubble: PropTypes.string
};

export default ProgramMetric;
