import Pager from "react-pager";
import React, { PureComponent } from "react";

import "./paging.css";

class Paging extends PureComponent {
  render() {
    const { paging, hide, updatePaging } = this.props;
    if (hide || paging.totalPages === 0) return null;

    return (
      <Pager
        total={paging.totalPages}
        current={paging.currentPage}
        visiblePages={3}
        onPageChanged={nextPage => updatePaging({ currentPage: nextPage })}
      />
    );
  }
}

export default Paging;
