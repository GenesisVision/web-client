import "./manager-table.scss";

import TableModule from "modules/table/components/table-module";
import { DEFAULT_PAGING } from "modules/table/reducers/table-paging.reducer";
import React, { Component } from "react";
import { translate } from "react-i18next";

class ManagerTable extends Component {
  render() {
    const { data, renderBodyRow, getItems, renderHeader, columns } = this.props;
    let rows = { items: null, total: 0 };
    if (data) {
      rows.items = data.funds || data.programs;
      rows.total = data.total;
    }
    return (
      <TableModule
        fetchOnMount={false}
        data={rows}
        getItems={getItems}
        paging={DEFAULT_PAGING}
        columns={columns}
        renderHeader={renderHeader}
        renderBodyRow={renderBodyRow}
      />
    );
  }
}

export default translate()(ManagerTable);
