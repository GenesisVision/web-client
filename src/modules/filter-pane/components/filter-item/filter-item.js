import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import Button from "../../../../components/button/button";
import "./filter-item.css";

class FilterItem extends Component {
  getInitialValue = () => this.props.value || this.props.defaultValue;

  static getDerivedStateFromProps(props, state) {
    if (!props.value) return null;

    if (JSON.stringify(props.value) === JSON.stringify(state.value))
      return null;

    return {
      value: props.value
    };
  }

  state = { isOpen: false, value: this.getInitialValue() };

  toggleOpenState = () => {
    this.setState(state => ({ isOpen: !state.isOpen }));
  };

  handleChange = value => {
    this.setState({ value });
  };

  handleApply = () => {
    this.props.onFilterChange(this.state.value);
  };

  handleClear = () => {
    this.handleChange(this.props.defaultValue);
    this.props.onFilterChange(this.props.defaultValue);
  };

  handleCancel = () => {
    this.handleChange(this.getInitialValue());
  };

  canClear = () =>
    JSON.stringify(this.state.value) ===
    JSON.stringify(this.props.defaultValue);

  showCancelButton = () =>
    JSON.stringify(this.state.value) !== JSON.stringify(this.getInitialValue());

  render() {
    const { isOpen, value } = this.state;
    const { name, description } = this.props;

    return (
      <div className="filter-item">
        <div className="filter-item__header-wrapper">
          <div className="filter-item__header" onClick={this.toggleOpenState}>
            <div className="filter-item__title">{name}</div>
            <div className="filter-item__description">{description}</div>
          </div>
          <div className="filter-item__handler" onClick={this.toggleOpenState}>
            <span
              className={classnames(
                "fas filter-handler",
                isOpen ? "fa-angle-up filter-handler--is-open" : "fa-angle-down"
              )}
            />
          </div>
        </div>

        {isOpen && (
          <div className="filter-item__component">
            {this.props.children(value, this.handleChange)}
            <div className="filter-item__buttons">
              <Button
                className="filter-item__button"
                label="Add filter"
                secondary
                onClick={this.handleApply}
              />
              {this.showCancelButton() ? (
                <Button
                  className="filter-item__button"
                  label="Cancel"
                  secondary
                  onClick={this.handleCancel}
                />
              ) : (
                <Button
                  className="filter-item__button"
                  label="Clear"
                  secondary
                  disabled={this.canClear()}
                  onClick={this.handleClear}
                />
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

FilterItem.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
    .isRequired,

  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
};

export default FilterItem;
