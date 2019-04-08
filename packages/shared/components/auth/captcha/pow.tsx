import * as React from "react";
import { PowDetails } from "gv-api-web";
import * as authService from "../auth.service";
import { CounterType } from "../auth.service";

class Pow extends React.PureComponent<Props, State> {
  state = {
    total: 0,
    count: 0
  };

  componentDidMount() {
    const setCount = (count: number) =>
      setTimeout(() => this.setState({ count }));
    const setTotal = (total: number) =>
      setTimeout(() => this.setState({ total }));
    authService
      .checkPow({
        ...this.props,
        setCount,
        setTotal
      })
      .then(res => {
        this.props.handleSuccess(res);
      });
  }

  render() {
    const { total, count } = this.state;
    if (!total) return null;
    return (
      <div
        className="login__top-counter"
        style={{ width: `${count / (total / 100)}%` }}
      />
    );
  }
}

interface State extends CounterType {}

interface Props extends PowDetails {
  handleSuccess: (prefix: number) => void;
  email: string;
  id: string;
}

export default Pow;
