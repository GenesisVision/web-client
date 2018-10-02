import PropTypes from "prop-types";
import React, { Component } from "react";
import { Scrollbars } from "react-custom-scrollbars";

class InfinityScroll extends Component {
  handleScroll = () => {
    const scroll = this.scroll.current;
    const scrollTop = scroll.getScrollTop();
    const clientHeight = scroll.getClientHeight();
    const scrollHeight = scroll.getScrollHeight();
    const offsetBottom = scrollHeight - scrollTop - clientHeight;
    if (offsetBottom < 250 && !this.props.disabled) {
      this.props.onLoad();
    }
  };

  scroll = React.createRef();

  componentDidMount() {
    if (!this.props.disabled) {
      this.props.onLoad();
    }
  }

  render() {
    return (
      <Scrollbars onScroll={this.handleScroll} ref={this.scroll}>
        {this.props.children}
      </Scrollbars>
    );
  }
}

InfinityScroll.propTypes = {
  onLoad: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

export default InfinityScroll;
