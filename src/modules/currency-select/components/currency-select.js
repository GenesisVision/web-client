import "./currency-select.scss";

import classnames from "classnames";
import Popover from "components/popover/popover";
import PropTypes from "prop-types";
import React, { Component } from "react";

class CurrencySelect extends Component {
  state = {
    anchor: null
  };

  handleClick = event => {
    this.setState({ anchor: event.currentTarget });
  };

  handleChildClick = value => () => {
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
      return (
        <div
          className={classnames("currency__option", {
            "currency__option--selected": isSelected
          })}
          onClick={this.handleChildClick(child.props.value)}
        >
          {child.props.children}
        </div>
      );
    });
    return (
      <div className="currency">
        <div onClick={this.handleClick} className="currency__value">
          {displayValue}
        </div>
        <Popover
          noPadding
          anchorEl={this.state.anchor}
          onClose={this.handleClose}
        >
          <div className="currency__options">{items}</div>
        </Popover>
      </div>
    );
  }
}

CurrencySelect.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onSelect: PropTypes.func.isRequired
};

export default CurrencySelect;
