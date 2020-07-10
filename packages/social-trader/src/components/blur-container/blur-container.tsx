import clsx from "clsx";
import React from "react";
import { TagType } from "utils/types";

import styles from "./blur-container.module.scss";

const _BlurContainer: React.FC<Props> = ({
  children,
  blur,
  className,
  tag: Tag = "div"
}) => (
  <Tag
    className={clsx(styles["blur-container"], className, {
      [styles["blur-container--loading"]]: blur,
      [styles["blur-container--loaded"]]: !blur
    })}
    style={{
      filter: `blur(${blur ? 7 : 0}px)`
    }}
  >
    {children}
  </Tag>
);

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  tag?: TagType;
  className?: string;
  blur: boolean;
}

export const BlurContainer = React.memo<React.FunctionComponent<Props>>(
  _BlurContainer
);
