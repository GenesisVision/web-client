import "./select.scss";

import classnames from "classnames";
import Popover from "components/popover/popover";
import SelectItem from "components/select/select-item";
import FilterArrowIcon from "modules/table/components/filtering/filter-arrow-icon";
import PropTypes from "prop-types";
import React, { Component } from "react";

class Select extends Component {
  state = {
    anchor: null
  };

  handleClick = event => {
    this.setState({ anchor: event.currentTarget });
  };

  handleChildClick = value => {
    if (typeof this.props.onSelect === "function") {
      this.props.onSelect(value);
    }
    this.setState({ anchor: null });
  };

  handleClose = () => {
    this.setState({ anchor: null });
  };

  render() {
    let displayValue = this.props.value;

    const items = React.Children.map(this.props.children, child => {
      const isSelected = child.props.value === this.props.value;
      if (isSelected) displayValue = child.props.children;
      const { onClick } = this.props;
      return (
        <SelectItem
          isSelected={isSelected}
          onClick={this.handleChildClick}
          {...child.props}
        >
          {child.props.children}
        </SelectItem>
      );
    });
    return (
      <div className={classnames("select", this.props.className)}>
        <div onClick={this.handleClick} className="select__content">
          <div className="select__value">{displayValue}</div>
          <span className="select__icon">
            <FilterArrowIcon isOpen={Boolean(this.state.anchor)} />
          </span>
        </div>

        <Popover
          noPadding
          anchorEl={this.state.anchor}
          onClose={this.handleClose}
        >
          <div className="select__options">{items}</div>
        </Popover>
      </div>
    );
  }
}

Select.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onSelect: PropTypes.func.isRequired,
  className: PropTypes.string
};

Select.defaultProps = {
  className: ""
};

export default Select;
