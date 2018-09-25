import PropTypes from "prop-types";
import QRCode from "qrcode.react";
import React from "react";

const GVqr = ({ value, size }) => {
  return (
    <QRCode
      className="gv-qr"
      value={value}
      bgColor={"transparent"}
      fgColor={"white"}
      size={size}
    />
  );
};

GVqr.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  size: PropTypes.number
};

GVqr.defaultProps = {
  size: 150
};

export default GVqr;
