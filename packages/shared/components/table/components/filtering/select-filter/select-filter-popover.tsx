import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import GVButton from "shared/components/gv-button";

import { SelectFilterValue } from "../filter.type";

interface ISelectFilterPopoverProps {
  changeFilter?(value: SelectFilterValue<any>): void;
  values: SelectFilterValue<any>[];
  value?: any;
}

class SelectFilterPopover extends React.PureComponent<
  ISelectFilterPopoverProps & InjectedTranslateProps
> {
  handleClick = (value: SelectFilterValue<any>) => () => {
    if (this.props.changeFilter) {
      this.props.changeFilter(value);
    }
  };

  renderLabel = (item: SelectFilterValue<any>): string =>
    item.labelKey ? this.props.t(item.labelKey) : item.label;

  render() {
    const { values, value } = this.props;
    return (
      <div className="select-filter">
        {values.map((x, idx) => {
          const selected = x.value === value;
          return (
            <GVButton
              variant="text"
              color={selected ? "primary" : "secondary"}
              key={idx}
              onClick={this.handleClick(x.value)}
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
