import "shared/components/table/components/table.scss";

import React, { Component } from "react";
import Scrollbars from "react-custom-scrollbars";
import TableBody from "shared/components/table/components/table-body";
import TableFooter from "shared/components/table/components/table-footer";
import TableHeader from "shared/components/table/components/table-header";
import TableToolbar from "shared/components/table/components/table-toolbar";
import {
  CARDS_VIEW,
  PROGRAMS_VIEW,
  TABLE_VIEW
} from "shared/components/table/table.constants";
import { loadData, saveData } from "shared/utils/localstorage";

class Table extends Component {
  state = {
    view: TABLE_VIEW
  };

  componentDidMount() {
    if (this.isViewSwitchEnabled)
      this.setState({ view: loadData(PROGRAMS_VIEW) || TABLE_VIEW });
  }

  changeView = view => {
    saveData(PROGRAMS_VIEW, view);
    this.setState({ view });
  };

  isViewSwitchEnabled =
    this.props.showSwitchView &&
    this.props.renderBodyRow !== undefined &&
    this.props.renderBodyCard !== undefined;

  renderTrackVertical = () => <span className="table__vertical-track" />;

  render() {
    const { view } = this.state;
    const {
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
      createButtonToolbar,
      renderBodyCard,
      renderBodyRow,
      paging,
      updatePaging,
      isPending,
      emptyMessage
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
          renderHeader={renderHeader}
          isViewSwitchEnabled={this.isViewSwitchEnabled}
          createButtonToolbar={createButtonToolbar}
        />
        <Scrollbars
          autoHeight
          autoHeightMax={14000}
          renderTrackVertical={this.renderTrackVertical}
        >
          {view === CARDS_VIEW && (
            <div className="table">
              <TableBody
                items={items}
                className="programs-cards"
                tag="div"
                view={CARDS_VIEW}
              >
                {renderBodyCard}
              </TableBody>
            </div>
          )}
          {view === TABLE_VIEW && (
            <table className="table">
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
                view={TABLE_VIEW}
              >
                {renderBodyRow}
              </TableBody>
            </table>
          )}
        </Scrollbars>
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
