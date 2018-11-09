import "./gv-qr.scss";

import classNames from "classnames";
import { GVColors } from "gv-react-components";
import PropTypes from "prop-types";
import QRCode from "qrcode.react";
import React from "react";

const GVqr = ({ value, size, figureColor, backgroundColor, className }) => (
  <div
    className={classNames("gv-qr", className)}
    style={{
      background: backgroundColor,
      width: `${size}px`,
      height: `${size}px`
    }}
  >
    {value ? (
      <QRCode
        className="gv-qr__code"
        value={value}
        bgColor={backgroundColor}
        fgColor={figureColor}
        size={size}
      />
    ) : null}
  </div>
);
GVqr.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  size: PropTypes.number,
  figureColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  className: PropTypes.string
};

GVqr.defaultProps = {
  size: 180,
  figureColor: GVColors.$backgroundColor,
  backgroundColor: "white"
};

export default GVqr;
