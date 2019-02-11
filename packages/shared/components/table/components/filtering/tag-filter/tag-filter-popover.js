import { GVButton } from "gv-react-components";
import { Range } from "rc-slider";
import React, { Component } from "react";
import { translate } from "react-i18next";

class TagFilterPopover extends Component {
  state = {
    value: this.props.value
  };

  handleChange = e => {
    this.setState({ value: e });
  };
  handleSubmit = e => {
    this.props.changeFilter(["All", "All"]);
  };

  render() {
    const { t, values } = this.props;
    return (
      <div className="tag-filter">
        {values.map(value => (
          <div id={value.value} onClick={this.handleSubmit}>
            {value.label}
          </div>
        ))}
      </div>
    );
  }
}

export default translate()(TagFilterPopover);
