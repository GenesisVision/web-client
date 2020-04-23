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
import "./auth-layout.scss";

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
    <div className="auth">
      <div className="auth__left">
        <Link className="auth__logo" to={linkCreator(HOME_ROUTE)}>
          <Center>
            <RowItem small>
              <GvLogo />
            </RowItem>
            <RowItem small>
              <GvBrand />
            </RowItem>
          </Center>
        </Link>
        <blockquote className="auth__quote">
          {t(`auth-quotes.${quoteNo}.quote`)}
          <footer className="auth__quote-footer">
            —{" "}
            <cite className="auth__quote-author">
              {t(`auth-quotes.${quoteNo}.author`)}
            </cite>
          </footer>
        </blockquote>
      </div>
      <div className="auth__right">
        <div className="auth__content">
          {titleKey && <h1>{t(titleKey)}</h1>}
          <Row large onlyOffset>
            {children}
          </Row>
        </div>
        {Footer && (
          <Center className="auth__footer">
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
