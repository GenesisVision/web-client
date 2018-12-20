import React from "react";
import { Link } from "react-router-dom";

const LinkButton = ({ url, children, ...other }) => {
  return (
    <Link to={url} {...other}>
      {children}
    </Link>
  );
};

export default LinkButton;
