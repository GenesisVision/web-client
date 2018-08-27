import "./level-filter.scss";

import { GVButton } from "gv-react-components";
import { Range } from "rc-slider";
import React, { Component } from "react";

class LevelFilter extends Component {
  state = {
    value: this.props.value
  };

  handleChange = e => {
    this.setState({ value: e });
  };
  handleSubmit = e => {
    this.props.changeFilter(this.state.value);
  };

  render() {
    return (
      <div className="level-filter">
        <Range
          dots
          min={1}
          max={7}
          marks={new Array(7).fill(0).reduce((prev, curr, idx) => {
            prev[idx + 1] = idx + 1;
            return prev;
          }, {})}
          value={this.state.value}
          onChange={this.handleChange}
          pushable
        />
        <div className="level-filter__btns">
          <GVButton
            className="level-filter__btn"
            variant="text"
            onClick={this.handleSubmit}
          >
            Apply
          </GVButton>
          <GVButton
            className="level-filter__btn"
            variant="text"
            color="secondary"
            onClick={this.props.cancel}
          >
            Cancel
          </GVButton>
        </div>
      </div>
    );
  }
}

export default LevelFilter;
