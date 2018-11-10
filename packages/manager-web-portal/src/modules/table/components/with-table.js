import React, { Component } from "react";
import { merge } from "shared/utils/helpers";

import { updateFilter } from "../helpers/filtering.helpers";
import { calculateTotalPages } from "../helpers/paging.helpers";
import { composeRequestFilters } from "../services/table.service";

const withTable = ({
  fetchOnMount = false,
  getItems,
  itemsData,
  paging,
  sorting,
  filtering,
  defaultFilters
}) => TableComponent => {
  const initialState = {
    data: {},
    isPending: false,
    paging,
    sorting,
    filtering
  };

  if (itemsData) {
    initialState.data = itemsData.data;
    initialState.isPending = itemsData.isPending;
  }

  return class TableContainer extends Component {
    state = initialState;

    componentDidMount() {
      if (fetchOnMount) {
        this.updateItems();
      }
    }

    static getDerivedStateFromProps(props, state) {
      if (props.items !== undefined) {
        return { data: props.items };
      }

      return null;
    }

    updateItems = () => {
      const { paging, sorting, filtering } = this.state;
      const filters = composeRequestFilters({
        paging,
        sorting,
        filtering,
        defaultFilters
      });
      getItems(filters)
        .then(data => {
          const totalPages = calculateTotalPages(
            data.total,
            paging.itemsOnPage
          );
          this.setState(prevState => ({
            data,
            paging: merge(prevState.paging, { totalPages })
          }));
        })
        .catch();
    };

    handleUpdateSorting = sorting => {
      this.setState(
        prevState => ({
          sorting: sorting,
          paging: merge(prevState.paging, {
            currentPage: 1
          })
        }),
        this.updateItems
      );
    };

    handleUpdateFilter = filter => {
      this.setState(
        prevState => ({
          filtering: updateFilter(prevState.filtering, filter),
          paging: merge(prevState.paging, {
            currentPage: 1
          })
        }),
        this.updateItems
      );
    };

    handleUpdatePaging = nextPageIndex => {
      this.setState(
        prevState => ({
          paging: merge(prevState.paging, {
            currentPage: nextPageIndex + 1
          })
        }),
        this.updateItems
      );
    };

    render() {
      return (
        <TableComponent
          {...this.state}
          {...this.props}
          updateSorting={this.handleUpdateSorting}
          updatePaging={this.handleUpdatePaging}
          updateFilter={this.handleUpdateFilter}
        />
      );
    }
  };
};

export default withTable;
