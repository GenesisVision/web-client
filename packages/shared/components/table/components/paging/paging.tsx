import "./paging.scss";

import * as React from "react";
import Pager from "shared/components/pager/pager";
import { IPaging } from "shared/components/table/helpers/paging.helpers";

interface IPagingProps {
  paging: IPaging;
  hidden?: boolean;
  updatePaging(opts: { currentPage: number }): void;
}

class Paging extends React.Component<IPagingProps> {
  render() {
    const { paging, hidden, updatePaging } = this.props;
    if (hidden || paging.totalPages === 0) return null;

    return (
      <Pager
        total={paging.totalPages || 0}
        current={paging.currentPage || 1}
        countVisiblePages={3}
        onPageChanged={(nextPage: number) =>
          updatePaging({ currentPage: nextPage - 1 })
        }
      />
    );
  }
}

export default Paging;
