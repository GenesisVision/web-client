import clsx from "clsx";
import { withStyles } from "decorators/withStyles";
import React from "react";
import { css } from "styled-components";
import { cursorPointer } from "utils/style/style-mixins";

import styles from "./center.module.scss";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  hide?: boolean;
  center?: boolean;
  className?: string;
  wrap?: boolean;
  small?: boolean;
  middle?: boolean;
  large?: boolean;
}

const dynamicStyles = css`
  ${cursorPointer}
`;

const _Center: React.FC<Props> = ({
  wrap,
  className,
  children,
  center = true,
  ...otherProps
}) => {
  return (
    <div
      {...otherProps}
      className={clsx(className, {
        [styles["center"]]: center,
        [styles["center--wrap"]]: wrap
      })}
    >
      {children}
    </div>
  );
};

export const Center = withStyles({ dynamicStyles })(_Center);
