import "./manager-table.scss";

import React, { Component } from "react";
import TableModule from "shared/components/table/components/table-module";
import { DEFAULT_PAGING } from "shared/components/table/reducers/table-paging.reducer";

class ManagerTable extends Component {
  render() {
    const {
      data,
      renderBodyRow,
      getItems,
      renderHeader,
      columns,
      title
    } = this.props;

    return (
      <TableModule
        title={title}
        data={data}
        getItems={getItems}
        paging={DEFAULT_PAGING}
        columns={columns}
        renderHeader={renderHeader}
        renderBodyRow={renderBodyRow}
      />
    );
  }
}

export default ManagerTable;
