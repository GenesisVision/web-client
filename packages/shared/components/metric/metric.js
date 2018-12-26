import "./metric.css";

import classnames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import { UncontrolledTooltip } from "reactstrap";

const Metric = ({ value, description, id, tooltip, bubble, className }) => {
  const tooltipId = `description-${id}`;

  const tooltipIdAttr = {
    ...(tooltip !== undefined ? { id: `description-${id}` } : {})
  };

  return (
    <div className={classnames("metric", className)}>
      <div className="metric__value">
        {value}
        {bubble && <div className="metric__bubble">{bubble}</div>}
      </div>
      <div className="metric__description">
        <span {...tooltipIdAttr}>{description}</span>
        {tooltip && (
          <UncontrolledTooltip placement="bottom" target={tooltipId}>
            {tooltip}
          </UncontrolledTooltip>
        )}
      </div>
    </div>
  );
};

Metric.propTypes = {
  value: PropTypes.any.isRequired,
  description: PropTypes.string.isRequired,
  id: PropTypes.string,
  tooltip: PropTypes.string,
  bubble: PropTypes.string,
  className: PropTypes.string
};

export default Metric;
