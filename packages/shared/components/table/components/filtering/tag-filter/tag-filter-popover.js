import { GVButton } from "gv-react-components";
import { Range } from "rc-slider";
import React, { Component } from "react";
import { translate } from "react-i18next";

class TagFilterPopover extends Component {
  state = {
    chooses: this.props.value
    // chooses: this.props.value
  };

  handleChange = e => {
    this.setState({ value: e });
  };
  handleSubmit = value => e => {
    const { chooses } = this.state;
    if (chooses.includes(value)) return;
    const newValue = [...chooses, value];
    this.setState({ chooses: newValue });
    this.props.changeFilter(newValue);
  };
  handleAdd = value => e => {
    this.props.handleAdd(value);
  };

  render() {
    const { t, values } = this.props;
    return (
      <div className="tag-filter">
        {values.map(value => (
          <div key={value.name} onClick={this.handleSubmit(value.name)}>
            {value.name}
          </div>
        ))}
      </div>
    );
  }
}

export default translate()(TagFilterPopover);
