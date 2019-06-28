import "./tooltip.scss";

import classnames from "classnames";
import * as React from "react";
import Popover, {
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
      render,
      vertical = VERTICAL_POPOVER_POS.TOP,
      horizontal = HORIZONTAL_POPOVER_POS.CENTER,
      className
    } = this.props;
    const { anchor } = this.state;
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
          noAbsolute
          noPadding
          anchorEl={anchor}
          className={classnames("tooltip__popover", className)}
          vertical={vertical}
          horizontal={horizontal}
        >
          {render()}
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
  className?: string;
}
interface State {
  anchor?: EventTarget;
}

export default Tooltip;
