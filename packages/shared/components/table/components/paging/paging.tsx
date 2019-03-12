import "./paging.scss";

import * as React from "react";
import Pager from "shared/components/pager/pager";

interface IPagingProps {
  paging: {
    total: number;
    current: number;
  };
  hidden: boolean;
  updatePaging(opts: { currentPage: number }): void;
}

class Paging extends React.Component<IPagingProps> {
  render() {
    const { paging, hidden, updatePaging } = this.props;
    if (hidden || paging.total === 0) return null;

    return (
      <Pager
        total={paging.total}
        current={paging.current}
        countVisiblePages={3}
        onPageChanged={(nextPage: number) =>
          updatePaging({ currentPage: nextPage - 1 })
        }
      />
    );
  }
}

export default Paging;
