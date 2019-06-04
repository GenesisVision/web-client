import "./signal-provider-controls.scss";

import ChangePasswordTradingAccountPopup from "modules/change-password-trading-account/change-password-trading-account-popup";
import * as React from "react";
import DetailsChangePassword from "shared/components/details/details-description-section/details-description/controls/details-change-password";
import { IChangePasswordTradingAccountProps } from "shared/components/programs/program-details/program-details.types";

interface IChangePasswordTradingAccountState {
  isOpenChangePasswordTradingAccountPopup: boolean;
}

class ChangePasswordTradingAccount extends React.PureComponent<
  IChangePasswordTradingAccountProps,
  IChangePasswordTradingAccountState
> {
  constructor(props: IChangePasswordTradingAccountProps) {
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
      <>
        <DetailsChangePassword onClick={this.openPopup} />
        <ChangePasswordTradingAccountPopup
          programName={programDescription.title}
          open={isOpenChangePasswordTradingAccountPopup}
          id={programDescription.id}
          onClose={this.closePopup}
        />
      </>
    );
  }
}

export default ChangePasswordTradingAccount;
