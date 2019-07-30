import NextLink from "next/link";
import React, { useCallback } from "react";

import { normalizeTo, pushHistoryState } from "./link.helper";

const Link: React.FC<Props> = ({ to, className, children }) => {
  const normalizedTo = normalizeTo(to);
  const handleClick = useCallback(
    () => {
      if (normalizedTo.state) {
        pushHistoryState(normalizedTo);
      }
    },
    [normalizedTo]
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
}

export type ToType = {
  pathname: string;
  state?: any;
  search?: string;
  as?: string;
};
