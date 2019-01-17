import classnames from "classnames";
import { GVButton } from "gv-react-components";
import React, { Component } from "react";
import { translate } from "react-i18next";

class SelectFilterPopover extends Component {
  handleClick = (selected, value) => e => {
    return this.props.changeFilter(value);
  };

  renderLabel = item => {
    const { t } = this.props;
    if (item.labelKey !== undefined) return t(item.labelKey);
    return item.label;
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
              {this.renderLabel(x)}
            </GVButton>
          );
        })}
      </div>
    );
  }
}

export default translate()(SelectFilterPopover);
