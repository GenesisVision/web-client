import "./pager.scss";

import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import { translate } from "react-i18next";
import classNames from "classnames";

class Pager extends PureComponent {
  generateVisiblePages = (first, count) => {
    const pages = [];
    first = first > 0 ? first : 1;
    for (let i = first; i < first + count; i++) pages.push(i);
    return pages;
  };

  render() {
    const { t, total, current, countVisiblePages, onPageChanged } = this.props;
    const handleChange = page => () => onPageChanged(page);
    const PagerButton = ({ page, label }) => {
      return (
        <div
          className={classNames("pager__button", {
            "pager__button--current": page === current
          })}
          onClick={handleChange(page)}
        >
          {label || page}
        </div>
      );
    };
    const firstPage = current - Math.floor(countVisiblePages / 2);
    const visiblePages = this.generateVisiblePages(
      firstPage,
      countVisiblePages
    );
    return (
      <div className="pager">
        {current > 1 && (
          <div className="pager__pager-block">
            <PagerButton page={1} label={t("pager.first")} />
            <PagerButton page={current - 1} label={t("pager.prev")} />
          </div>
        )}
        <div className="pager__pager-block">
          {visiblePages
            .filter(page => page <= total)
            .map(page => (
              <PagerButton key={page} page={page} />
            ))}
        </div>
        {current < total && (
          <div className="pager__pager-block">
            <PagerButton page={current + 1} label={t("pager.next")} />
            <PagerButton page={total} label={t("pager.last")} />
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
