import PropTypes from "prop-types";
import React from "react";
import withUrl from "shared/decorators/with-url";

let ImageBase = ({ url, alt, defaultImage, className, imageClassName }) => {
  return (
    <div className={className}>
      <img alt={alt} className={imageClassName} src={url || defaultImage} />
    </div>
  );
};

ImageBase.propTypes = {
  url: PropTypes.string,
  alt: PropTypes.string.isRequired,
  defaultImage: PropTypes.string,
  className: PropTypes.string,
  imageClassName: PropTypes.string
};

ImageBase = withUrl("url")(ImageBase);
export default ImageBase;
