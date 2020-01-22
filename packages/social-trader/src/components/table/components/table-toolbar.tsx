import { CardsIcon } from "components/icon/cards-icon";
import { TableIcon } from "components/icon/table-icon";
import SortingFilter from "components/table/components/sorting/sorting-filter/sorting-filter";
import { TableToolbarItemBlock } from "components/table/components/table-toolbar-item.block";
import React, { useCallback } from "react";

import { LIST_VIEW } from "../table.constants";
import { FilteringType, SortingColumn } from "./filtering/filter.type";
import {
  RenderFiltersFuncType,
  RenderSortingFuncType,
  UpdateFilterFunc,
  UpdateSortingFuncType
} from "./table.types";

const _TableToolbar: React.FC<
  ITableToolbarExternalProps & ITableToolbarInnerProps
> = ({
  onChange,
  disableTitle,
  createButtonToolbar,
  exportButtonToolbar,
  title,
  renderMappings,
  renderFilters,
  updateFilter,
  filtering,
  view,
  columns,
  sorting,
  updateSorting,
  renderSorting,
  isViewSwitchEnabled,
  hide
}) => {
  const handleIconClick = useCallback(
    (view: LIST_VIEW) => () => {
      onChange(view);
    },
    [onChange]
  );

  if (hide) return null;

  return (
    <div className="table__toolbar">
      <TableToolbarItemBlock className="table__toolbar-heading">
        {title && !disableTitle && (
          <TableToolbarItemBlock>
            <h3 className="table__title">{title}</h3>
          </TableToolbarItemBlock>
        )}
        {renderMappings && updateFilter && filtering && (
          <TableToolbarItemBlock className="table__filters table__filters--mapping">
            {renderMappings(updateFilter, filtering)}
          </TableToolbarItemBlock>
        )}
      </TableToolbarItemBlock>
      {view === LIST_VIEW.CARDS && sorting !== undefined && (
        <SortingFilter
          sorting={sorting}
          columns={columns}
          updateSorting={updateSorting}
          renderValueText={renderSorting}
        />
      )}
      <TableToolbarItemBlock className="table__filters">
        <TableToolbarItemBlock className="table__filters">
          {renderFilters &&
            updateFilter &&
            filtering &&
            renderFilters(updateFilter, filtering)}
          {createButtonToolbar}
          {exportButtonToolbar}
        </TableToolbarItemBlock>
        {isViewSwitchEnabled && (
          <TableToolbarItemBlock className="table__toggle">
            <div
              className="table__toggle-icon"
              onClick={handleIconClick(LIST_VIEW.CARDS)}
            >
              <CardsIcon primary={view === LIST_VIEW.CARDS} />
            </div>
            <div
              className="table__toggle-icon"
              onClick={handleIconClick(LIST_VIEW.TABLE)}
            >
              <TableIcon primary={view === LIST_VIEW.TABLE} />
            </div>
          </TableToolbarItemBlock>
        )}
      </TableToolbarItemBlock>
    </div>
  );
};

interface ITableToolbarInnerProps {
  view: LIST_VIEW;
  isViewSwitchEnabled: boolean;
  onChange(view: LIST_VIEW): any;
  exportButtonToolbar?: JSX.Element;
}

export interface ITableToolbarExternalProps {
  disableTitle?: boolean;
  createButtonToolbar?: JSX.Element;
  title?: JSX.Element | string;
  renderMappings?: RenderFiltersFuncType;
  renderFilters?: RenderFiltersFuncType;
  updateFilter?: UpdateFilterFunc;
  filtering?: FilteringType;
  columns?: SortingColumn[];
  sorting?: string;
  updateSorting?: UpdateSortingFuncType;
  renderSorting?: RenderSortingFuncType;
  hide?: boolean;
}

const TableToolbar = React.memo(_TableToolbar);
export default TableToolbar;
