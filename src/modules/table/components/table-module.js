import React, { Component } from "react";
import { merge } from "utils/helpers";

import { calculateTotalPages } from "../helpers/paging.helpers";
import { updateFilter } from "../reducers/table-filtering.reducer";
import { composeRequestFilters } from "../services/table.service";
import Table from "./table";

class TableModule extends Component {
  constructor(props) {
    super(props);

    const { paging, sorting, filtering } = this.props;

    this.state = {
      paging: paging,
      sorting: sorting,
      filtering: { ...filtering },
      data: {},
      isPending: true
    };
  }

  state = {
    paging: null,
    sorting: null,
    filtering: null,
    data: { items: null },
    isPending: null
  };

  componentDidMount() {
    this.updateItems();
  }
  updateItems = () => {
    const { paging, sorting, filtering } = this.state;
    const { defaultFilters, getItems } = this.props;

    this.setState({ isPending: true });

    const filters = composeRequestFilters({
      paging,
      sorting,
      filtering,
      defaultFilters
    });

    getItems(filters)
      .then(data => {
        const totalPages = calculateTotalPages(data.total, paging.itemsOnPage);
        this.setState(prevState => ({
          data,
          paging: merge(prevState.paging, { totalPages }),
          isPending: false
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
    this.setState(prevState => {
      return {
        filtering: updateFilter(prevState.filtering, filter),
        paging: merge(prevState.paging, {
          currentPage: 1
        })
      };
    }, this.updateItems);
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
    const { data, isPending } = this.state;

    return (
      <Table
        {...this.props}
        {...this.state}
        items={data.items}
        isPending={isPending}
        updateSorting={this.handleUpdateSorting}
        updatePaging={this.handleUpdatePaging}
        updateFilter={this.handleUpdateFilter}
      />
    );
  }
}

export default TableModule;
