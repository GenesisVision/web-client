import React, { Component } from "react";
import { CardsIcon } from "shared/components/icon/cards-icon";
import { TableIcon } from "shared/components/icon/table-icon";
import SortingFilter from "shared/components/table/components/sorting/sorting-filter/sorting-filter";
import {
  CARDS_VIEW,
  TABLE_VIEW
} from "shared/components/table/table.constants";

class TableToolbar extends Component {
  handleIconClick = view => e => {
    this.props.onChange(view);
  };

  render() {
    const {
      disableTitle,
      createButtonToolbar,
      title,
      renderFilters,
      updateFilter,
      filtering,
      view,
      columns,
      sorting,
      updateSorting,
      renderSorting,
      isViewSwitchEnabled
    } = this.props;
    return (
      <div className="table__toolbar">
        {title && !disableTitle && <h3 className="table__title">{title}</h3>}
        <div className="table__filters">
          {view === CARDS_VIEW && sorting !== undefined && (
            <SortingFilter
              sorting={sorting}
              columns={columns}
              updateSorting={updateSorting}
              renderValueText={renderSorting}
            />
          )}
          {renderFilters && renderFilters(updateFilter, filtering)}
          {createButtonToolbar}
        </div>
        {isViewSwitchEnabled && (
          <div className="table__toggle">
            <div
              className="table__toggle-icon"
              onClick={this.handleIconClick(CARDS_VIEW)}
            >
              <CardsIcon primary={view === CARDS_VIEW} />
            </div>
            <div
              className="table__toggle-icon"
              onClick={this.handleIconClick(TABLE_VIEW)}
            >
              <TableIcon primary={view === TABLE_VIEW} />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default TableToolbar;
