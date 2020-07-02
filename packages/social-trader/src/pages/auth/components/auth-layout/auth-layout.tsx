import { Center } from "components/center/center";
import GvBrand from "components/gv-brand/gv-brand";
import GvLogo from "components/gv-logo/gv-logo";
import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { NextPage } from "next";
import React from "react";
import { useTranslation } from "react-i18next";
import { HOME_ROUTE } from "routes/app.routes";

import { ILoginFooterProps } from "../login-footer/login-footer";
import styles from "./auth-layout.module.scss";

const _AuthLayout: NextPage<Props> = ({
  quoteNo,
  children,
  titleKey,
  Footer,
  footerAuthRoute
}) => {
  const { linkCreator } = useToLink();
  const [t] = useTranslation();
  return (
    <div className={styles["auth"]}>
      <div className={styles["auth__left"]}>
        <Link className={styles["auth__logo"]} to={linkCreator(HOME_ROUTE)}>
          <Center>
            <RowItem size={"small"}>
              <GvLogo />
            </RowItem>
            <RowItem size={"small"}>
              <GvBrand />
            </RowItem>
          </Center>
        </Link>
        <blockquote className={styles["auth__quote"]}>
          {t(`auth:auth-quotes.${quoteNo}.quote`)}
          <footer className={styles["auth__quote-footer"]}>
            —{" "}
            <cite className={styles["auth__quote-author"]}>
              {t(`auth:auth-quotes.${quoteNo}.author`)}
            </cite>
          </footer>
        </blockquote>
      </div>
      <div className={styles["auth__right"]}>
        <div className={styles["auth__content"]}>
          {titleKey && <h1>{t(titleKey)}</h1>}
          <Row size={"large"} onlyOffset>
            {children}
          </Row>
        </div>
        {Footer && (
          <Center className={styles["auth__footer"]}>
            <Footer ROUTE={footerAuthRoute} />
          </Center>
        )}
      </div>
    </div>
  );
};

interface Props extends OwnProps {}

interface OwnProps {
  Footer: React.ComponentType<ILoginFooterProps>;
  footerAuthRoute: string;
  titleKey: string;
  children: React.ReactChild;
  quoteNo: number;
}

const AuthLayout = React.memo(_AuthLayout);
export default AuthLayout;
