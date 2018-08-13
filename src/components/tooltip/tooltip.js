import Popover from "components/popover/popover";
import PropTypes from "prop-types";
import React, { Component, Fragment } from "react";

class Tooltip extends Component {
  state = {
    anchorEl: null
  };
  handleMouseEnter = e => {
    this.setState({ anchorEl: e.currentTarget });
  };
  handleMouseLeave = () => {
    this.setState({ anchorEl: null });
  };
  render() {
    const children = React.Children.only(this.props.children);
    return (
      <Fragment>
        <children.type
          {...children.props}
          onMouseOver={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          onTouchStart={this.handleMouseEnter}
          onTouchEnd={this.handleMouseLeave}
        />
        <Popover
          anchorEl={this.state.anchorEl}
          open={Boolean(this.state.anchorEl)}
        >
          {this.props.title}
        </Popover>
      </Fragment>
    );
  }
}

Tooltip.propTypes = {
  title: PropTypes.string.isRequired
};

export default Tooltip;
