import "./pager.scss";

import classNames from "classnames";
import Link from "components/link/link";
import { useRouter } from "next/router";
import * as querystring from "querystring";
import * as React from "react";
import { useCallback } from "react";

export const _PagerButton: React.FC<Props> = ({
  asLink = false,
  page,
  label,
  current,
  clickHandle
}) => {
  const { pathname } = useRouter();

  const callback = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      clickHandle(page);
    },
    [page, clickHandle]
  );

  const classname = classNames("pager__button", {
    "pager__button--current": page === current
  });

  const value = label || page;

  if (asLink) {
    const query = querystring.stringify({ page });
    const link = page === 1 ? pathname : `${pathname}?${query}`;

    return (
      <Link className={classname} to={link} onClick={callback}>
        {value}
      </Link>
    );
  }

  return (
    <div className={classname} onClick={callback}>
      {value}
    </div>
  );
};

export const PagerButton = React.memo(_PagerButton);
export default PagerButton;

interface Props {
  asLink?: boolean;
  current: number;
  page: number;
  label?: string;
  key?: string | number;
  clickHandle(page: number): void;
}
