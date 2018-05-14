import React, { Component } from "react";
import classnames from "classnames";
import "./filter-item.css";

class FilterItem extends Component {
  state = { isOpen: true, value: this.props.defaultValue };
  toggleOpenState = () => {
    this.setState(state => ({ isOpen: !state.isOpen }));
  };

  handleChange = value => {
    this.setState({ value });
  };

  handleApply = () => {
    console.log(this.state.value);
  };

  handleCancel = () => {
    var t = this.props;
    this.setState({ value: this.props.defaultValue });
  };
  render() {
    const { isOpen, value } = this.state;
    const { name, description } = this.props;

    return (
      <div className="filter-item">
        <div className="filter-item__header-wrapper">
          <div className="filter-item__header">
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

        {isOpen ? (
          <div className="filter-item__component">
            {this.props.children(this.handleChange, value)}
            <div className="filter-item__buttons">
              <button
                className="gv-btn gv-btn-secondary filter-item__button"
                onClick={this.handleApply}
              >
                Add filter
              </button>
              <button
                className="gv-btn gv-btn-secondary filter-item__button"
                onClick={this.handleCancel}
              >
                Clear
              </button>
            </div>
          </div>
        ) : (
          <div />
        )}
      </div>
    );
  }
}

export default FilterItem;
