import "rc-slider/assets/index.css";

import "./filter.scss";

import Popover from "shared/components/popover/popover";
import React, { Component, Fragment } from "react";

import FilterArrowIcon from "./filter-arrow-icon";

class Filter extends Component {
  state = {
    anchor: null
  };

  handleOpenPopover = event => this.setState({ anchor: event.currentTarget });
  handleClosePopover = () => this.setState({ anchor: null });
  handleChangeFilter = value => {
    this.handleClosePopover();
    this.props.updateFilter({ name: this.props.name, value });
  };

  render() {
    const { label, value, renderValueText, children } = this.props;
    const { anchor } = this.state;
    const child = React.cloneElement(children, {
      value,
      changeFilter: this.handleChangeFilter,
      cancel: this.handleClosePopover
    });
    return (
      <Fragment>
        <div className="filter" onClick={this.handleOpenPopover}>
          <div className="filter__label">{label}</div>
          <div className="filter__value">{renderValueText(value)}</div>
          <FilterArrowIcon isOpen={anchor !== null} />
        </div>
        <Popover
          anchorEl={anchor}
          onClose={this.handleClosePopover}
          horizontal={"right"}
          noPadding
        >
          {child}
        </Popover>
      </Fragment>
    );
  }
}

export default Filter;
