import "./gv-datepicker.scss";

import Popover from "components/popover/popover";
import moment from "moment";
import PropTypes from "prop-types";
import React, { Component } from "react";
import Calendar from "react-calendar";
import { translate } from "react-i18next";

export const DATE_FORMAT = "DD-MM-YYYY";

class GVDatePicker extends Component {
  state = {
    anchorEl: null
  };

  handleChange = data => {
    if (this.props.onChange) {
      this.props.onChange({
        persist: () => {},
        target: {
          value: data && moment(data).format(),
          name: this.props.name
        }
      });
    }
    setTimeout(() => {
      this.input.current.focus();
    }, 300);
  };

  handleBlur = () => {
    const { disabled, onBlur, name } = this.props;
    if (disabled || this.state.anchorEl) return;
    if (onBlur) {
      onBlur({
        target: {
          name
        }
      });
    }
  };

  handleOpen = anchorEl => {
    this.setState({ anchorEl });
  };

  handleClose = () => {
    this.setState({ anchorEl: null }, this.handleBlur);
  };

  handleFocus = event => {
    const { disabled, onFocus } = this.props;
    if (disabled) return;
    if (onFocus) {
      onFocus(event);
    }
  };

  handleClick = event => {
    this.handleOpen(event.target);
    this.handleFocus(event);
  };

  input = React.createRef();

  render() {
    const date =
      this.props.value && moment(this.props.value).format(DATE_FORMAT);

    const value = this.props.value && moment(this.props.value).toDate();

    const minDate =
      this.props.minDate &&
      (this.props.minDate instanceof Date
        ? this.props.minDate
        : moment(this.props.minDate).toDate());

    const maxDate =
      this.props.maxDate &&
      (this.props.maxDate instanceof Date
        ? this.props.maxDate
        : moment(this.props.maxDate).toDate());

    return (
      <div className="gv-datepicker">
        <button
          type="button"
          ref={this.input}
          name={this.props.name}
          value={date}
          onClick={this.handleClick}
          onFocus={this.handleFocus}
          className="gv-text-field__input"
          onBlur={this.handleBlur}
          disabled={this.props.disabled}
        >
          {date}
        </button>
        <Popover
          anchorEl={this.state.anchorEl}
          onClose={this.handleClose}
          horizontal={this.props.horizontal}
          vertical="bottom"
        >
          <Calendar
            className="gv-datepicker__calendar"
            value={value}
            onChange={this.handleChange}
            locale={this.props.lng}
            minDate={minDate}
            maxDate={maxDate}
          />
        </Popover>
      </div>
    );
  }
}

const DateType = PropTypes.oneOfType([
  PropTypes.instanceOf(Date),
  PropTypes.string,
  PropTypes.object
]);

GVDatePicker.propTypes = {
  value: DateType,
  onChange: PropTypes.func.isRequired,
  minDate: DateType,
  maxDate: DateType,
  horizontal: PropTypes.string
};

GVDatePicker.defaultProps = {
  horizontal: "left"
};

export default translate()(GVDatePicker);
