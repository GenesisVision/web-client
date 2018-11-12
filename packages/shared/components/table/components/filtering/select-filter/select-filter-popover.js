import classnames from "classnames";
import { GVButton } from "gv-react-components";
import React, { Component } from "react";

class SelectFilterPopover extends Component {
  handleClick = (selected, value) => e => {
    return this.props.changeFilter(value);
  };
  render() {
    const { values, value } = this.props;

    return (
      <div className="select-filter">
        {values.map((x, idx) => {
          const selected = x.value === value;
          return (
            <GVButton
              variant="text"
              color={classnames({
                primary: selected,
                secondary: !selected
              })}
              key={idx}
              onClick={this.handleClick(selected, x.value)}
            >
              {x.label}
            </GVButton>
          );
        })}
      </div>
    );
  }
}

export default SelectFilterPopover;
