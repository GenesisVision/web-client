import { CardsIcon } from "shared/components/icon/cards-icon";
import { TableIcon } from "shared/components/icon/table-icon";
import React, { Component } from "react";

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
      createButtonToolbar,
      title,
      renderFilters,
      updateFilter,
      filtering,
      view,
      columns,
      sorting,
      updateSorting,
      renderHeader,
      isViewSwitchEnabled
    } = this.props;
    return (
      <div className="table__toolbar">
        {title && <h3 className="table__title">{title}</h3>}
        <div className="table__filters">
          {view === CARDS_VIEW && sorting !== undefined && (
            <SortingFilter
              sorting={sorting}
              columns={columns}
              updateSorting={updateSorting}
              renderValueText={renderHeader}
            />
          )}
          {renderFilters && renderFilters(updateFilter, filtering)}
        </div>
        {isViewSwitchEnabled && (
          <div className="table__toggle">
            <div onClick={this.handleIconClick(CARDS_VIEW)}>
              <CardsIcon primary={view === CARDS_VIEW} />
            </div>
            <div onClick={this.handleIconClick(TABLE_VIEW)}>
              <TableIcon primary={view === TABLE_VIEW} />
            </div>
          </div>
        )}
        {createButtonToolbar}
      </div>
    );
  }
}

export default TableToolbar;
