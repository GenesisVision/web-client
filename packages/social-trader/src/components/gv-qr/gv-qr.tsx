import clsx from "clsx";
import GVColors from "components/gv-styles/gv-colors";
import QRCode from "qrcode.react";
import * as React from "react";

import styles from "./gv-qr.module.scss";

interface IGVqr {
  value: number | string;
  size?: number;
  figureColor?: string;
  backgroundColor?: string;
  className?: string;
}

const PADDING_SIZE = 2;

const GVqr: React.FC<IGVqr> = ({
  value,
  size = 180,
  figureColor = GVColors.$backgroundColor,
  backgroundColor = "white",
  className
}) => (
  <div
    className={clsx(styles["gv-qr"], className)}
    style={{
      padding: `${PADDING_SIZE}px`,
      background: backgroundColor,
      width: `${size + PADDING_SIZE * 2}px`,
      height: `${size + PADDING_SIZE * 2}px`
    }}
  >
    {value ? (
      <QRCode
        value={value.toString()}
        bgColor={backgroundColor}
        fgColor={figureColor}
        size={size}
      />
    ) : null}
  </div>
);

export default GVqr;
