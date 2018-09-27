import "./select-sorting.scss";

import PropTypes from "prop-types";
import React, { Component } from "react";

import SelectSortingPopover from "./select-sorting-popover";
import Filter from "../filtering/filter";
import { getSortingColumnName } from "../../helpers/sorting.helpers";

class SelectSorting extends Component {
  renderValueText = value =>
    this.props.values.find(x => x.sortingName === getSortingColumnName(value))
      .name;

  render() {
    return (
      <Filter
        label={this.props.label}
        name={this.props.name}
        renderValueText={this.renderValueText}
        value={this.props.value}
        updateFilter={this.props.onChange}
      >
        <SelectSortingPopover values={this.props.values} />
      </Filter>
    );
  }
}

SelectSorting.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.any,
  values: PropTypes.array,
  onChange: PropTypes.func
};

export default SelectSorting;
