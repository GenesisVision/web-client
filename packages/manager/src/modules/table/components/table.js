import "shared/components/table/components/table.scss";

import React, { Component } from "react";
import Scrollbars from "react-custom-scrollbars";
import { loadData, saveData } from "shared/utils/localstorage";

import TableBody from "shared/components/table/components/table-body";
import TableFooter from "shared/components/table/components/table-footer";
import TableHeader from "shared/components/table/components/table-header";
import TableToolbar from "shared/components/table/components/table-toolbar";

import {
  TABLE_VIEW,
  CARDS_VIEW,
  PROGRAMS_VIEW
} from "shared/components/table/table.constants";

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
          createButtonToolbar={this.props.createButtonToolbar}
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
                createButtonBody={this.props.createButtonBody}
                createText={this.props.createText}
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
                createButtonBody={this.props.createButtonBody}
                createText={this.props.createText}
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
