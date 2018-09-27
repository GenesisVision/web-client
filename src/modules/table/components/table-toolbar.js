import React, { Component } from "react";

import TableFilters from "./table-filters";
import { CardsIcon } from "../../../components/icon/cards-icon";
import { TableIcon } from "../../../components/icon/table-icon";

class TableToolbar extends Component {
  state = {
    view: "table"
  };
  handleIconClick = view => e => {
    this.setState({ view });
    this.props.onChange(view);
  };

  render() {
    const {
      title,
      renderFilters,
      renderSorting,
      updateFilter,
      filtering,
      view,
      sorting,
      updateSorting
    } = this.props;
    return (
      <div className="table__toolbar">
        {title && <div className="table__title">{title}</div>}
        {view === "cards" && (
          <div className="table__filters">
            {renderSorting(sorting, updateSorting)}
          </div>
        )}
        {renderFilters && (
          <div className="table__filters">
            {renderFilters(updateFilter, filtering)}
          </div>
        )}
        <div className="table__toggle">
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
