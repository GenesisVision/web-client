import * as React from "react";

class InfinityScroll extends React.PureComponent<Props> {
  render() {
    return this.props.children;
  }
}

interface Props {
  loadMore: () => void;
  hasMore?: boolean;
}

export default InfinityScroll;
