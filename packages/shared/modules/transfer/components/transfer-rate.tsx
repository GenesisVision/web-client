import * as React from "react";
import { rateApi } from "shared/services/api-client/rate-api";

type InjectedRate = {
  rate: number;
};

type ITransferRateProps = Readonly<{
  children(props: InjectedRate): React.ReactNode;
  sourceCurrency: string;
  destinationCurrency: string;
}>;
type ITransferRateState = {
  rate?: number;
};

class TransferRate extends React.PureComponent<
  ITransferRateProps,
  ITransferRateState
> {
  state = {
    isPending: false,
    rate: 0
  };

  fetchRate = () => {
    rateApi
      .v10RateByFromByToGet(
        this.props.sourceCurrency,
        this.props.destinationCurrency
      )
      .then(rate => this.setState({ rate }))
      .catch(() => this.setState({ rate: 0 }));
  };

  componentDidMount() {
    this.fetchRate();
  }

  componentDidUpdate(
    prevProps: Readonly<ITransferRateProps>,
    prevState: Readonly<{}>,
    snapshot?: any
  ): void {
    if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      this.fetchRate();
    }
  }

  render() {
    return this.state.rate &&
      this.props.sourceCurrency !== this.props.destinationCurrency
      ? this.props.children({ rate: this.state.rate })
      : null;
  }
}

export default TransferRate;
