import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useCallback } from "react";

import { normalizeTo, pushState } from "./link.helper";

const Link: React.FC<Props> = ({ to, className, children }) => {
  const normalizedTo = normalizeTo(to);
  const handleClick = useCallback(
    () => {
      if (normalizedTo.state) {
        pushState(normalizedTo.state);
      }
    },
    [normalizedTo.state]
  );
  //const { push } = useRouter();

  // const handleClick = (event: React.MouseEvent) => {
  //   event.preventDefault();
  //   event.stopPropagation();
  //   push({
  //     pathname: props.href,
  //     query: props.search
  //   }).then(data => {
  //     if (data) {
  //       pushState(props.state);
  //     }
  //   });
  // };
  return (
    <NextLink href={normalizedTo.pathname}>
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
  //search?: { [key: string]: string | number };
}

export type ToType = {
  pathname: string;
  state?: any;
  search?: string;
};
