import { GVButton } from "gv-react-components";
import { Range } from "rc-slider";
import React, { Component } from "react";
import { translate } from "react-i18next";

class LevelFilterPopover extends Component {
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
    const { t } = this.props;
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
            {t("buttons.apply")}
          </GVButton>
          <GVButton
            className="level-filter__btn"
            variant="text"
            color="secondary"
            onClick={this.props.cancel}
          >
            {t("buttons.cancel")}
          </GVButton>
        </div>
      </div>
    );
  }
}

export default translate()(LevelFilterPopover);
