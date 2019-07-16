import React from "react";

const Index = () => {
  return <h1 />;
};

Index.getInitialProps = async () => {
  return {
    namespacesRequired: ["translation"]
  };
};

export default Index;
