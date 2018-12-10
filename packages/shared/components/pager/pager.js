import "./pager.scss";

import classNames from "classnames";
import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import { translate } from "react-i18next";

class Pager extends PureComponent {
  generateVisiblePages = (first, count) => {
    const pages = [];
    for (let i = first; i < first + count; i++) pages.push(i);
    return pages;
  };

  render() {
    const { total, current, countVisiblePages, onPageChanged } = this.props;
    const handleChange = page => () => onPageChanged(page);
    const PagerSeparator = () => <div className="pager__separator">...</div>;
    const PagerButton = ({ page, label }) => (
      <div
        className={classNames("pager__button", {
          "pager__button--current": page === current
        })}
        onClick={handleChange(page)}
      >
        {label || page}
      </div>
    );
    const pureFirstPage = current - Math.floor(countVisiblePages / 2);
    const firstPage = pureFirstPage
      ? pureFirstPage + countVisiblePages <= total
        ? pureFirstPage
        : total - countVisiblePages + 1
      : 1;

    const visiblePages = this.generateVisiblePages(
      firstPage,
      countVisiblePages
    );
    return (
      <div className="pager">
        {firstPage > 1 && (
          <div className="pager__pager-block">
            <PagerButton page={1} />
            {firstPage > 2 && <PagerSeparator />}
          </div>
        )}
        <div className="pager__pager-block">
          {visiblePages
            .filter(page => page <= total)
            .map(page => (
              <PagerButton key={page} page={page} />
            ))}
        </div>
        {countVisiblePages + firstPage <= total && (
          <div className="pager__pager-block">
            {firstPage + countVisiblePages < total && <PagerSeparator />}
            <PagerButton page={total} />
          </div>
        )}
      </div>
    );
  }
}

Pager.propTypes = {
  total: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
  countVisiblePages: PropTypes.number.isRequired,
  onPageChanged: PropTypes.func.isRequired
};

export default translate()(Pager);
