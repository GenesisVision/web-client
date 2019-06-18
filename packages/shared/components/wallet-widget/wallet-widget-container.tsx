import { WalletsGrandTotal } from "gv-api-web";
import * as React from "react";
import { ResolveThunks, connect } from "react-redux";
import { ActionCreatorsMapObject, Dispatch, bindActionCreators } from "redux";
import WalletWidget from "shared/components/wallet-widget/wallet-widget";
import { fetchWallets } from "shared/components/wallet/services/wallet.services";
import { currencySelector } from "shared/reducers/account-settings-reducer";
import { RootState } from "shared/reducers/root-reducer";

import { grandTotalSelector } from "../wallet/reducers/wallet.reducers";
import { WalletWidgetLoader } from "./wallet-widget.loader";

class _WalletWidgetContainer extends React.PureComponent<Props> {
  getWallets = () => {
    this.props.service.fetchWallets();
  };

  componentDidMount() {
    this.getWallets();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.currency !== this.props.currency) this.getWallets();
  }

  render() {
    const { className, info } = this.props;
    return (
      <WalletWidget
        condition={!!info}
        loader={<WalletWidgetLoader className={className} />}
        className={className}
        info={info!}
      />
    );
  }
}

const mapStateToProps = (state: RootState): StateProps => ({
  currency: currencySelector(state),
  info: grandTotalSelector(state)
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    {
      fetchWallets
    },
    dispatch
  )
});

interface Props extends OwnProps, StateProps, DispatchProps {}

interface StateProps {
  currency: string;
  info?: WalletsGrandTotal;
}

interface ServiceThunks extends ActionCreatorsMapObject {
  fetchWallets: typeof fetchWallets;
}
interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}

interface OwnProps {
  className?: string;
}

const WalletWidgetContainer = connect<
  StateProps,
  DispatchProps,
  OwnProps,
  RootState
>(
  mapStateToProps,
  mapDispatchToProps
)(_WalletWidgetContainer);
export default WalletWidgetContainer;
