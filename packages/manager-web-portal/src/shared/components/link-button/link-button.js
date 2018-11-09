import { Link } from "react-router-dom";
import React from "react";

const LinkButton = ({ url, children, ...other }) => {
  return (
    <Link to={url} {...other}>
      {children}
    </Link>
  );
};

export default LinkButton;
