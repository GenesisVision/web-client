import "react-datepicker/dist/react-datepicker.css";

import "./gv-datepicker.scss";

import moment from "moment";
import PropTypes from "prop-types";
import React, { Component } from "react";
import DatePicker from "react-datepicker";

class GVDatePicker extends Component {
  handleChange = data => {
    if (this.props.onChange) {
      this.props.onChange({
        persist: () => {},
        target: {
          value: data && data.format(),
          name: this.props.name
        }
      });
    }
  };

  handleBlur = () => {
    const { disabled, onBlur, name } = this.props;
    if (disabled) return;
    if (onBlur) {
      onBlur({
        target: {
          name
        }
      });
    }
  };

  handleFocus = event => {
    const { disabled, onFocus } = this.props;
    if (disabled) return;
    if (onFocus) {
      onFocus(event);
    }
  };

  render() {
    const date = this.props.value && moment(this.props.value);
    return (
      <div className="gv-datepicker">
        <DatePicker
          className="gv-text-field__input"
          dateFormat="DD-MM-YYYY"
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
          selected={date}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

GVDatePicker.propTypes = {
  value: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
  onChange: PropTypes.func.isRequired
};

export default GVDatePicker;
