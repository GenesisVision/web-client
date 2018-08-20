import "./table.scss";

import React, { Component } from "react";

export const TableContext = React.createContext({
  items: undefined,
  columns: undefined,
  isPending: false
});

class Table extends Component {
  getChildContext() {
    return {
      items: this.props.items,
      columns: this.props.columns,
      isPending: this.props.isPending
    };
  }
  render() {
    return (
      <TableContext.Provider value={{ items: this.props.items }}>
        <div className="table">{this.props.children}</div>
      </TableContext.Provider>
    );
  }
}

export default Table;
