import clsx from "clsx";
import { Button } from "components/button/button";
import { GVButtonProps } from "components/gv-button";
import React from "react";

import styles from "./gv-button-with-mark.module.scss";

interface Props extends GVButtonProps {
  selected?: boolean;
  children: JSX.Element | string;
}

const _GvButtonWithMark: React.FC<Props> = ({
  wide,
  variant = "outlined",
  selected,
  ...otherProps
}) => {
  return (
    <div className={styles["gv-button-with-mark"]}>
      <Button {...otherProps} variant={variant} wide={wide} />
      <div
        className={clsx(styles["gv-button-with-mark__mark"], {
          [styles["gv-button-with-mark__mark--selected"]]: selected
        })}
      >
        &#10004;
      </div>
    </div>
  );
};

export const GvButtonWithMark = React.memo(_GvButtonWithMark);
