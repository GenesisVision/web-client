import { Component } from "react";
import { ActionsCircleIcon } from "shared/components/icon/actions-circle-icon";
import React from "react";
import Popover from "shared/components/popover/popover";

class DashboardProgramsStatusBlock extends Component {
  state = {
    anchor: null
  };

  handleOpenDropdown = event => this.setState({ anchor: event.currentTarget });

  handleCloseDropdown = () => this.setState({ anchor: null });

  render() {
    const { status } = this.props;
    return (
      <div className="dashboard-programs__cell--status-block">
        {status}
        <ActionsCircleIcon
          className="dashboard-request__icon"
          primary={this.state.anchor !== null}
          onClick={this.handleOpenDropdown}
        />
        <Popover
          horizontal="right"
          vertical="bottom"
          anchorEl={this.state.anchor}
          noPadding
          onClose={this.handleCloseDropdown}
        >
          <div>Cancel</div>
        </Popover>
      </div>
    );
  }
}
export default DashboardProgramsStatusBlock;
