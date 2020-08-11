import { Button } from "components/button/button";
import { Center } from "components/center/center";
import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import { RowItem } from "components/row-item/row-item";
import React from "react";
import { useTranslation } from "react-i18next";
import { LOGIN_ROUTE, SIGNUP_ROUTE } from "routes/app.routes";

import styles from "./header.module.scss";

const UnauthLinks: React.FC<Props> = ({ backPath }) => {
  const { linkCreator } = useToLink();
  const [t] = useTranslation();
  return (
    <Center className={styles["header__buttons"]}>
      <RowItem>
        <Link
          to={{
            pathname: LOGIN_ROUTE,
            state: backPath
          }}
        >
          <Button variant="outlined" color="secondary">
            {t("buttons.login")}
          </Button>
        </Link>
      </RowItem>
      <RowItem>
        <Link to={linkCreator(SIGNUP_ROUTE)}>
          <Button variant="contained" color="primary">
            {t("buttons.signup")}
          </Button>
        </Link>
      </RowItem>
    </Center>
  );
};

interface Props {
  backPath: string;
}

export default UnauthLinks;
