import { Button } from "components/button/button";
import { Center } from "components/center/center";
import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import { RowItem } from "components/row-item/row-item";
import React from "react";
import { useTranslation } from "react-i18next";
import { LOGIN_ROUTE, SIGNUP_ROUTE } from "routes/app.routes";
import styled from "styled-components";
import { hideOnLandscapeTablet } from "utils/style/mixins";

interface Props {
  className?: string;
  backPath: string;
}

const StyledCenter = styled(Center)`
  width: 100%;
  justify-content: flex-end;
  ${hideOnLandscapeTablet("flex")}
`;

const UnauthLinks: React.FC<Props> = ({ className, backPath }) => {
  const { linkCreator } = useToLink();
  const [t] = useTranslation();
  return (
    <StyledCenter className={className}>
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
    </StyledCenter>
  );
};

export default React.memo(UnauthLinks);
