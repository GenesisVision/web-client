import classNames from "classnames";
import { useRouter } from "next/router";
import React from "react";

const Link: React.FC<Props> = props => {
  const { push } = useRouter();
  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    push({
      pathname: props.href,
      query: props.query
    }).then(data => {
      if (data) {
        window.history.state.state = props.state;
      }
    });
  };
  return (
    <a
      className={classNames(props.className)}
      href={props.href}
      onClick={handleClick}
    >
      {props.children}
    </a>
  );
};

export default Link;

interface Props {
  state?: string;
  href: string;
  className?: string;
  query?: { [key: string]: string | number };
}
