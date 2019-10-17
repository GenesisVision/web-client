import "./table.scss";
import "./table-cards.scss";

import classNames from "classnames";
import React, { useCallback, useEffect, useState } from "react";
import TableBody, {
  ITableBodyExternalProps
} from "shared/components/table/components/table-body";
import TableFooter, {
  ITableFooterProps
} from "shared/components/table/components/table-footer";
import TableHeader, {
  ITableHeaderProps
} from "shared/components/table/components/table-header";
import TableToolbar, {
  ITableToolbarExternalProps
} from "shared/components/table/components/table-toolbar";
import {
  LIST_VIEW,
  PROGRAMS_VIEW
} from "shared/components/table/table.constants";
import { loadData, saveData } from "shared/utils/localstorage";

import { FilteringType } from "./filtering/filter.type";
import { RenderBodyItemFuncType } from "./table.types";

const _Table: React.FC<ITableProps> = ({
  exportButtonToolbarRender,
  updateItems,
  className,
  disableTitle,
  items,
  title,
  renderMappings,
  renderFilters,
  updateFilter,
  filtering,
  columns,
  sorting,
  updateSorting,
  renderHeader,
  renderSorting,
  createButtonToolbar,
  renderBodyCard,
  renderBodyRow,
  paging,
  updatePaging,
  isPending,
  emptyMessage,
  updateRow,
  showSwitchView
}) => {
  const [view, setView] = useState<LIST_VIEW>(LIST_VIEW.TABLE);
  const isViewSwitchEnabled =
    renderBodyRow !== undefined &&
    renderBodyCard !== undefined &&
    !!showSwitchView;
  useEffect(() => {
    if (isViewSwitchEnabled)
      setView(loadData(PROGRAMS_VIEW) || LIST_VIEW.TABLE);
  }, [isViewSwitchEnabled]);
  const changeView = useCallback((view: LIST_VIEW) => {
    saveData(PROGRAMS_VIEW, view);
    setView(view);
  }, []);
  if (!items && emptyMessage) return emptyMessage;
  const renderBodyItem =
    view === LIST_VIEW.CARDS ? renderBodyCard : renderBodyRow;
  return (
    <div className="table-wrapper">
      <TableToolbar
        disableTitle={disableTitle}
        title={title}
        renderMappings={renderMappings}
        renderFilters={renderFilters}
        updateFilter={updateFilter}
        filtering={filtering}
        onChange={changeView}
        view={view}
        columns={columns}
        sorting={sorting}
        updateSorting={updateSorting}
        renderSorting={renderSorting}
        isViewSwitchEnabled={isViewSwitchEnabled}
        createButtonToolbar={createButtonToolbar}
        exportButtonToolbar={
          exportButtonToolbarRender && exportButtonToolbarRender(filtering)
        }
      />
      <div className={"table__scroll"}>
        {view === LIST_VIEW.CARDS && (
          <div className={classNames("table", className)}>
            <TableBody
              isPending={isPending}
              items={items}
              className="table-cards"
              tag="div"
              view={LIST_VIEW.CARDS}
              renderBodyItem={renderBodyItem!}
            />
          </div>
        )}
        {view === LIST_VIEW.TABLE && (
          <table className={classNames("table", className)}>
            <TableHeader
              columns={columns}
              sorting={sorting}
              updateSorting={updateSorting}
              renderHeader={renderHeader}
            />
            <TableBody
              isPending={isPending}
              items={items}
              className="table__body"
              tag="tbody"
              view={LIST_VIEW.TABLE}
              updateRow={updateRow}
              updateItems={updateItems}
              renderBodyItem={renderBodyItem!}
            />
          </table>
        )}
      </div>
      <TableFooter
        condition={paging && !!(paging.totalPages && paging.totalPages >= 2)}
        paging={paging}
        updatePaging={updatePaging}
        isPending={isPending}
      />
    </div>
  );
};

export interface ITableProps
  extends ITableFooterProps,
    ITableToolbarExternalProps,
    ITableBodyExternalProps,
    ITableHeaderProps {
  renderBodyCard?: RenderBodyItemFuncType;
  renderBodyRow?: RenderBodyItemFuncType;
  emptyMessage?: JSX.Element;
  showSwitchView?: boolean;
  exportButtonToolbarRender?: (filtering?: FilteringType) => JSX.Element;
}

const Table = React.memo(_Table);
export default Table;
