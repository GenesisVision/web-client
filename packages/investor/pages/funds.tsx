import FundsPage from "pages/funds/funds/funds.page";
import React from "react";

const Funds = () => {
  return <FundsPage />;
};

Funds.getInitialProps = async () => {
  return {
    namespacesRequired: ["translation"]
  };
};

export default Funds;
