import "./table.scss";
import React, { Component } from "react";
import Scrollbars from "react-custom-scrollbars";

import TableBody from "./table-body";
import TableFooter from "./table-footer";
import TableHeader from "./table-header";
import TableToolbar from "./table-toolbar";
import ProgramsCards from "../../programs-table/components/programs-table/programs-cards";

class Table extends Component {
  state = {
    view: "table"
  };
  renderBody = () => {
    if (this.state.view === "cards") {
      return (
        <ProgramsCards
          data={this.props.items}
          columns={this.props.columns}
          updateSorting={this.props.updateSorting}
        />
      );
    } else {
      return (
        <table className="table">
          <TableHeader
            columns={this.props.columns}
            sorting={this.props.sorting}
            updateSorting={this.props.updateSorting}
          >
            {this.props.renderHeader}
          </TableHeader>
          <TableBody items={this.props.items}>
            {this.props.renderBodyRow}
          </TableBody>
        </table>
      );
    }
  };
  changeView = view => this.setState({ view });
  render() {
    return (
      <div className="table">
        <TableToolbar
          title={this.props.title}
          renderFilters={this.props.renderFilters}
          updateFilter={this.props.updateFilter}
          filtering={this.props.filtering}
          onChange={this.changeView}
        />
        <Scrollbars autoHeight autoHeightMax={14000}>
          {this.state.view === "cards" ? (
            <div>
              <TableHeader
                columns={this.props.columns}
                sorting={this.props.sorting}
                updateSorting={this.props.updateSorting}
              >
                {this.props.renderHeader}
              </TableHeader>
              <ProgramsCards items={this.props.items}>
                {this.props.renderBodyCard}
              </ProgramsCards>
            </div>
          ) : (
            <table className="table">
              <TableHeader
                columns={this.props.columns}
                sorting={this.props.sorting}
                updateSorting={this.props.updateSorting}
              >
                {this.props.renderHeader}
              </TableHeader>
              <TableBody items={this.props.items}>
                {this.props.renderBodyRow}
              </TableBody>
            </table>
          )}
        </Scrollbars>
        <TableFooter
          paging={this.props.paging}
          updatePaging={this.props.updatePaging}
          isPending={this.props.isPending}
        />
      </div>
    );
  }
}
/*const TableOld = ({
  title,
  columns,
  items,
  isPending,
  sorting,
  updateSorting,
  paging,
  updatePaging,
  renderFilters,
  updateFilter,
  filtering,
  renderHeader,
  renderBodyRow
}) => {
  return (
    <div className={"table"}>
      <TableToolbar
        title={title}
        renderFilters={renderFilters}
        updateFilter={updateFilter}
        filtering={filtering}
        onChange={onChange}
      />
      <Scrollbars autoHeight autoHeightMax={14000}>
        <table className="table">
          <TableHeader
            columns={columns}
            sorting={sorting}
            updateSorting={updateSorting}
          >
            {renderHeader}
          </TableHeader>
          <TableBody items={items}>{renderBodyRow}</TableBody>
        </table>
      </Scrollbars>
      <TableFooter
        paging={paging}
        updatePaging={updatePaging}
        isPending={isPending}
      />
    </div>
  );
};*/

export default Table;
