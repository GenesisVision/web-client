import "./pager.scss";

import classNames from "classnames";
import * as React from "react";

interface IPagerProps {
  total: number;
  current: number;
  countVisiblePages: number;
  onPageChanged(page: number): void;
}

interface IPagerButton {
  page: number;
  label?: string;
  key?: string | number;
}

class Pager extends React.Component<IPagerProps> {
  generateVisiblePages = (first: number, count: number): number[] => {
    const pages = [];
    for (let i = first; i < first + count; i++) pages.push(i);
    return pages;
  };

  render() {
    const { total, current, countVisiblePages, onPageChanged } = this.props;
    const handleChange = (page: number) => (): void => onPageChanged(page);
    const PagerSeparator = (): JSX.Element => (
      <div className="pager__separator">...</div>
    );
    const PagerButton: React.FC<IPagerButton> = ({ page, label, key }) => (
      <div
        key={key}
        className={classNames("pager__button", {
          "pager__button--current": page === current
        })}
        onClick={handleChange(page)}
      >
        {label || page}
      </div>
    );
    const half = Math.floor(countVisiblePages / 2);
    const firstPage =
      (current <= half + 1 && 1) ||
      (current >= total - half && total - countVisiblePages + 1) ||
      current - half;

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
        {total - firstPage >= countVisiblePages && (
          <div className="pager__pager-block">
            {total - firstPage > countVisiblePages && <PagerSeparator />}
            <PagerButton page={total} />
          </div>
        )}
      </div>
    );
  }
}

export default Pager;
