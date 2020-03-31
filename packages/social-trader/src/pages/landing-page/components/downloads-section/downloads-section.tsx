import "./downloads-section.scss";

import ImageBaseElement from "components/avatar/image-base.element";
import { useTranslation } from "i18n";
import MetatraderLogo from "pages/landing-page/images/internal/metatrader.png";
import React from "react";

const DownloadsSection: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section className="downloads-section">
      <article className="internal__article" id="pc">
        <h1>{t("downloads.title")}</h1>
        <h2>{t("downloads.subtitle-1")}</h2>
        <p>
          {t("downloads.text-1")}
          <br />
          <a
            title={t("downloads.link-1")}
            href="https://download.mql5.com/cdn/web/11830/mt5/genesismarketslp5setup.exe"
          >
            {t("downloads.link-1")}
            <br />
            <ImageBaseElement
              src={MetatraderLogo}
              alt={t("downloads.link-1")}
            />
          </a>
        </p>
      </article>
      <article className="internal__article" id="mobile">
        <h2>{t("downloads.subtitle-2")}</h2>
        <p>
          {t("downloads.text-2")}
          <br />
          <a
            title={t("downloads.link-2")}
            href="https://itunes.apple.com/app/metatrader-5-forex-stocks/id413251709"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("downloads.link-2")}
          </a>
          <br />
          <a
            title={t("downloads.link-3")}
            href="https://play.google.com/store/apps/details?id=net.metaquotes.metatrader5"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("downloads.link-3")}
          </a>
        </p>
      </article>
      <article className="internal__article" id="web">
        <h2>{t("downloads.subtitle-3")}</h2>
        <p>
          {t("downloads.text-3")}
          <br />
          <a
            title={t("downloads.link-4")}
            href="https://genesismarkets.io/profile/webterminal"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("downloads.link-4")}
          </a>
        </p>
      </article>
    </section>
  );
};

export default DownloadsSection;
