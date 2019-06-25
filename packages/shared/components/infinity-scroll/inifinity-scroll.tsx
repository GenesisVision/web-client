import "./infinity-scroll.scss";

import React, { createRef } from "react";

class InfinityScroll extends React.PureComponent<Props> {
  scroll: React.RefObject<HTMLDivElement> = createRef<HTMLDivElement>();
  container: React.RefObject<HTMLDivElement> = createRef<HTMLDivElement>();

  handleScroll = () => {
    if (this.scroll.current && this.container.current) {
      const scroll = this.scroll.current;
      const scrollTop = scroll.scrollTop;
      const clientHeight = window.innerHeight;
      const scrollHeight = this.container.current.getBoundingClientRect()
        .height;
      const offsetBottom = scrollHeight - scrollTop - clientHeight;
      if (offsetBottom < 100 && this.props.hasMore) {
        this.props.loadMore();
      }
    }
  };

  render() {
    return (
      <div
        className="infinity-scroll"
        ref={this.scroll}
        onScroll={this.handleScroll}
      >
        <div className="infinity-scroll__container" ref={this.container}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

interface Props {
  loadMore: () => void;
  hasMore?: boolean;
}

export default InfinityScroll;
