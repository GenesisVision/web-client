import classnames from "classnames";
import { GVButton } from "gv-react-components";
import React, { Component } from "react";

class SelectFilter extends Component {
  handleClick = (selected, value) => e => {
    if (selected) return;
    return this.props.changeFilter(value);
  };
  render() {
    const { values, value } = this.props;

    return (
      <div className="filter-select">
        {values.map(x => {
          const selected = x.value === value;
          return (
            <GVButton
              variant="text"
              color={classnames({
                primary: selected,
                secondary: !selected
              })}
              key={x.value}
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

export default SelectFilter;
