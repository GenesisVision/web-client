import React, { Component } from "react";
import PropTypes from "prop-types";
import { UncontrolledTooltip } from "reactstrap";
import uuid from "uuid";

import "./pi-stat.css";

export default class PIStat extends Component {
  static propTypes = {
    value: PropTypes.any.isRequired,
    description: PropTypes.string.isRequired,
    tooltip: PropTypes.string,
    bubble: PropTypes.string
  };

  static defaultTypes = {
    tooltip: "",
    bubble: ""
  };

  render() {
    const { value, tooltip, bubble, description } = this.props;
    const id = uuid.v4();
    return (
      <div className="pis-item">
        <div className="metric">
          <div className="metric__value">
            {value}
            {bubble && <div className="metric__bubble">{bubble}</div>}
          </div>
          <div className="metric__description">
            <span id={`description-${id}`}>{description}</span>
            {tooltip && (
              <UncontrolledTooltip
                placement="bottom"
                target={`description-${id}`}
              >
                {tooltip}
              </UncontrolledTooltip>
            )}
          </div>
        </div>
      </div>
    );
  }
}
