import "./header.scss";

import { SearchIcon } from "components/icon/icon";
import Navigation from "components/navigation/navigation";
import AuthorizationControlsContainer from "modules/authorization-controls/authorization-controls";
import CurrencySelectContainer from "modules/currency-select/components/currency-select-container";
import ProfileHeaderContainer from "modules/profile-header/components/profile-header-container";
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <div className="header__left">
        <Navigation />
        <AuthorizationControlsContainer className="header__buttons" />
      </div>

      <div className="header__right">
        <CurrencySelectContainer />
        <div className="header__search">
          <Link to="/search">
            <SearchIcon />
          </Link>
        </div>
        <div className="header__separator" />
        <ProfileHeaderContainer />
      </div>
    </div>
  );
};

export default Header;
