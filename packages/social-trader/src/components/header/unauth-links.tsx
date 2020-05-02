import GVButton from "components/gv-button";
import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import React from "react";
import { useTranslation } from "react-i18next";
import { LOGIN_ROUTE, SIGNUP_ROUTE } from "routes/app.routes";

import styles from "./header.module.scss";

const UnauthLinks: React.FC<Props> = ({ backPath }) => {
  const { linkCreator } = useToLink();
  const [t] = useTranslation();
  return (
    <div className={styles["header__buttons"]}>
      <Link
        to={{
          pathname: LOGIN_ROUTE,
          state: backPath
        }}
      >
        <GVButton variant="outlined" color="secondary">
          {t("auth.login.title")}
        </GVButton>
      </Link>
      <Link to={linkCreator(SIGNUP_ROUTE)}>
        <GVButton variant="contained" color="primary">
          {t("auth.signup.title")}
        </GVButton>
      </Link>
    </div>
  );
};

interface Props {
  backPath: string;
}

export default UnauthLinks;
