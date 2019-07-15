import { NextComponentType } from "next";
import React from "react";
const Error: NextComponentType = () => {
  return <p>...error</p>;
};

Error.getInitialProps = async () => {
  return {
    namespacesRequired: ["translation"]
  };
};

export default Error;
