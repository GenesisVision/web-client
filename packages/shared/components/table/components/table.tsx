import "./table.scss";
import "./table-cards.scss";

import classNames from "classnames";
import * as React from "react";
import GVScroll from "shared/components/scroll/gvscroll";
import TableBody from "shared/components/table/components/table-body";
import TableFooter from "shared/components/table/components/table-footer";
import TableHeader from "shared/components/table/components/table-header";
import TableToolbar from "shared/components/table/components/table-toolbar";
import {
  LIST_VIEW,
  PROGRAMS_VIEW
} from "shared/components/table/table.constants";
import { loadData, saveData } from "shared/utils/localstorage";

import { IPaging } from "../helpers/paging.helpers";
import { FilteringType, SortingColumn } from "./filtering/filter.type";

interface ITableProps {
  updateFilter(filter: any): void;
  updateSorting(opt: string): ((dispatch: any, getState: any) => void) | void;
  updatePaging(page: number): void;
  items: any[];
  filtering: FilteringType;
  sorting: string;
  paging: IPaging;
  renderHeader?(column: SortingColumn): JSX.Element;
  renderSorting?(value: SortingColumn): JSX.Element | string;
  updateRow?(row: any): void;
  renderFilters?(
    updateFilter: (filter: any) => void,
    filtering: FilteringType
  ): JSX.Element;
  updateItems?(): void;
  renderBodyCard?(
    x: any,
    updateRow?: (row: any) => void,
    updateItems?: () => void
  ): JSX.Element;
  renderBodyRow?(
    x: any,
    updateRow?: (row: any) => void,
    updateItems?: () => void
  ): JSX.Element;
  isPending?: boolean;
  emptyMessage?: JSX.Element | string;
  showSwitchView?: boolean;
  columns?: SortingColumn[];
  title?: JSX.Element | string;
  className?: string;
  disableTitle?: boolean;
  createButtonToolbar?: JSX.Element;
}

interface ITableState {
  view: LIST_VIEW;
}

class Table extends React.Component<ITableProps, ITableState> {
  state = {
    view: LIST_VIEW.TABLE
  };

  componentDidMount() {
    if (this.isViewSwitchEnabled)
      this.setState({
        view: (loadData(PROGRAMS_VIEW) as LIST_VIEW) || LIST_VIEW.TABLE
      });
  }

  changeView = (view: LIST_VIEW) => {
    saveData(PROGRAMS_VIEW, view);
    this.setState({ view });
  };

  isViewSwitchEnabled =
    this.props.renderBodyRow !== undefined &&
    this.props.renderBodyCard !== undefined &&
    !!this.props.showSwitchView;

  renderTrackVertical = (): JSX.Element => (
    <span className="table__vertical-track" />
  );

  render() {
    const { view } = this.state;
    const {
      updateItems,
      className,
      disableTitle,
      items,
      title,
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
      updateRow
    } = this.props;
    if (!items && emptyMessage) return emptyMessage;
    return (
      <div className="table-wrapper">
        <TableToolbar
          disableTitle={disableTitle}
          title={title}
          renderFilters={renderFilters}
          updateFilter={updateFilter}
          filtering={filtering}
          onChange={this.changeView}
          view={view}
          columns={columns}
          sorting={sorting}
          updateSorting={updateSorting}
          renderSorting={renderSorting}
          isViewSwitchEnabled={this.isViewSwitchEnabled}
          createButtonToolbar={createButtonToolbar}
        />
        <GVScroll
          autoHeight
          autoHeightMax={14000}
          renderTrackVertical={this.renderTrackVertical}
        >
          {view === LIST_VIEW.CARDS && (
            <div className={classNames("table", className)}>
              <TableBody
                items={items}
                className="table-cards"
                tag="div"
                view={LIST_VIEW.CARDS}
              >
                {renderBodyCard}
              </TableBody>
            </div>
          )}
          {view === LIST_VIEW.TABLE && (
            <table className={classNames("table", className)}>
              <TableHeader
                columns={columns}
                sorting={sorting}
                updateSorting={updateSorting}
              >
                {renderHeader}
              </TableHeader>
              <TableBody
                isPending={isPending}
                items={items}
                className="table__body"
                tag="tbody"
                view={LIST_VIEW.TABLE}
                updateRow={updateRow}
                updateItems={updateItems}
              >
                {renderBodyRow}
              </TableBody>
            </table>
          )}
        </GVScroll>
        {paging && (
          <TableFooter
            paging={paging}
            updatePaging={updatePaging}
            isPending={isPending}
          />
        )}
      </div>
    );
  }
}

export default Table;
