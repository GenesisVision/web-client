import { Button } from "components/button/button";
import { Push } from "components/link/link";
import { SubmitButton } from "components/submit-button/submit-button";
import useIsOpen from "hooks/is-open.hook";
import SignupDialog from "pages/auth/signup/signup-popup/signup-dialog";
import { composeCreateAccountRouteWithBroker } from "pages/create-account/create-account.constants";
import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-info.context";
import {
  OrderSide,
  TerminalCurrency
} from "pages/trade/binance-trade-page/trading/terminal.types";
import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { isAuthenticatedSelector } from "reducers/auth-reducer";

interface Props {
  isSuccessful?: boolean;
  side: OrderSide;
  asset: TerminalCurrency;
}

const RealSubmit: React.FC<Props> = ({ isSuccessful, side, asset }) => {
  return (
    <SubmitButton
      checkDirty={false}
      isSuccessful={isSuccessful}
      color={side === "Sell" ? "danger" : "primary"}
      wide
    >
      <>
        {side} {asset}
      </>
    </SubmitButton>
  );
};

const UnAuthButton: React.FC<Props> = ({ side, asset }) => {
  const [isOpen, setOpen, setClose] = useIsOpen();
  return (
    <>
      <Button
        color={side === "Sell" ? "danger" : "primary"}
        wide
        onClick={setOpen}
      >
        <>
          {side} {asset}
        </>
      </Button>
      <SignupDialog open={isOpen} onClose={setClose} />
    </>
  );
};

const WithoutAccountButton: React.FC<Props> = ({ side, asset }) => {
  return (
    <Button
      color={side === "Sell" ? "danger" : "primary"}
      wide
      onClick={() => Push(composeCreateAccountRouteWithBroker("Binance"))}
    >
      <>
        {side} {asset}
      </>
    </Button>
  );
};

const _PlaceOrderSubmitButton: React.FC<Props> = props => {
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const { exchangeAccountId } = useContext(TerminalInfoContext);

  if (!isAuthenticated) return <UnAuthButton {...props} />;
  if (!exchangeAccountId) return <WithoutAccountButton {...props} />;
  return <RealSubmit {...props} />;
};

export const PlaceOrderSubmitButton = React.memo(_PlaceOrderSubmitButton);
