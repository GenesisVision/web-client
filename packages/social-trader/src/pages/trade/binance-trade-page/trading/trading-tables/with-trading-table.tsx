import { Button } from "components/button/button";
import Link from "components/link/link";
import { Text } from "components/text/text";
import { useAuth } from "hooks/auth.hook";
import useFlag from "hooks/flag.hook";
import SignupDialog from "pages/auth/signup/signup-popup/signup-dialog";
import { composeCreateAccountRouteWithBroker } from "pages/create-account/create-account.constants";
import { useContext } from "react";

import { TerminalInfoContext } from "../contexts/terminal-info.context";
import styles from "./trading-tables.module.scss";

const SignUpButton: React.FC = () => {
  const [isOpen, setOpen, setClose] = useFlag();
  return (
    <>
      <div>
        <Button
          onClick={setOpen}
          variant={"text"}
          className={styles["trading-tables__auth-button"]}
        >
          Sign up
        </Button>
        <Text>to trade</Text>
      </div>
      <SignupDialog open={isOpen} onClose={setClose} />
    </>
  );
};

const WithoutAccountLink: React.FC = () => {
  return (
    <Text>
      <Link to={composeCreateAccountRouteWithBroker("Binance")}>Create</Link> or
      select account to start trading
    </Text>
  );
};

export const withTradingTable = <T extends object>(
  Component: React.ComponentType<T>
): React.ComponentType<T> => props => {
  const { isAuthenticated } = useAuth();
  const { exchangeAccountId } = useContext(TerminalInfoContext);

  if (!isAuthenticated) {
    return (
      <div className={styles["trading-tables__wrapper"]}>
        <SignUpButton />
      </div>
    );
  }
  if (!exchangeAccountId) {
    return (
      <div className={styles["trading-tables__wrapper"]}>
        <WithoutAccountLink />
      </div>
    );
  }
  return <Component {...props} />;
};
