import "./tooltip.scss";

import * as React from "react";
import Popover from "shared/components/popover/popover";
import {
  HORIZONTAL_POPOVER_POS,
  VERTICAL_POPOVER_POS
} from "shared/components/popover/popover";

class Tooltip extends React.PureComponent<Props, State> {
  state = { anchor: undefined };

  handleMouseEnter = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ): void => {
    if (!this.props.disable) this.setState({ anchor: event.currentTarget });
  };

  handleMouseLeave = (): void => {
    this.setState({ anchor: undefined });
  };

  render() {
    const child = React.Children.only(this.props.children);
    const {
      component,
      title,
      render,
      vertical = VERTICAL_POPOVER_POS.TOP,
      horizontal = HORIZONTAL_POPOVER_POS.CENTER
    } = this.props;
    const { anchor } = this.state;
    console.log(1);
    return (
      <>
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
          vertical={vertical}
          horizontal={horizontal}
        >
          {title || component || render()}
        </Popover>
      </>
    );
  }
}

interface Props {
  render: Function;
  disable?: boolean;
  horizontal?: HORIZONTAL_POPOVER_POS;
  vertical?: VERTICAL_POPOVER_POS;
  component?: JSX.Element;
  title?: string;
}
interface State {
  anchor?: EventTarget;
}

export default Tooltip;
