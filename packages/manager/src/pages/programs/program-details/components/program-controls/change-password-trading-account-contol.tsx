import "./signal-provider-controls.scss";

import ChangePasswordTradingAccountPopup from "modules/change-password-trading-account/change-password-trading-account-popup";
import React, { Component, Fragment } from "react";
import DetailsChangePassword from "shared/components/details/details-description-section/details-description/details-change-password";

interface ChangePasswordTradingAccountControlProps {
  programDescription: any;
}

interface IChangePasswordTradingAccountControlState {
  isOpenChangePasswordTradingAccountPopup: boolean;
}

class ChangePasswordTradingAccountControl extends Component<
  ChangePasswordTradingAccountControlProps,
  IChangePasswordTradingAccountControlState
> {
  constructor(props: ChangePasswordTradingAccountControlProps) {
    super(props);
    this.state = {
      isOpenChangePasswordTradingAccountPopup: false
    };
  }

  openPopup = () => {
    this.setState({ isOpenChangePasswordTradingAccountPopup: true });
  };

  closePopup = () => {
    this.setState({ isOpenChangePasswordTradingAccountPopup: false });
  };

  render() {
    const { programDescription } = this.props;
    const { isOpenChangePasswordTradingAccountPopup } = this.state;
    return (
      <Fragment>
        <DetailsChangePassword onClick={this.openPopup} />

        <ChangePasswordTradingAccountPopup
          programName={programDescription.title}
          open={isOpenChangePasswordTradingAccountPopup}
          id={programDescription.id}
          onClose={this.closePopup}
        />
      </Fragment>
    );
  }
}

export default ChangePasswordTradingAccountControl;
