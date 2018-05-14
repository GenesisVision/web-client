import React, { Component } from "react";
import "./filter-item.css";

class FilterItem extends Component {
  state = { isOpen: false };
  render() {
    const { isOpen } = this.state;
    const {
      name,
      value,
      defaultValue,
      Component: component,
      onApply,
      ...rest
    } = this.props;
    if (isOpen) {
      return <Component {...rest} />;
    }
    return (
      <div className="filter-item">
        <div className="filter-item__title">{name}</div>
        <div className="filter-item__description">Select Trader Level</div>
      </div>
    );
  }
}

export default FilterItem;
