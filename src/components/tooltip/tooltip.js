import "./tooltip.scss";

import Popover from "components/popover/popover";
import PropTypes from "prop-types";
import React, { Component, Fragment } from "react";

class Tooltip extends Component {
  state = {
    anchor: null
  };

  handleMouseEnter = event => {
    this.setState({ anchor: event.currentTarget });
  };

  handleMouseLeave = () => {
    this.setState({ anchor: null });
  };

  render() {
    const child = React.Children.only(this.props.children);
    const { component, title } = this.props;
    return (
      <Fragment>
        <child.type
          {...child.props}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        />
        <Popover
          disableBackdropClick
          noPadding
          anchorEl={this.state.anchor}
          className="tooltip__popover"
        >
          {component || title}
        </Popover>
      </Fragment>
    );
  }
}

Tooltip.propTypes = {
  component: PropTypes.element,
  title: PropTypes.string
};

export default Tooltip;
