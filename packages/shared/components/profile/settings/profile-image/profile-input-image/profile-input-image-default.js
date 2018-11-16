import React from "react";

const ProfileInputImageDefault = ({ defaultImage }) => {
  if (defaultImage.type === "svg") return defaultImage;
  else
    return (
      <span
        className="profile-input-image__preview-img"
        style={{
          backgroundImage: `url(${defaultImage})`
        }}
      />
    );
};

export default ProfileInputImageDefault;
