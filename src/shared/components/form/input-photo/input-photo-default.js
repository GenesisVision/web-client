import React from "react";

const InputPhotoDefault = ({ defaultImage }) => {
  if (defaultImage.type === "svg") return defaultImage;
  else
    return (
      <span
        className="input-photo__preview-img"
        style={{
          backgroundImage: `url(${defaultImage})`
        }}
      />
    );
};

export default InputPhotoDefault;
