import React, { Component, Fragment } from "react";

import Popover from "../popover/popover";
import FilterArrow from "./filter-arrow";

class TableFilter extends Component {
  state = {
    anchor: null
  };

  handleOpen = event => this.setState({ anchor: event.currentTarget });
  handleClose = () => this.setState({ anchor: null });

  render() {
    const { name, label, value, onChange, children } = this.props;
    const { anchor } = this.state;
    return (
      <Fragment>
        <div className="table-filter" onClick={this.handleOpen}>
          <div className="table-filter__label">{label}</div>
          <div className="table-filter__value">{value}</div>
          <FilterArrow isOpen={anchor !== null} />
        </div>
        <Popover
          anchorEl={anchor}
          onClose={this.handleClose}
          horizontal={"right"}
        >
          {children}
        </Popover>
      </Fragment>
    );
  }
}

export default TableFilter;
