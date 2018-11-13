import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const withTableContainer = (service, getStorePlace) => TableComponent => {
  class TableContainer extends Component {
    componentDidMount() {
      const { getItems } = this.props;
      getItems();
    }

    render() {
      return <TableComponent {...this.props} />;
    }
  }

  const mapStateToProps = state => {
    const { itemsData, sorting, paging, filtering } = getStorePlace(state);
    const { isPending, data = {} } = itemsData;
    return {
      isPending,
      data,
      sorting,
      paging,
      filtering
    };
  };

  const mapDispatchToProps = dispatch => ({
    ...bindActionCreators(service, dispatch)
  });

  const mergeProps = (stateProps, dispatchProps, ownProps) => {
    return {
      isPending: stateProps.isPending,
      data: stateProps.data,
      sorting: stateProps.sorting,
      updateSorting: dispatchProps.changeSorting,
      paging: stateProps.paging,
      updatePaging: dispatchProps.changePage,
      filtering: stateProps.filtering,
      updateFilter: dispatchProps.changeFilter,
      getItems: dispatchProps.getItems,
      ...ownProps
    };
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
  )(TableContainer);
};

export default withTableContainer;
