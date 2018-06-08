import React, { Component } from "react";
import classnames from "classnames";
import Navigation from "../navigation/navigation";
import NavButton from "../navigation/button/button";
import history from "../../utils/history";
import bodyDisableHOC from "../../shared/HOC/body-disable-HOC";
import "./mobile-nav.css";

class MobileNav extends Component {
  componentDidMount() {
    history.listen(() => {
      this.props.navigationClose();
    });
  }

  render() {
    const { navigationClose } = this.props;
    return (
      <div className={classnames("mobile-nav")}>
        <div className="mobile-nav__wrapper">
          <div className="mobile-nav__header">
            <NavButton />
          </div>
          <Navigation className="mobile-navigation" />
        </div>
        <div className="mobile-nav__backdrop" onClick={navigationClose} />
      </div>
    );
  }
}

const MobileNavWrapped = bodyDisableHOC(MobileNav);

export default MobileNavWrapped;
