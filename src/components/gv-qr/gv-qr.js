import "./gv-qr.scss";

import { GVColors } from "gv-react-components";
import PropTypes from "prop-types";
import QRCode from "qrcode.react";
import React from "react";

const GVqr = ({ value, size, figureColor, backgroundColor }) => (
  <div className="gv-qr" style={{ background: backgroundColor }}>
    <QRCode
      className="gv-qr__code"
      value={value}
      bgColor={backgroundColor}
      fgColor={figureColor}
      size={size}
    />
  </div>
);
GVqr.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  size: PropTypes.number,
  figureColor: PropTypes.string,
  backgroundColor: PropTypes.string
};

GVqr.defaultProps = {
  size: 150,
  figureColor: GVColors.$backgroundColor,
  backgroundColor: GVColors.$primaryColor
};

export default GVqr;
