import PropTypes from "prop-types";
import React, { PureComponent } from "react";

import { updateFilter } from "shared/components/table//helpers/filtering.helpers";
import { calculateTotalPages } from "shared/components/table//helpers/paging.helpers";
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
      filtering: filtering,
      data: defaultData,
      isPending: false,
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
        props.paging ? props.paging.itemsOnPage : props.data.total
      );
      newState.paging = { ...state.paging, totalPages };
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
          paging: { ...prevState.paging, totalPages },
          isPending: false
        }));
      })
      .catch(e => {
        this.setState({ isPending: false });
      });
  };

  handleUpdateSorting = sorting => {
    this.setState(
      prevState => ({
        sorting: sorting,
        paging: {
          ...prevState.paging,
          currentPage: 1
        }
      }),
      this.updateItems
    );
  };

  handleUpdateFilter = filter => {
    this.setState(prevState => {
      return {
        filtering: updateFilter(prevState.filtering, filter),
        paging: {
          ...prevState.paging,
          currentPage: 1
        }
      };
    }, this.updateItems);
  };

  handleUpdatePaging = nextPageIndex => {
    this.setState(
      prevState => ({
        paging: {
          ...prevState.paging,
          currentPage: nextPageIndex + 1
        }
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

TableModule.propTypes = {
  fetchOnMount: PropTypes.bool,
  paging: PropTypes.object,
  sorting: PropTypes.object,
  filtering: PropTypes.object,
  defaultFilters: PropTypes.object,
  getItems: PropTypes.func,
  data: PropTypes.object
};

TableModule.defaultProps = {
  fetchOnMount: true
};

export default TableModule;
