import React, { Component } from "react";

import TableFilters from "./table-filters";
import { CardsIcon } from "../../../components/icon/cards-icon";
import { TableIcon } from "../../../components/icon/table-icon";

class TableToolbar extends Component {
  render() {
    const { title, renderFilters, updateFilter, filtering } = this.props;
    return (
      <div className="table__toolbar">
        {title && <div className="table__title">{title}</div>}
        {renderFilters && (
          <div className="table__filters">
            {renderFilters(updateFilter, filtering)}
          </div>
        )}
        <div className="table__toolbar__toggle">
          <div onClick={this.handleIconClick("cards")}>
            <CardsIcon primary={this.state.view === "cards"} />
          </div>
          <div onClick={this.handleIconClick("table")}>
            <TableIcon primary={this.state.view === "table"} />
          </div>
        </div>
      </div>
    );
  }
}

export default TableToolbar;
