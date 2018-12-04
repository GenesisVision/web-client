import "./pager.scss";

import PropTypes from "prop-types";
import React, { Fragment, PureComponent } from "react";
import { translate } from "react-i18next";
import classNames from "classnames";

class PagerNew extends PureComponent {
  generateVisiblePages = (first, count) => {
    const pages = [];
    first = first > 0 ? first : 1;
    for (let i = first; i < first + count; i++) {
      pages.push(i);
    }
    return pages;
  };

  render() {
    const { t, total, current, countVisiblePages, onPageChanged } = this.props;
    const handleChange = page => () => {
      onPageChanged(page);
    };
    const PagerButton = ({ value, label, current }) => {
      return (
        <div
          className={classNames("pager__button", {
            "pager__button--current": current
          })}
          onClick={handleChange(value)}
        >
          {label || value}
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
          <Fragment>
            <PagerButton value={1} label={t("pager.first")} />
            <PagerButton value={current - 1} label={t("pager.prev")} />
          </Fragment>
        )}
        <div className="pager__visible-pages">
          {visiblePages
            .filter(page => page <= total)
            .map(page => (
              <PagerButton key={page} current={page === current} value={page} />
            ))}
        </div>
        {current < total && (
          <Fragment>
            <PagerButton value={current + 1} label={t("pager.next")} />
            <PagerButton value={total} label={t("pager.last")} />
          </Fragment>
        )}
      </div>
    );
  }
}

PagerNew.propTypes = {
  total: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
  countVisiblePages: PropTypes.number.isRequired,
  onPageChanged: PropTypes.func.isRequired
};

export default translate()(PagerNew);
