import ImageBaseElement from "components/avatar/image-base.element";
import { useTranslation } from "i18n";
import MetatraderLogo from "pages/landing-page/images/internal/metatrader.png";
import React from "react";

import styles from "./downloads-section.module.scss";

const MetatraderPCLink =
  "https://download.mql5.com/cdn/web/15879/mt5/genesismarketsltd5setup.exe";
const MetatraderIOSLink =
  "https://download.mql5.com/cdn/mobile/mt5/ios?server=GenesisMarketsLtd-Demo,GenesisMarketsLtd-Live";
const MetatraderAndroidLink =
  "https://download.mql5.com/cdn/mobile/mt5/android?server=GenesisMarketsLtd-Demo,GenesisMarketsLtd-Live";
const MetatraderLoginLink = "https://genesis.vision/trade/mt5";

const DownloadsSection: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section className={styles["downloads-section"]}>
      <article className={"internal__article"} id="pc">
        <h1>{t("downloads.title")}</h1>
        <h2>{t("downloads.subtitle-1")}</h2>
        <p>
          {t("downloads.text-1")}
          <br />
          <a title={t("downloads.link-1")} href={MetatraderPCLink}>
            {t("downloads.link-1")}
            <br />
            <ImageBaseElement
              src={MetatraderLogo}
              alt={t("downloads.link-1")}
            />
          </a>
        </p>
      </article>
      <article className={"internal__article"} id="mobile">
        <h2>{t("downloads.subtitle-2")}</h2>
        <p>
          {t("downloads.text-2")}
          <br />
          <a
            title={t("downloads.link-2")}
            href={MetatraderIOSLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("downloads.link-2")}
          </a>
          <br />
          <a
            title={t("downloads.link-3")}
            href={MetatraderAndroidLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("downloads.link-3")}
          </a>
        </p>
      </article>
      <article className={"internal__article"} id="web">
        <h2>{t("downloads.subtitle-3")}</h2>
        <p>
          {t("downloads.text-3")}
          <br />
          <a
            title={t("downloads.link-4")}
            href={MetatraderLoginLink}
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
