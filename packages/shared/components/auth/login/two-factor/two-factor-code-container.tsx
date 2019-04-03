import { replace } from "connected-react-router";
import * as React from "react";
import { connect } from "react-redux";
import { NOT_FOUND_PAGE_ROUTE } from "shared/components/not-found/not-found.routes";

import TwoFactorCodeForm from "./two-factor-code-form";
import { ROLE } from "shared/constants/constants";
import {
  CODE_TYPE,
  loginUserInvestor,
  loginUserManager
} from "../login.actions";
import * as loginService from "../login.service";
import { LoginService } from "../login.service";
import { ManagerRootState } from "manager-web-portal/src/reducers";
import { InvestorRootState } from "investor-web-portal/src/reducers";
import { bindActionCreators, Dispatch } from "redux";
import { CounterType } from "../login.service";

class TwoFactorCodeContainer extends React.PureComponent<Props, State> {
  state = {
    total: 0,
    count: 0
  };
  componentDidMount() {
    const { email, password, service } = this.props;
    if (email === "" || password === "") {
      service.showNotFoundPage();
    }
  }

  componentWillUnmount() {
    this.props.service.clearLoginData();
  }

  handleSubmit = (
    code: string,
    setSubmitting: (isSubmitting: boolean) => void
  ): Promise<any> | ((dispatch: any, getState: any) => Promise<void>) => {
    const { service, role } = this.props;
    const method = role === ROLE.MANAGER ? loginUserManager : loginUserInvestor;
    const setCount = (count: number) => this.setState({ count });
    const setTotal = (total: number) => this.setState({ total });
    return service.twoFactorLogin(
      code,
      CODE_TYPE.TWO_FACTOR,
      setSubmitting,
      method,
      setCount,
      setTotal
    );
  };

  render() {
    const counter: CounterType = { ...this.state };
    return (
      <TwoFactorCodeForm
        onSubmit={this.handleSubmit}
        error={this.props.errorMessage}
        counter={counter}
      />
    );
  }
}

const mapStateToProps = (
  state: ManagerRootState | InvestorRootState
): StateProps => {
  const { errorMessage } = state.loginData.login;
  const { email, password } = state.loginData.twoFactor;
  return { errorMessage, email, password };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators(
    {
      ...(loginService as LoginService),
      showNotFoundPage: () => dispatch(replace(NOT_FOUND_PAGE_ROUTE))
    },
    dispatch
  )
});

interface State extends CounterType {}

interface StateProps {
  errorMessage: string;
  email: string;
  password: string;
}

interface DispatchProps {
  service: LoginService & { showNotFoundPage: () => void };
}

interface OwnProps {
  loginService: LoginService;
  from: string;
  role: ROLE;
  errorMessage: string;
  FORGOT_PASSWORD_ROUTE: string;
}

interface Props extends OwnProps, StateProps, DispatchProps {}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TwoFactorCodeContainer);
