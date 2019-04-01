import "./tooltip.scss";

import * as React from "react";
import Popover from "shared/components/popover/popover";
import {
  HORIZONTAL_POPOVER_POS,
  VERTICAL_POPOVER_POS
} from "shared/components/popover/popover";

interface ITooltipProps {
  component?: JSX.Element;
  title?: string;
  render: Function;
  horizontal?: HORIZONTAL_POPOVER_POS;
  vertical?: VERTICAL_POPOVER_POS;
}
interface ITooltipState {
  anchor?: EventTarget;
}

class Tooltip extends React.Component<ITooltipProps, ITooltipState> {
  state = { anchor: undefined };

  handleMouseEnter = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ): void => {
    this.setState({ anchor: event.currentTarget });
  };

  handleMouseLeave = (): void => {
    this.setState({ anchor: undefined });
  };

  render() {
    const child = React.Children.only(this.props.children);
    const { component, title, render } = this.props;
    const { anchor } = this.state;
    return (
      <React.Fragment>
        <child.type
          {...child.props}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          onTouchStart={this.handleMouseEnter}
          onTouchEnd={this.handleMouseLeave}
        />
        <Popover
          disableBackdropClick
          noPadding
          anchorEl={anchor}
          className="tooltip__popover"
          vertical={this.props.vertical || VERTICAL_POPOVER_POS.TOP}
          horizontal={this.props.horizontal || HORIZONTAL_POPOVER_POS.CENTER}
        >
          {title || component || render()}
        </Popover>
      </React.Fragment>
    );
  }
}

export default Tooltip;
