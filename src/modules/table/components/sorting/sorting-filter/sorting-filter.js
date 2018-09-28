import "./sorting-filter.scss";

import { GVButton } from "gv-react-components";
import PropTypes from "prop-types";
import React, { Component } from "react";

import {
  SortingDirection,
  getSortingColumnName,
  getSortingDirection
} from "../../../helpers/sorting.helpers";
import SelectFilter from "../../filtering/select-filter/select-filter";

class SortingFilter extends Component {
  composeSortingColumnValues = () => {
    const { columns, renderValueText } = this.props;
    return columns
      .filter(x => x.sortingName)
      .map(x => ({ value: x.sortingName, label: renderValueText(x) }));
  };

  composeSortingColumnName = () => {
    const { sorting } = this.props;
    return getSortingColumnName(sorting);
  };

  isAsc = () => {
    const { sorting } = this.props;
    return getSortingDirection(sorting) === SortingDirection.asc;
  };

  handleOnSelectChange = ({ value }) => {
    const { updateSorting } = this.props;
    updateSorting(
      value + (this.isAsc() ? SortingDirection.asc : SortingDirection.desc)
    );
  };

  handleOnDirectionChange = isAsc => () => {
    const { updateSorting } = this.props;
    updateSorting(
      this.composeSortingColumnName() +
        (isAsc ? SortingDirection.asc : SortingDirection.desc)
    );
  };

  render() {
    const columnValues = this.composeSortingColumnValues();
    return (
      <span className="sorting-filter">
        <SelectFilter
          name="sorting"
          label="Order By"
          value={this.composeSortingColumnName()}
          values={columnValues}
          onChange={this.handleOnSelectChange}
        />
        <GVButton
          variant="text"
          color="secondary"
          className="sorting-filter__btn"
          onClick={this.handleOnDirectionChange(!this.isAsc())}
        >
          {this.isAsc() ? <span>&uarr;</span> : <span>&darr;</span>}
        </GVButton>
      </span>
    );
  }
}

// SortingFilter.propTypes = {
//   name: PropTypes.string.isRequired,
//   label: PropTypes.string.isRequired,
//   value: PropTypes.any,
//   values: PropTypes.array,
//   onChange: PropTypes.func
// };

export default SortingFilter;
