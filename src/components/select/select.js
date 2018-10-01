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
    if (this.props.disabled) return;
    this.setState({ anchor: event.currentTarget });
  };

  input = React.createRef();

  handleChildClick = child => event => {
    const { onChange, name } = this.props;
    const { value } = child.props;

    event.persist();
    event.target = { value, name };

    if (onChange) {
      onChange(event, child);
    }
    this.handleClose();
  };

  handleBlur = event => {
    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  };

  handleFocus = event => {
    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  };

  handleClose = () => {
    this.setState({ anchor: null });
  };

  render() {
    let displayValue = this.props.value;
    const items = React.Children.map(this.props.children, child => {
      const isSelected =
        child.props.value.toString().toLowerCase() ===
        this.props.value.toString().toLowerCase();
      if (isSelected) displayValue = child.props.children;
      const { name } = this.props;
      return (
        <SelectItem
          isSelected={isSelected}
          onClick={this.handleChildClick(child)}
          {...child.props}
          name={name}
        >
          {child.props.children}
        </SelectItem>
      );
    });
    return (
      <div
        className={classnames("select", this.props.className, {
          "select--disabled": this.props.disabled
        })}
      >
        <div onClick={this.handleClick} className="select__content">
          <input
            className="select__input--hidden"
            type="hidden"
            name={this.props.name}
            value={this.props.value}
            ref={this.input}
          />
          <button
            className="select__value"
            onBlur={this.handleBlur}
            onFocus={this.handleFocus}
          >
            {displayValue}
          </button>
          <span className="select__icon">
            <FilterArrowIcon isOpen={Boolean(this.state.anchor)} />
          </span>
        </div>

        <Popover
          horizontal="left"
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
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  fullWidthPopover: PropTypes.bool,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  disabled: PropTypes.bool
};

export default Select;
