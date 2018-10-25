import React, { PureComponent } from "react";
import { merge } from "utils/helpers";

import { updateFilter } from "../helpers/filtering.helpers";
import { calculateTotalPages } from "../helpers/paging.helpers";
import { composeRequestFilters } from "../services/table.service";
import Table from "./table";

const defaultData = { items: null, total: 0 };

class TableModule extends PureComponent {
  constructor(props) {
    super(props);

    const { paging, sorting, filtering } = this.props;

    this.state = {
      paging: paging,
      sorting: sorting,
      filtering: { ...filtering },
      data: defaultData,
      isPending: false,
      errorCode: null,
      prevData: defaultData
    };
  }

  static getDerivedStateFromProps(props, state) {
    let newState = {};
    if (props.data !== undefined && state.prevData !== props.data) {
      state.prevData = props.data;
      newState.data = props.data;

      const totalPages = calculateTotalPages(
        props.data.total,
        props.paging.itemsOnPage
      );
      newState.paging = merge(state.paging, { totalPages });
    }
    return newState;
  }

  componentDidMount() {
    if (this.props.fetchOnMount) {
      this.updateItems();
    }
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
          paging: merge(prevState.paging, { totalPages })
        }));
      })
      .catch(e => {
        this.setState({ errorCode: e.errorCode });
      })
      .finally(() => {
        this.setState({ isPending: false });
      });
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

TableModule.defaultProps = {
  fetchOnMount: true
};

export default TableModule;
