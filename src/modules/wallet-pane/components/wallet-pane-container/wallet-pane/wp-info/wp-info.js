import React from "react";

import WPButtons from "./wp-buttons/wp-buttons";

import "./wp-info.css";

const WPInfo = () => {
  return (
    <div className="wp-info">
      Wallet
      <WPButtons />
    </div>
  );
};

export default WPInfo;
