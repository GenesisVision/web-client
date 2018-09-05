import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class TableContainer extends Component {
  componentDidMount() {
    const { getItems } = this.props;
    getItems();
  }

  render() {
    const { component: TableComponent, ...other } = this.props;
    return <TableComponent {...other} />;
  }
}

const mapStateToProps = state => state;

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { component, service } = ownProps;
  const { itemsData, sorting, paging, filtering } = service.getStorePlace(
    stateProps
  );
  const { isPending, data = {} } = itemsData;
  const serviceWrap = bindActionCreators(service, dispatchProps.dispatch);
  return {
    component,
    isPending,
    data,
    sorting: {
      value: sorting,
      updateSorting: serviceWrap.changeSorting
    },
    paging: {
      total: paging.totalPages,
      current: paging.currentPage,
      updatePaging: serviceWrap.changePage
    },
    filtering: {
      ...filtering,
      updateFilter: serviceWrap.changeFilter
    },
    getItems: serviceWrap.getItems
  };
};

export default connect(
  mapStateToProps,
  null,
  mergeProps
)(TableContainer);
