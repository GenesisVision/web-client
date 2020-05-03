import { Center } from "components/center/center";
import GVButton from "components/gv-button";
import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import { RowItem } from "components/row-item/row-item";
import React from "react";
import { useTranslation } from "react-i18next";
import { LOGIN_ROUTE, SIGNUP_ROUTE } from "routes/app.routes";

const UnauthLinks: React.FC<Props> = ({ backPath }) => {
  const { linkCreator } = useToLink();
  const [t] = useTranslation();
  return (
    <Center className="header__buttons">
      <RowItem>
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
      </RowItem>
      <RowItem>
        {" "}
        <Link to={linkCreator(SIGNUP_ROUTE)}>
          <GVButton variant="contained" color="primary">
            {t("auth.signup.title")}
          </GVButton>
        </Link>
      </RowItem>
    </Center>
  );
};

interface Props {
  backPath: string;
}

export default UnauthLinks;
