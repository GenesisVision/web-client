import classnames from "classnames";
import { GVButton } from "gv-react-components";
import React, { Component } from "react";
import {
  getSortingColumnName,
  isSortingAsc
} from "../../helpers/sorting.helpers";

class SelectSortingPopover extends Component {
  sortingName = value => getSortingColumnName(value);
  isAsc = value => isSortingAsc(value);
  handleSorting = sortingName => e => {
    if (
      sortingName.sortingName !== this.sortingName(this.props.value) ||
      this.isAsc(this.props.value)
    ) {
      return this.props.changeSorting(sortingName.sortingName + "Desc");
    }
    return this.props.changeSorting(sortingName.sortingName + "Asc");
  };
  getDirection = item =>
    item.sortingName === this.sortingName(this.props.value) ? (
      this.isAsc(this.props.value) ? (
        <span>&nbsp; &uarr;</span>
      ) : (
        <span>&nbsp; &darr;</span>
      )
    ) : (
      ""
    );
  render() {
    const { values, value } = this.props;
    return (
      <div className="select-filter">
        {values.map((item, idItem) => {
          const selected = item.sortingName === this.sortingName(value);
          return (
            <GVButton
              variant="text"
              color={classnames({
                primary: selected,
                secondary: !selected
              })}
              key={idItem}
              onClick={this.handleSorting(item)}
            >
              {item.name}
              {this.getDirection(item)}
            </GVButton>
          );
        })}
      </div>
    );
  }
}

export default SelectSortingPopover;
