import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { merge } from "utils/helpers";

import { updateFilter } from "../helpers/filtering.helpers";
import { composeRequestFilters } from "../services/table.service";
import Table from "./table";

class TableContainer extends Component {
  componentDidMount() {
    if (this.props.isFetchOnMount) {
      this.updateItems();
    }
  }

  updateItems = (changedFilters = {}) => {
    const { defaultFilters, getItems, paging, sorting, filtering } = this.props;

    const filters = composeRequestFilters({
      paging,
      sorting,
      filtering,
      defaultFilters,
      ...changedFilters
    });

    getItems(filters);

    // обновить пейджинг.
    // .then(data => {
    //   const totalPages = calculateTotalPages(data.total, paging.itemsOnPage);
    //   this.setState(prevState => ({
    //     data,
    //     paging: merge(prevState.paging, { totalPages })
    //   }));
    // })
  };

  handleUpdateSorting = sorting => {
    this.updateItems({
      sorting,
      paging: merge(this.props.paging, {
        currentPage: 1
      })
    });
  };

  handleUpdateFilter = filter => {
    let changedFilters = {
      filtering: updateFilter(this.props.filtering, filter),
      paging: merge(this.props.paging, {
        currentPage: 1
      })
    };

    this.updateItems(changedFilters);
  };

  handleUpdatePaging = nextPageIndex => {
    let changedFilters = {
      paging: merge(this.props.paging, {
        currentPage: nextPageIndex + 1
      })
    };

    this.updateItems(changedFilters);
  };

  render() {
    const { data } = this.props;
    return (
      <Table
        {...this.props}
        items={data ? data.items : []}
        updateSorting={this.handleUpdateSorting}
        updatePaging={this.handleUpdatePaging}
        updateFilter={this.handleUpdateFilter}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let storePlace = ownProps.getStorePlace(state);
  const {
    itemsData = { isPending: false, data: { items: [], total: 0 } },
    filters
  } = storePlace;

  const { sorting, paging, filtering } = filters;
  return {
    data: itemsData.data,
    sorting,
    paging,
    filtering,
    isPending: itemsData.isPending
  };
};

const mapDispatchToProps = (dispatch, { getItems }) => ({
  ...bindActionCreators({ getItems }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableContainer);
