import clsx from "clsx";
import { ITableBodyContainerExternalProps } from "components/table/components/table-body";
import TableFooter, {
  ITableFooterProps
} from "components/table/components/table-footer";
import TableHeader, {
  ITableHeaderProps
} from "components/table/components/table-header";
import TableToolbar, {
  ITableToolbarExternalProps
} from "components/table/components/table-toolbar";
import { LIST_VIEW } from "components/table/table.constants";
import React, { useCallback, useState } from "react";
import { setTableView } from "utils/table-view";

import { FilteringType } from "./filtering/filter.type";
import TableBodyContainer from "./table-body";
import cardsStyles from "./table-cards.module.scss";
import tableStyles from "./table.module.scss";
import { RenderBodyItemFuncType } from "./table.types";

const _Table: React.FC<ITableProps> = ({
  outerView,
  loaderData,
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
  showSwitchView,
  hideToolbar,
  asLinkPagination
}) => {
  const isViewSwitchEnabled =
    renderBodyRow !== undefined &&
    renderBodyCard !== undefined &&
    !!showSwitchView;
  const [view, setView] = useState<LIST_VIEW>(outerView || LIST_VIEW.TABLE);
  const changeView = useCallback((view: LIST_VIEW) => {
    setTableView(view);
    setView(view);
  }, []);
  if (!items && emptyMessage) return emptyMessage;
  const renderBodyItem =
    view === LIST_VIEW.CARDS ? renderBodyCard : renderBodyRow;
  return (
    <div className={tableStyles["table-wrapper"]}>
      <TableToolbar
        hide={hideToolbar}
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
      <div className={tableStyles["table__scroll"]}>
        {view === LIST_VIEW.CARDS && (
          <div className={clsx(tableStyles["table"], className)}>
            <TableBodyContainer
              updateRow={updateRow}
              updateItems={updateItems}
              loaderData={loaderData}
              isPending={isPending}
              items={items}
              className={cardsStyles["table-cards"]}
              tag="div"
              view={view}
              renderBodyItem={renderBodyItem!}
            />
          </div>
        )}
        {view === LIST_VIEW.TABLE && (
          <table className={clsx(tableStyles["table"], className)}>
            <TableHeader
              columns={columns}
              sorting={sorting}
              updateSorting={updateSorting}
              renderHeader={renderHeader}
            />
            <TableBodyContainer
              loaderData={loaderData}
              isPending={isPending}
              items={items}
              className={tableStyles["table__body"]}
              tag="tbody"
              view={view}
              updateRow={updateRow}
              updateItems={updateItems}
              renderBodyItem={renderBodyItem!}
            />
          </table>
        )}
      </div>
      <TableFooter
        asLinkPagination={asLinkPagination}
        condition={!!paging && !!(paging.totalPages && paging.totalPages >= 2)}
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
    ITableBodyContainerExternalProps,
    ITableHeaderProps {
  outerView?: LIST_VIEW;
  hideToolbar?: boolean;
  renderBodyCard?: RenderBodyItemFuncType;
  renderBodyRow?: RenderBodyItemFuncType;
  emptyMessage?: JSX.Element;
  showSwitchView?: boolean;
  exportButtonToolbarRender?: (filtering?: FilteringType) => JSX.Element;
}

const Table = React.memo(_Table);
export default Table;
