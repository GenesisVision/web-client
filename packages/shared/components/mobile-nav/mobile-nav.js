import React, { Component } from "react";
import classnames from "classnames";
import NavButton from "../../modules/navigation/nav-button/nav-button";
import history from "../../utils/history";
import "./mobile-nav.css";
import NavigationContainer from "../../modules/navigation/navigation-container";

export default class MobileNav extends Component {
  componentDidMount() {
    history.listen(() => {
      this.props.navigationClose();
    });
  }

  render() {
    const { navigationClose, isOpen } = this.props;
    return (
      isOpen && (
        <div className={classnames("mobile-nav")}>
          <div className="mobile-nav__wrapper">
            <div className="mobile-nav__header">
              <NavButton className="h-button" />
            </div>
            <NavigationContainer className="mobile-navigation" />
          </div>
          <div className="mobile-nav__backdrop" onClick={navigationClose} />
        </div>
      )
    );
  }
}
