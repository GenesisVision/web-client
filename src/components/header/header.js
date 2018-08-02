import "./header.scss";

import GVLogo from "components/gv-logo/gv-logo";
import Navigation from "components/navigation/navigation";
import React from "react";

const Header = () => {
  return (
    <div className={"header"}>
      <GVLogo />
      <Navigation className={"header__navigation"} />
    </div>
  );
};

export default Header;
