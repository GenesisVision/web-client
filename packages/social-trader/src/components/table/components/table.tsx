import { ITableBodyContainerExternalProps } from "components/table/components/table-body";
import TableFooter, { ITableFooterProps } from "components/table/components/table-footer";
import TableHeader, { ITableHeaderProps } from "components/table/components/table-header";
import TableToolbar, { ITableToolbarExternalProps } from "components/table/components/table-toolbar";
import { LIST_VIEW } from "components/table/table.constants";
import React, { useCallback, useState } from "react";
import styled, { css } from "styled-components";
import { mediaBreakpointLandscapePhone } from "utils/style/media";
import { adaptivePadding } from "utils/style/mixins";
import { $paddingSmall, $paddingXsmall } from "utils/style/sizes";
import { setTableView } from "utils/table-view";

import { FilteringType } from "./filtering/filter.type";
import TableBodyContainer from "./table-body";
import { RenderBodyItemFuncType } from "./table.types";

const Scroll = styled.div`
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
`;

const TableStyles = css`
  width: 100%;
  border-spacing: 0;
`;

const CardsContaniner = styled.div`
  ${TableStyles}
`;

const TablesContaniner = styled.table`
  ${TableStyles}
`;

const CardsTableBodyContainer = styled(TableBodyContainer)`
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding-left: 0;
  ${adaptivePadding("top", $paddingXsmall)};
  ${mediaBreakpointLandscapePhone(`padding-left: ${$paddingSmall}px;
    padding-right: ${$paddingSmall - $paddingSmall / 2}px;`)}
`;

const _Table: React.FC<ITableProps> = ({
  headerCellClassName,
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
    <div>
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
      <Scroll>
        {view === LIST_VIEW.CARDS && (
          <CardsContaniner className={className}>
            <CardsTableBodyContainer
              updateRow={updateRow}
              updateItems={updateItems}
              loaderData={loaderData}
              isPending={isPending}
              items={items}
              tag="div"
              view={view}
              renderBodyItem={renderBodyItem!}
            />
          </CardsContaniner>
        )}
        {view === LIST_VIEW.TABLE && (
          <TablesContaniner className={className}>
            <TableHeader
              headerCellClassName={headerCellClassName}
              columns={columns}
              sorting={sorting}
              updateSorting={updateSorting}
              renderHeader={renderHeader}
            />
            <TableBodyContainer
              loaderData={loaderData}
              isPending={isPending}
              items={items}
              tag="tbody"
              view={view}
              updateRow={updateRow}
              updateItems={updateItems}
              renderBodyItem={renderBodyItem!}
            />
          </TablesContaniner>
        )}
      </Scroll>
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
