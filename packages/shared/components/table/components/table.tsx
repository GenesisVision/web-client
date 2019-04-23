import "./table.scss";
import "./table-cards.scss";

import classNames from "classnames";
import * as React from "react";
import GVScroll from "shared/components/scroll/gvscroll";
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

import { RenderBodyItemFuncType } from "./table.types";

export interface ITableProps<TItem, TFiltering>
  extends ITableFooterProps,
    ITableToolbarExternalProps<TFiltering>,
    ITableBodyExternalProps<TItem>,
    ITableHeaderProps {
  renderBodyCard?: RenderBodyItemFuncType<TItem>;
  renderBodyRow?: RenderBodyItemFuncType<TItem>;
  emptyMessage?: JSX.Element | string;
  showSwitchView?: boolean;
}

interface ITableState {
  view: LIST_VIEW;
}

class Table<TItem, TFiltering> extends React.PureComponent<
  ITableProps<TItem, TFiltering>,
  ITableState
> {
  static defaultProps = {
    isPending: false
  };

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
                renderBodyItem={renderBodyCard}
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
                renderBodyItem={renderBodyRow}
              />
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

/*type Type<T> = {
  name: T;
};

type P = {
  name: string;
};
interface P1 {
  name: string;
}
let t: Type<{}> = { name: {} };
let t2: Type<Partial<P1>> = t;*/
