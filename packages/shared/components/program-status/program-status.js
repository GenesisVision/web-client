import "./program-status.scss";

import classnames from "classnames";
import React, { Fragment, PureComponent } from "react";
import { translate } from "react-i18next";

import Popover from "../popover/popover";
import ProgramStatusRequests from "./program-status-requests";

const getStatusClassName = (status, className) => {
  return classnames("program-status", className, {
    "program-status__active": status === "Active",
    "program-status__investing": status === "Investing",
    "program-status__withdrawing": status === "Withdrawing",
    "program-status__ended": status === "Ended",
    "program-status__pending": status === "Pending"
  });
};

class ProgramStatus extends PureComponent {
  state = {
    anchor: null
  };

  handleOpenDropdown = event => this.setState({ anchor: event.currentTarget });
  handleCloseDropdown = () => this.setState({ anchor: null });

  render() {
    const { t, className, status, id, role, asset, onCancel } = this.props;
    return (
      <Fragment>
        <span
          className={getStatusClassName(status, className)}
          onClick={this.handleOpenDropdown}
        >
          {status ? t(`program-statuses.${status}`) : ""}
        </span>
        <Popover
          horizontal="center"
          vertical="bottom"
          anchorEl={this.state.anchor}
          noPadding
          onClose={this.handleCloseDropdown}
        >
          <ProgramStatusRequests
            id={id}
            role={role}
            asset={asset}
            handleCloseDropdown={this.handleCloseDropdown}
            onCancel={onCancel}
          />
        </Popover>
      </Fragment>
    );
  }
}

export default translate()(ProgramStatus);
