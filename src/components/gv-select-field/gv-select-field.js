import "./gv-select-field.scss";

import classnames from "classnames";
import Select from "components/select/select";
import PropTypes from "prop-types";
import React, { Component } from "react";

class GVSelectField extends Component {
  handleBlur = () => {
    this.props.onBlur(this.props.name, true);
  };
  handleFocus = event => {
    this.props.onFocus(event);
  };
  handleChange = value => {
    if (this.props.onChange) {
      this.props.onChange(value, this.props.name);
    }
  };
  render() {
    return (
      <Select
        className={classnames("gv-text-field__input", "gv-select-field")}
        value={this.props.value}
        onChange={this.handleChange}
        onOpen={this.handleFocus}
        onClose={this.handleBlur}
        name={this.props.name}
      >
        {this.props.children}
      </Select>
    );
  }
}

GVSelectField.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  name: PropTypes.string.isRequired
};

export default GVSelectField;
