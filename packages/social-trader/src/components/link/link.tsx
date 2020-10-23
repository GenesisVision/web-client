import NextLink from "next/link";
import Router from "next/router";
import React, { useCallback } from "react";
import styled from "styled-components";

import { normalizeTo, pushHistoryState } from "./link.helper";

export type ToType = {
  pathname: string;
  state?: any;
  search?: string;
  as?: string;
};

export interface LinkProps {
  noColor?: boolean;
  wide?: boolean;
  white?: boolean;
  title?: string;
  to?: ToType | string;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

export const Push = (
  url: string,
  as?: string,
  options?: {}
): Promise<boolean> => {
  return Router.push(url, as, options);
};

const StyledA = styled.a<LinkProps>`
  cursor: pointer;
  ${({ wide }) =>
    wide &&
    `display: block;
    width: 100%;`};
  color: ${({ white, noColor }) => {
    if (white) return `white`;
    if (noColor) return `inherit`;
    return "#03bdaf";
  }};
`;

const Link: React.FC<LinkProps> = props => {
  const { title, to, onClick, children } = props;
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
    <NextLink href={normalizedTo.as || normalizedTo.pathname}>
      <StyledA {...props} title={linkTitle} onClick={handleClick} />
    </NextLink>
  );
};

export default Link;
