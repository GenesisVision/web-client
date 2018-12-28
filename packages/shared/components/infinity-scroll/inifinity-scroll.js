import PropTypes from "prop-types";
import React, { Component } from "react";
import GVScroll from "shared/components/scroll/gvscroll";

class InfinityScroll extends Component {
  handleScroll = () => {
    const scroll = this.scroll.current;
    const scrollTop = scroll.getScrollTop();
    const clientHeight = scroll.getClientHeight();
    const scrollHeight = scroll.getScrollHeight();
    const offsetBottom = scrollHeight - scrollTop - clientHeight;
    if (offsetBottom < 100 && this.props.hasMore) {
      this.props.loadMore();
    }
  };

  scroll = React.createRef();

  render() {
    return (
      <GVScroll onScroll={this.handleScroll} ref={this.scroll}>
        {this.props.children}
      </GVScroll>
    );
  }
}

InfinityScroll.propTypes = {
  loadMore: PropTypes.func.isRequired,
  hasMore: PropTypes.bool
};

export default InfinityScroll;
