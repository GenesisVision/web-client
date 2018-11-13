import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import React, { PureComponent } from "react";

import { updateFilter } from "shared/components/table/helpers/filtering.helpers";

import Table from "./table";

import { updateFilters, getItems } from "../services/table.service";

class TableContainer extends PureComponent {
  componentDidMount() {
    if (this.props.isFetchOnMount) {
      this.updateItems();
    }
  }

  updateItems = changedFilters => {
    const { service, dataSelector, fetchItems, defaults } = this.props;
    service.updateFilters(changedFilters, defaults.type);
    service.getItems(fetchItems, dataSelector);
  };

  handleUpdateSorting = sorting => {
    this.updateItems({
      sorting,
      paging: {
        ...this.props.paging,
        currentPage: 1
      }
    });
  };

  handleUpdateFilter = filter => {
    let changedFilters = {
      filtering: updateFilter(this.props.filtering, filter),
      paging: {
        ...this.props.paging,
        currentPage: 1
      }
    };

    this.updateItems(changedFilters);
  };

  handleUpdatePaging = nextPageIndex => {
    let changedFilters = {
      paging: {
        ...this.props.paging,
        currentPage: nextPageIndex + 1
      }
    };

    this.updateItems(changedFilters);
  };

  render() {
    const { data, isPending, ...otherProps } = this.props;
    return (
      <Table
        {...otherProps}
        items={data.items}
        isPending={isPending}
        updateSorting={this.handleUpdateSorting}
        updatePaging={this.handleUpdatePaging}
        updateFilter={this.handleUpdateFilter}
      />
    );
  }
}

const mapStateToProps = (state, props) => {
  const selector = props.dataSelector(state);
  const { itemsData, filters, defaults } = selector;
  const { sorting, paging, filtering } = filters;

  return {
    data: itemsData.data,
    isPending: itemsData.isPending,
    sorting,
    paging,
    filtering,
    fetchItems: props.getItems,
    defaults
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return { service: bindActionCreators({ getItems, updateFilters }, dispatch) };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableContainer);
