import "./header.scss";

import { SearchIcon } from "components/icon/icon";
import Navigation from "components/navigation/navigation";
import AuthorizationControlsContainer from "modules/authorization-controls/authorization-controls";
import CurrencySelectContainer from "modules/currency-select/components/currency-select-container";
import ProfileHeaderContainer from "modules/profile-header/components/profile-header-container";
import { GLOBAL_SEARCH_ROUTE } from "pages/global-search/global-search.routes";
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <div className="header__left">
        <Navigation />
      </div>

      <div className="header__right">
        <CurrencySelectContainer />
        <div className="header__search">
          <Link to={GLOBAL_SEARCH_ROUTE}>
            <SearchIcon />
          </Link>
        </div>
        <div className="header__separator" />
        <ProfileHeaderContainer />
        <AuthorizationControlsContainer className="header__buttons" />
      </div>
    </div>
  );
};

export default Header;
