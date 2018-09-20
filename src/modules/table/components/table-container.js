import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Table from "./table";

class TableContainer extends Component {
  componentDidMount() {
    if (this.props.isFetchOnMount) {
      this.updateItems();
    }
  }

  render() {
    const { data } = this.props;

    return <Table {...this.props} items={data.items} />;
  }
}

const mapStateToProps = (state, ownProps) => {
  const {
    itemsData = { isPending: false, data: { items: [], total: 0 } },
    sorting,
    paging,
    filtering
  } = ownProps.getStorePlace(state);
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
