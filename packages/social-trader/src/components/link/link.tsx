import NextLink from "next/link";
import Router from "next/router";
import React, { useCallback } from "react";

import {
  normalizeTo,
  normalizeUrlString,
  pushHistoryState
} from "./link.helper";
import styles from "./link.module.scss";

const WrappedLink: React.FC<LinkProps & {
  to: ToType | string;
}> = ({ white, title, to, onClick, children, ...other }) => {
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
  const linkTitle = title || (typeof children === "string" && children) || "";
  return (
    <NextLink href={normalizedTo.pathname} as={normalizedTo.as}>
      <a
        className={white ? styles.link__white : ""}
        title={linkTitle}
        onClick={handleClick}
        {...other}
      >
        {children}
      </a>
    </NextLink>
  );
};

const Link: React.FC<LinkProps> = ({ children, to, ...other }) => {
  if (!to) {
    return <>{children}</>;
  }
  return (
    <WrappedLink to={to} {...other}>
      {children}
    </WrappedLink>
  );
};

export default Link;

export interface LinkProps {
  white?: boolean;
  title?: string;
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
