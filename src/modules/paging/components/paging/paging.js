import Pager from "react-pager";
import React, { PureComponent } from "react";
import "./paging.css";

class Paging extends PureComponent {
  handlePageChanged = nextPage => {
    const currentPage = nextPage;
    this.props.updatePagingAndFetch({ currentPage });
  };

  componentWillUnmount() {
    const currentPage = 0;
    const totalPages = 0;
    this.props.updatePaging({ currentPage, totalPages });
  }

  render() {
    const { paging } = this.props;
    if (paging.totalPages === 0) return null;

    return (
      <Pager
        total={paging.totalPages}
        current={paging.currentPage}
        visiblePages={3}
        onPageChanged={nextPage => this.handlePageChanged(nextPage)}
      />
    );
  }
}

export default Paging;
