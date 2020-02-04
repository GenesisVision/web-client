import { PowDetails } from "gv-api-web";
import * as React from "react";
import { useEffect, useState } from "react";

import * as authService from "../auth.service";

const _Pow: React.FC<Props> = props => {
  const [total, setTotal] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  useEffect(() => {
    authService
      .checkPow({
        ...props,
        setCount,
        setTotal
      })
      .then(res => {
        props.handleSuccess(res);
      });
  }, []);
  if (!total) return null;
  return (
    <div
      className="login__top-counter"
      style={{ width: `${count / (total / 100)}%` }}
    />
  );
};

interface Props extends PowDetails {
  handleSuccess: (prefix: number) => void;
  login: string;
}

const Pow = React.memo(_Pow);
export default Pow;
