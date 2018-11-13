import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { merge } from "shared/utils/helpers";

import { updateFilter } from "shared/components/table/helpers/filtering.helpers";
import Table from "./table";

class TableContainer extends Component {
  constructor(props) {
    super(props);

    const { paging, sorting, filtering } = this.props;

    this.state.defaultFilters = { paging, sorting, filtering };
  }

  state = {
    defaultFilters: null
  };

  componentDidMount() {
    if (this.props.isFetchOnMount) {
      this.updateItems();
    }
  }

  componentWillUnmount() {
    if (this.props.isResetToDefaultOnUnmount) {
      this.props.updateFilters(this.state.defaultFilters);
    }
  }

  updateItems = changedFilters => {
    const { getItems, paging, sorting, filtering } = this.props;

    const filters = {
      paging,
      sorting,
      filtering,
      ...changedFilters
    };

    getItems(filters);
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
    const items = data && data.items;

    return (
      <Table
        {...this.props}
        items={items || []}
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
    itemsData = { isPending: false, data: { items: [] } },
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

const mapDispatchToProps = (dispatch, { getItems, updateFilters }) => ({
  ...bindActionCreators({ getItems, updateFilters }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableContainer);
