import { GVColors } from "gv-react-components";
import PropTypes from "prop-types";
import QRCode from "qrcode.react";
import React from "react";
const GVqr = ({ value, size, figureColor, backgroundColor }) => (
  <QRCode
    className="gv-qr"
    value={value}
    bgColor={backgroundColor}
    fgColor={figureColor}
    size={size}
  />
);
GVqr.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  size: PropTypes.number,
  figureColor: PropTypes.string,
  backgroundColor: PropTypes.string
};

GVqr.defaultProps = {
  size: 150,
  figureColor: GVColors.$textAccentColor,
  backgroundColor: "transparent"
};

export default GVqr;
