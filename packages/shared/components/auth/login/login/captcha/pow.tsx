import * as React from "react";
import Pie from "shared/components/pie-container/pie";
import { GVColors } from "gv-react-components";
import { PowDetails } from "gv-api-web";
import * as loginService from "../../login.service";
import { CounterType } from "../../login.service";

class Pow extends React.PureComponent<Props, State> {
  state = {
    total: 0,
    count: 0
  };
  componentDidMount() {
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
  }
  render() {
    const { total, count } = this.state;
    return (
      <div className="login__pie-container">
        <Pie color={GVColors.$primaryColor} end={total} value={count} />
      </div>
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
