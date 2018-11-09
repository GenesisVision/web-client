import "./select.scss";

import classnames from "classnames";
import Popover from "components/popover/popover";
import SelectItem from "components/select/select-item";
import FilterArrowIcon from "modules/table/components/filtering/filter-arrow-icon";
import PropTypes from "prop-types";
import React, { Component } from "react";
import Scrollbars from "react-custom-scrollbars";

class Select extends Component {
  state = {
    anchor: null
  };

  handleClick = event => {
    event.preventDefault();
    if (this.props.disabled) return;
    this.input.current.focus();
    this.setState({ anchor: event.currentTarget });
  };

  input = React.createRef();

  handleChildClick = child => ({ event, isSelected }) => {
    const { onChange, name } = this.props;
    const { value } = child.props;
    if (!isSelected) {
      event.persist();
      event.target = { value, name };

      if (onChange) {
        onChange(event, child);
      }
    }

    this.handleClose();
  };

  handleBlur = event => {
    const { disabled, onBlur } = this.props;
    if (disabled) return;
    if (onBlur) {
      onBlur(event);
    }
  };

  handleFocus = event => {
    const { disabled, onFocus } = this.props;
    if (disabled) return;
    if (onFocus) {
      onFocus(event);
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
        <button
          name={this.props.name}
          onClick={this.handleClick}
          className="select__value"
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
          ref={this.input}
        >
          {displayValue && <span className="select__text">{displayValue}</span>}
          <span className="select__icon">
            <FilterArrowIcon isOpen={Boolean(this.state.anchor)} />
          </span>
        </button>

        <Popover
          horizontal="left"
          noPadding
          anchorEl={this.state.anchor}
          onClose={this.handleClose}
        >
          <Scrollbars autoHeight autoHeightMax="300px">
            <div className="select__options">{items}</div>
          </Scrollbars>
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
