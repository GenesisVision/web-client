import React, { Component } from "react";

import Popover from "../popover/popover";

class TableFilter extends Component {
  state = {
    anchor: null
  };

  handleOpen = event => this.setState({ anchor: event.currentTarget });
  handleClose = () => this.setState({ anchor: null });

  render() {
    const { name, label, value, onChange } = this.props;
    return (
      <div className="table-filter">
        <div>{label}</div>
        <div onClick={this.handleOpen}>{value}</div>
        <div>^</div>
        <Popover
          anchorEl={this.state.anchor}
          onClose={this.handleClose}
          horizontal={"right"}
        >
          Popover
        </Popover>
      </div>
    );
  }
}

export default TableFilter;
