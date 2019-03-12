import * as React from "react";
import { CardsIcon } from "shared/components/icon/cards-icon";
import { TableIcon } from "shared/components/icon/table-icon";
import SortingFilter from "shared/components/table/components/sorting/sorting-filter/sorting-filter";
import { LIST_VIEW } from "../table.constants";
import { SortingColumn } from "./filtering/filter.type";

interface ITableToolbarProps {
  disableTitle: boolean;
  createButtonToolbar: JSX.Element;
  title: JSX.Element | string;
  renderFilters(
    updateFilter: (filter: any) => void,
    filtering: Object
  ): JSX.Element;
  updateFilter(filter: any): void;
  filtering: Object;
  view: LIST_VIEW;
  columns: SortingColumn[];
  sorting: string;
  updateSorting(value: string): void;
  renderSorting(value: SortingColumn): string;
  isViewSwitchEnabled: boolean;
  onChange(view: LIST_VIEW): any;
}

class TableToolbar extends React.Component<ITableToolbarProps> {
  handleIconClick = (view: LIST_VIEW) => () => {
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
          {view === LIST_VIEW.CARDS && sorting !== undefined && (
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
              onClick={this.handleIconClick(LIST_VIEW.CARDS)}
            >
              <CardsIcon primary={view === LIST_VIEW.CARDS} />
            </div>
            <div
              className="table__toggle-icon"
              onClick={this.handleIconClick(LIST_VIEW.TABLE)}
            >
              <TableIcon primary={view === LIST_VIEW.TABLE} />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default TableToolbar;
