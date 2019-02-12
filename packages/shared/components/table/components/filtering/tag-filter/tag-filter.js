import "./tag-filter.scss";

import PropTypes from "prop-types";
import React, { Component, Fragment } from "react";
import { translate } from "react-i18next";
import Popover from "shared/components/popover/popover";

import TagFilterButton from "./tag-filter-button";
import TagFilterPopover from "./tag-filter-popover";

class TagFilter extends Component {
  state = {
    anchor: null
  };
  filterChoosed = arr =>
    arr.filter(
      item =>
        this.props.value &&
        this.props.value.find(choose => item.name === choose)
    );
  renderValueText = value => value;
  handleOpenPopover = event => this.setState({ anchor: event.currentTarget });
  handleClosePopover = () => this.setState({ anchor: null });
  handleChangeFilter = value => {
    this.handleClosePopover();
    this.props.onChange({ name: this.props.name, value });
  };

  render() {
    const { t, values, value } = this.props;
    const { anchor } = this.state;
    return (
      <Fragment>
        <div className="filter" onClick={this.handleOpenPopover}>
          <div className="filter__value">
            {this.filterChoosed(values).map(tag => (
              <span key={tag.name}>{tag.name}, </span>
            ))}
          </div>
          <TagFilterButton isActive={anchor} />
        </div>
        <Popover
          anchorEl={anchor}
          onClose={this.handleClosePopover}
          horizontal={"right"}
          noPadding
        >
          <TagFilterPopover
            value={value}
            changeFilter={this.handleChangeFilter}
            values={values}
          />
        </Popover>
      </Fragment>
    );
  }
}

TagFilter.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func
};

export default translate()(TagFilter);
