import NextLink from "next/link";
import Router from "next/router";
import React, { useCallback } from "react";

import {
  normalizeTo,
  normalizeUrlString,
  pushHistoryState
} from "./link.helper";

const Link: React.FC<LinkProps> = ({ to, onClick, children, ...other }) => {
  if (!to) {
    return <>{children}</>;
  }
  const normalizedTo = normalizeTo(to);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      e.stopPropagation();

      const { asPath, route } = Router;

      const prevent = normalizedTo.as
        ? normalizedTo.as === route
        : normalizedTo.pathname === route && normalizedTo.pathname === asPath;

      if (prevent) {
        e.preventDefault();
        return;
      }

      if (onClick) {
        onClick(e);
      }
      if (normalizedTo.state) {
        pushHistoryState(normalizedTo);
      }
    },
    [normalizedTo, onClick]
  );
  const title = typeof children === "string" ? children : "";
  return (
    <NextLink href={normalizedTo.pathname} as={normalizedTo.as}>
      <a title={title} onClick={handleClick} {...other}>
        {children}
      </a>
    </NextLink>
  );
};

export default Link;

export interface LinkProps {
  to?: ToType | string;
  className?: string;
  onClick?(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void;
}

export const Push = (
  url: string,
  as?: string,
  options?: {}
): Promise<boolean> => {
  const newUrl = normalizeUrlString(url);
  return Router.push(newUrl, as, options);
};

export type ToType = {
  pathname: string;
  state?: any;
  search?: string;
  as?: string;
};
