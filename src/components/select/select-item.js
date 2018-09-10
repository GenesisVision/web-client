import classnames from "classnames";
import { GVButton } from "gv-react-components";
import PropTypes from "prop-types";
import React, { Component } from "react";

class SelectItem extends Component {
  handleClick = () => {
    this.props.onClick(this.props.value);
  };
  render() {
    const { isSelected } = this.props;
    return (
      <GVButton
        variant="text"
        color="secondary"
        className={classnames("select__option", this.props.className, {
          "select__option--selected": isSelected
        })}
        onClick={this.handleClick}
      >
        {this.props.children}
      </GVButton>
    );
  }
}

SelectItem.propTypes = {
  isSelected: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

export default SelectItem;
