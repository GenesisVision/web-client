import { Button } from "components/button/button";
import { Push } from "components/link/link";
import { SubmitButton } from "components/submit-button/submit-button";
import useIsOpen from "hooks/is-open.hook";
import SignupDialog from "pages/auth/signup/signup-popup/signup-dialog";
import { composeCreateAccountRouteWithBroker } from "pages/create-account/create-account.constants";
import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-info.context";
import { OrderSide } from "pages/trade/binance-trade-page/trading/terminal.types";
import React, { useContext } from "react";
import { useFormContext } from "react-hook-form";
import { useSelector } from "react-redux";
import { isAuthenticatedSelector } from "reducers/auth-reducer";

import { getPlaceOrderButtonLabel } from "./place-order.helpers";
import { FuturesPlaceOrderMode } from "./place-order.types";

interface Props {
  side: OrderSide;
  isSuccessful?: boolean;
  asset?: string;

  // futures
  placeOrderMode?: FuturesPlaceOrderMode;
  onSubmit?: (values: any) => any;
}

interface SimpleButtonProps {
  label: string;
  side: OrderSide;
}

interface SpotButtonProps {
  isSuccessful: boolean;
  label: string;
  side: OrderSide;
}

interface FuturesButtonProps {
  label: string;
  side: OrderSide;
  onSubmit: (values: any) => any;
}

const FuturesRealSubmit: React.FC<FuturesButtonProps> = ({
  side,
  label,
  onSubmit
}) => {
  const {
    handleSubmit,
    formState: { isSubmitting, isValid, touched }
  } = useFormContext();

  const disabled = isSubmitting || !isValid;

  const handleButtonClick = handleSubmit(values => {
    return onSubmit({ ...values, side });
  });
  return (
    <Button
      color={side === "Sell" ? "danger" : "primary"}
      wide
      onClick={handleButtonClick}
      disabled={disabled}
    >
      <>{label}</>
    </Button>
  );
};

const SpotRealSubmit: React.FC<SpotButtonProps> = ({
  isSuccessful,
  side,
  label
}) => {
  return (
    <SubmitButton
      checkDirty={false}
      isSuccessful={isSuccessful}
      color={side === "Sell" ? "danger" : "primary"}
      wide
    >
      <>{label}</>
    </SubmitButton>
  );
};

const UnAuthButton: React.FC<SimpleButtonProps> = ({ side, label }) => {
  const [isOpen, setOpen, setClose] = useIsOpen();
  return (
    <>
      <Button
        color={side === "Sell" ? "danger" : "primary"}
        wide
        onClick={setOpen}
      >
        <>{label}</>
      </Button>
      <SignupDialog open={isOpen} onClose={setClose} />
    </>
  );
};

const WithoutAccountButton: React.FC<SimpleButtonProps> = ({ side, label }) => {
  return (
    <Button
      color={side === "Sell" ? "danger" : "primary"}
      wide
      onClick={() => Push(composeCreateAccountRouteWithBroker("Binance"))}
    >
      <>{label}</>
    </Button>
  );
};

const _PlaceOrderSubmitButton: React.FC<Props> = ({
  side,
  asset,
  isSuccessful,
  onSubmit,
  placeOrderMode
}) => {
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const { exchangeAccountId, terminalType } = useContext(TerminalInfoContext);

  const label = getPlaceOrderButtonLabel({
    side,
    terminalType,
    asset,
    placeOrderMode
  });

  if (!isAuthenticated) return <UnAuthButton side={side} label={label} />;
  if (!exchangeAccountId)
    return <WithoutAccountButton side={side} label={label} />;
  return terminalType === "futures" ? (
    <FuturesRealSubmit label={label} side={side} onSubmit={onSubmit!} />
  ) : (
    <SpotRealSubmit isSuccessful={isSuccessful!} label={label} side={side} />
  );
};

export const PlaceOrderSubmitButton = React.memo(_PlaceOrderSubmitButton);
