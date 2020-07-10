import clsx from "clsx";
import NextLink from "next/link";
import Router from "next/router";
import React, { useCallback } from "react";

import {
  normalizeTo,
  normalizeUrlString,
  pushHistoryState
} from "./link.helper";
import styles from "./link.module.scss";

const Link: React.FC<LinkProps> = ({
  wide,
  white,
  title,
  to,
  onClick,
  children,
  ...other
}) => {
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
  const linkTitle = title || (typeof children === "string" && children) || "";
  return (
    <NextLink href={normalizedTo.pathname} as={normalizedTo.as}>
      <a
        className={clsx({
          [styles["link--wide"]]: wide,
          [styles["link--white"]]: white
        })}
        title={linkTitle}
        onClick={handleClick}
        {...other}
      >
        {children}
      </a>
    </NextLink>
  );
};

export default Link;

export interface LinkProps {
  wide?: boolean;
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
