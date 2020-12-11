import { PagerSeparator } from "components/pager/pager.styled-components";
import SeoPagination from "components/pager/seo";
import { Row } from "components/row/row";
import React, { useCallback } from "react";

import PagerButton from "./pager-button";

const _Pager: React.FC<Props> = ({
  total,
  current,
  countVisiblePages = 3,
  onPageChanged,
  asLink
}) => {
  const handleChange = useCallback(
    (page: number) => {
      onPageChanged(page);
    },
    [onPageChanged]
  );
  const half = Math.floor(countVisiblePages / 2);

  const firstPage =
    (current <= half + 1 && 1) ||
    (current >= total - half && total - countVisiblePages + 1) ||
    current - half;

  const visiblePages = generateVisiblePages(firstPage, countVisiblePages);
  return (
    <Row>
      {asLink && <SeoPagination total={total} current={current} />}
      {firstPage > 1 && (
        <>
          <PagerButton
            page={1}
            current={current}
            clickHandle={handleChange}
            asLink={asLink}
          />
          {firstPage > 2 && <PagerSeparator />}
        </>
      )}
      <>
        <>
          {visiblePages
            .filter(page => page <= total)
            .map(page => (
              <PagerButton
                asLink={asLink}
                key={page}
                page={page}
                current={current}
                clickHandle={handleChange}
              />
            ))}
        </>
      </>
      {total - firstPage >= countVisiblePages && (
        <>
          <>
            {total - firstPage > countVisiblePages && <PagerSeparator />}
            <PagerButton
              asLink={asLink}
              page={total}
              current={current}
              clickHandle={handleChange}
            />
          </>
        </>
      )}
    </Row>
  );
};

const generateVisiblePages = (first: number, count: number): number[] => {
  const pages = [];
  for (let i = first; i < first + count; i++) pages.push(i);
  return pages;
};

interface Props {
  total: number;
  current: number;
  asLink?: boolean;
  onPageChanged(page: number): void;
  countVisiblePages?: number;
}

const Pager = React.memo(_Pager);
export default Pager;
