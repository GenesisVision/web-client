import * as React from "react";
import { useEffect, useState } from "react";
import { rateApi } from "shared/services/api-client/rate-api";

const _TransferRate: React.FC<Props> = ({
  sourceCurrency,
  destinationCurrency,
  children
}) => {
  const [rate, setRate] = useState<number>(0);
  useEffect(() => {
    rateApi
      .getRate(sourceCurrency, destinationCurrency)
      .then(data => setRate(data.rate))
      .catch(() => setRate(0));
  }, [sourceCurrency, destinationCurrency]);

  return rate && sourceCurrency !== destinationCurrency
    ? children({ rate })
    : null;
};

type InjectedRate = {
  rate: number;
};

interface Props {
  children: (props: InjectedRate) => JSX.Element;
  sourceCurrency: string;
  destinationCurrency: string;
}

const TransferRate = React.memo(_TransferRate);
export default TransferRate;
