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
import {
  commonMeta,
  descriptionMeta,
  imageMeta,
  ORGANIZATION_SCHEMA,
  schema,
  titleMeta
} from "utils/seo";

const _Layout: React.FC<Props> = ({
  cookieAccept,
  description,
  title,
  children
}) => {
  const { t } = useTranslation();
  useRefLink();
  return (
    <div className="landing-page">
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
      <TitleContext.Provider value={title}>
        <LPHeader />
        {children}
        <LPFooter />
      </TitleContext.Provider>
      <CookieMessage cookieAccept={cookieAccept} />
      <div id="modal-root" />
      <UpperButtonContainer Button={LandingUpperButton} />
    </div>
  );
};

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  cookieAccept?: string;
  description?: string;
  title: string;
}

const Layout = React.memo(_Layout);
export default Layout;
