import { NavLink } from "react-router-dom";
import React, { Component } from "react";
import classnames from "classnames";
import Navigation from "../navigation/navigation";
import NavButton from "../navigation/button/button";
import { connect } from "react-redux";
import history from "../../utils/history";
import { navigationClose } from "../navigation/actions/navigation-actions";
import "./mobile-nav.css";

class MobileNav extends Component {
  componentDidMount() {
    this.disableBody();
    history.listen(() => {
      this.props.navigationClose();
    });
  }

  disableBody = () => {
    console.info("disable");
    const b = (document.body.className += " body--disabled");
  };

  render() {
    const { isOpen } = this.props;
    return isOpen ? (
      <div className={classnames("mobile-nav", { "mobile-nav__open": isOpen })}>
        <div className="mobile-nav__wrapper">
          <div className="mobile-nav__header">
            <NavButton />
          </div>
          <Navigation className="mobile-navigation" />
        </div>
        <div
          className="mobile-nav__backdrop"
          onClick={this.props.navigationClose}
        />
      </div>
    ) : null;
  }
}

const mapStateToProps = state => ({
  isOpen: state.navigationData.isOpen
});

const ConnectedMobileNav = connect(mapStateToProps, {
  navigationClose
})(MobileNav);
export default ConnectedMobileNav;
