import * as React from "react";
import GVScroll from "shared/components/scroll/gvscroll";

import Scrollbars from "../scroll/Scrollbars";

class InfinityScroll extends React.PureComponent<Props> {
  scroll = React.createRef() as React.RefObject<Scrollbars>;

  handleScroll = () => {
    const scroll = this.scroll.current!;
    const scrollTop = scroll.getScrollTop();
    const clientHeight = scroll.getClientHeight();
    const scrollHeight = scroll.getScrollHeight();
    const offsetBottom = scrollHeight - scrollTop - clientHeight;
    if (offsetBottom < 100 && this.props.hasMore) {
      this.props.loadMore();
    }
  };

  render() {
    return (
      <GVScroll onScroll={this.handleScroll} ref={this.scroll}>
        {this.props.children}
      </GVScroll>
    );
  }
}

interface Props {
  loadMore: () => void;
  hasMore?: boolean;
}

export default InfinityScroll;
