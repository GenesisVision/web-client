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
    if (this.props.delay) {
      setTimeout(() => {
        this.setState({ anchor: null });
      }, this.props.delay);
    } else {
      this.setState({ anchor: null });
    }
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
        <Popover disableBackdrop anchorEl={this.state.anchor}>
          {component || title}
        </Popover>
      </Fragment>
    );
  }
}

Tooltip.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  delay: PropTypes.number,
  component: PropTypes.oneOfType([PropTypes.node]).isRequired
};

export default Tooltip;
