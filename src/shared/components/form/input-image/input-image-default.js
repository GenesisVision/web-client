import React from "react";

const InputImageDefault = ({ defaultImage }) => {
  if (defaultImage.type === "svg") return defaultImage;
  else
    return (
      <span
        className="input-image__preview-img"
        style={{
          backgroundImage: `url(${defaultImage})`
        }}
      />
    );
};

export default InputImageDefault;
