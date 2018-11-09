import "./table.scss";

import React, { Component } from "react";
import Scrollbars from "react-custom-scrollbars";
import { loadData, saveData } from "utils/localstorage";

import TableBody from "./table-body";
import TableFooter from "./table-footer";
import TableHeader from "./table-header";
import TableToolbar from "./table-toolbar";

export const TABLE_VIEW = "table_view";
export const CARDS_VIEW = "cards_view";
export const PROGRAMS_VIEW = "programs_view";

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
    this.props.renderBodyRow !== undefined &&
    this.props.renderBodyCard !== undefined;

  renderTrackVertical = () => <span className="table__vertical-track" />;

  render() {
    const { view } = this.state;
    return (
      <div className="table-wrapper">
        <TableToolbar
          title={this.props.title}
          renderFilters={this.props.renderFilters}
          updateFilter={this.props.updateFilter}
          filtering={this.props.filtering}
          onChange={this.changeView}
          view={view}
          columns={this.props.columns}
          sorting={this.props.sorting}
          updateSorting={this.props.updateSorting}
          renderHeader={this.props.renderHeader}
          isViewSwitchEnabled={this.isViewSwitchEnabled}
        />
        <Scrollbars
          autoHeight
          autoHeightMax={14000}
          renderTrackVertical={this.renderTrackVertical}
        >
          {view === CARDS_VIEW && (
            <div className="table">
              <TableBody
                items={this.props.items}
                className="programs-cards"
                tag="div"
              >
                {this.props.renderBodyCard}
              </TableBody>
            </div>
          )}
          {view === TABLE_VIEW && (
            <table className="table">
              <TableHeader
                columns={this.props.columns}
                sorting={this.props.sorting}
                updateSorting={this.props.updateSorting}
              >
                {this.props.renderHeader}
              </TableHeader>
              <TableBody
                items={this.props.items}
                className="table__body"
                tag="tbody"
              >
                {this.props.renderBodyRow}
              </TableBody>
            </table>
          )}
        </Scrollbars>
        {this.props.paging && (
          <TableFooter
            paging={this.props.paging}
            updatePaging={this.props.updatePaging}
            isPending={this.props.isPending}
          />
        )}
      </div>
    );
  }
}

export default Table;
