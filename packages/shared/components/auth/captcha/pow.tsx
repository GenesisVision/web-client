import * as React from "react";
import { PowDetails } from "gv-api-web";
import * as loginService from "../login/login.service";
import { CounterType } from "../login/login.service";

class Pow extends React.PureComponent<Props, State> {
  state = {
    total: 0,
    count: 0
  };
  calculatePow = () => {
    const setCount = (count: number) =>
      setTimeout(() => this.setState(() => ({ count })));
    const setTotal = (total: number) =>
      setTimeout(() => this.setState(() => ({ total })));
    loginService
      .runCalculatingPow({
        ...this.props,
        setCount,
        setTotal
      })
      .then(res => {
        this.props.handleSuccess(res);
      });
  };
  componentDidMount() {
    this.calculatePow();
  }
  render() {
    const { total, count } = this.state;
    return (
      total && (
        <div
          className="login__top-counter"
          style={{ width: `${count / (total / 100)}%` }}
        />
      )
    );
  }
}

interface State extends CounterType {}

interface Props extends PowDetails {
  handleSuccess: (prefix: number) => any;
  email: string;
  id: string;
}

export default Pow;
