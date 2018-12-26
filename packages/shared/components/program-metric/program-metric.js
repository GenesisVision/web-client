import "./program-metric.css";

import PropTypes from "prop-types";
import React from "react";

import MetricWithId from "../metric/metric-with-id";

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
