import "./header.scss";

import Navigation from "components/navigation/navigation";
import AuthorizationControlsContainer from "modules/authorization-controls/authorization-controls";
import ProfileHeaderContainer from "modules/profile-header/components/profile-header-container";
import React from "react";

const Header = () => {
  return (
    <div className={"header"}>
      <Navigation />
      <AuthorizationControlsContainer className="header__buttons" />
      <ProfileHeaderContainer />
    </div>
  );
};

export default Header;
