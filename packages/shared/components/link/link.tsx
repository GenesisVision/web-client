import NextLink from "next/link";
import React, { useCallback } from "react";

import { normalizeTo, pushHistoryState } from "./link.helper";

const Link: React.FC<Props> = ({ to, className, onClick, children }) => {
  const normalizedTo = normalizeTo(to);
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      e.stopPropagation();
      if (onClick) {
        onClick(e);
      }
      if (normalizedTo.state) {
        pushHistoryState(normalizedTo);
      }
    },
    [normalizedTo, onClick]
  );

  return (
    <NextLink href={normalizedTo.pathname} as={normalizedTo.as}>
      <a className={className} onClick={handleClick}>
        {children}
      </a>
    </NextLink>
  );
};

export default Link;

interface Props {
  to: ToType | string;
  className?: string;
  onClick?(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void;
}

export type ToType = {
  pathname: string;
  state?: any;
  search?: string;
  as?: string;
};
