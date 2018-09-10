import "./select-filter.scss";

import PropTypes from "prop-types";
import React, { Component } from "react";

import Filter from "../filter";
import SelectFilterPopover from "./select-filter-popover";

class SelectFilter extends Component {
  renderValueText = value =>
    this.props.values.find(x => x.value === value).label;

  render() {
    return (
      <Filter
        label={this.props.label}
        name={this.props.name}
        renderValueText={this.renderValueText}
        value={this.props.value}
        updateFilter={this.props.onChange}
      >
        <SelectFilterPopover values={this.props.values} />
      </Filter>
    );
  }
}

SelectFilter.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.any,
  values: PropTypes.array,
  onChange: PropTypes.func
};

export default SelectFilter;
