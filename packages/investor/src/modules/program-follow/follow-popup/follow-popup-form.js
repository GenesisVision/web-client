import React, { Component } from "react";
import { translate } from "react-i18next";
import { compose } from "redux";

import FollowCreateAccount from "./follow-popup-create-account";
import FollowParams from "./follow-popup-params";

const CREATE_ACCOUNT = "CREATE_ACCOUNT";
const PARAMS = "PARAMS";

class FollowForm extends Component {
  state = {
    step: CREATE_ACCOUNT
  };
  createdCopytradingAccount = () => {
    this.setState({ step: PARAMS });
  };
  componentDidMount() {
    if (this.props.copytradingAccount) this.setState({ step: PARAMS });
  }
  submit = () => {};
  render() {
    const {
      copytradingAccount,
      setFieldValue,
      values,
      wallets,
      walletsAddresses,
      currency
    } = this.props;
    return (
      <div>
        {!copytradingAccount && this.state.step === CREATE_ACCOUNT && (
          <FollowCreateAccount
            values={values}
            setFieldValue={setFieldValue}
            wallets={wallets}
            walletsAddresses={walletsAddresses}
            currency={currency}
            onClick={this.createdCopytradingAccount}
          />
        )}
        {this.state.step === PARAMS && (
          <FollowParams
            copytradingAccount={copytradingAccount}
            values={values}
            setFieldValue={setFieldValue}
            onClick={this.submit}
          />
        )}
      </div>
    );
  }
}

export default compose(translate())(FollowForm);
