import classNames from "classnames";
import { GVButton } from "gv-react-components";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { IManagerEventFilterValue } from "../filter.type";

interface ISelectFilterPopoverProps {
  changeFilter?(value: any): void;
  values?: IManagerEventFilterValue<any>[];
  value?: any;
}

class SelectFilterPopover extends React.Component<
  ISelectFilterPopoverProps & InjectedTranslateProps
> {
  handleClick = value => () => {
    return this.props.changeFilter(value);
  };

  renderLabel = (item: IManagerEventFilterValue<any>): string => {
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
              color={classNames({
                primary: selected,
                secondary: !selected
              })}
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
