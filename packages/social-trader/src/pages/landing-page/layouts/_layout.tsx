import { TitleContext } from "components/link/link.helper";
import { UpperButtonContainer } from "components/upper-button/upper-button";
import { useRefLink } from "hooks/ref-link";
import { useTranslation } from "i18n";
import Head from "next/head";
import CookieMessage from "pages/landing-page/components/cookie-message/cookie-message";
import { LandingUpperButton } from "pages/landing-page/components/landing-upper-button/landing-upper-button";
import LPFooter from "pages/landing-page/components/lp-footer/lp-footer";
import LPHeader from "pages/landing-page/components/lp-header/lp-header";
import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { LandingPageRootStyle } from "styles/root-styles";
import {
  commonMeta,
  descriptionMeta,
  imageMeta,
  ORGANIZATION_SCHEMA,
  schema,
  titleMeta
} from "utils/seo";
import { $landingBg, $mainColor } from "utils/style/colors";

const GlobalStyle = createGlobalStyle`
  ${LandingPageRootStyle}
`;

const Container = styled.div`
  background-color: ${$landingBg};
  color: ${$mainColor};

  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }
`;

const _Layout: React.FC<Props> = ({
  cookieAccept,
  description,
  title,
  children
}) => {
  const { t } = useTranslation();
  useRefLink();
  return (
    <Container className="landing-page">
      <Head>
        <title>{title}</title>
        {schema([ORGANIZATION_SCHEMA])}
        {commonMeta()}
        <meta property="og:url" content="https://genesis.vision" />
        {imageMeta("https://genesis.vision/platform.png")}
        <meta property="og:image:type" content="image/png" />
        {titleMeta(t("landing-page:genesis-vision"))}
        {descriptionMeta(description || t("landing-page:short-description"))}
      </Head>
      <GlobalStyle />
      <TitleContext.Provider value={title}>
        <LPHeader />
        {children}
        <LPFooter />
      </TitleContext.Provider>
      <CookieMessage cookieAccept={cookieAccept} />
      <div id="modal-root" />
      <UpperButtonContainer Button={LandingUpperButton} />
    </Container>
  );
};

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  cookieAccept?: string;
  description?: string;
  title: string;
}

const Layout = React.memo(_Layout);
export default Layout;
