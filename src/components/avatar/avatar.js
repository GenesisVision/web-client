import "./avatar.scss";

import React from "react";

const Avatar = ({ url }) => {
  return <img className={"avatar"} src={url} />;
};

export default Avatar;
